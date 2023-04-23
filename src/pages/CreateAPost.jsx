import React, { useState, useRef, useEffect } from "react";
import GeneralPageHeading from "../components/GeneralHeading";
import ErrorComponent from "../components/Error";
import useClickOff from "../hooks/useClickOff";
import { debounce, convertImageToBlob, compressImage, generateUniqueId } from "../utility/misc";
import { defaultImgData } from "../utility/reusable";
import Loading from "../components/Loading"

// Importing icons
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiSearch, BiTrash } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";

import { useBlogContext } from "../contexts/blog_context"
import { useAuthContext } from "../Auth/AuthContext"
import { serverTimestamp } from "@firebase/firestore";

import { useNavigate } from "react-router-dom";

import useGetScrollY from "../hooks/useGetScrollY";

const CreateAPost = () => {
  const { testFunc3, createPost } = useBlogContext()
  const { user } = useAuthContext()
  // State variables for post information and character limits
  const [postTitleMaxChar, setPostTitleMaxChar] = useState(100);
  const [postTextMaxChar, setPostTextMaxChar] = useState(10000);
  const [postInfo, setPostInfo] = useState({ postTitle: "", postTag: "", postText: "" });

  // State variables for image dropdown and preview
  const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false);
  const [isImagePreviewShown, setIsImagePreviewShown] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [searchImageText, setSearchImageText] = useState("");
  const [imageSourceSelect, setImageSourceSelect] = useState("default");
  const [unsplashedRequestData, setUnsplashedRequestData] = useState({ remaining: 50, limit: 50 });

  const [currentAltText, setCurrentAltText] = useState("")

  // State variables for image dropdown content and pagination
  const [dropdownImages, setDropdownImages] = useState(defaultImgData);
  const [currentPage, setCurrentPage] = useState(1);

  // State variables for loading and error handling
  const [isLoadingDropdownImages, setIsLoadingDropdownImages] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ isError: false, errorMessage: "" });

  // Refs for image dropdown and search input
  const openImageDropdownRef = useRef(null);
  const imageDropdownMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  const [currentImageBlob, setCurrentImageBlob] = useState("")
  const [currentImageCompressed, setCurrentImageCompressed] = useState("")

  const [createdPostId, setCreatedPostId] = useState(generateUniqueId())

  const [isPublishPostDropdownShown, setIsPublishPostDropdownShown] = useState(false)



  // for image select dropdown menu
  // useClickOff(imageDropdownMenuRef,openImageDropdownRef, setIsImageDropdownOpen)
  const navigate = useNavigate();

  const clearSearchInput = _ => {
    // clear input
    searchInputRef.current.value = ""
    // clear state
    setSearchImageText("")
  }


  const chooseImage = (data) => {
    let targetImg = data.src
    let targetAltText = data.alt
    setCurrentImage(targetImg)
    setCurrentAltText(targetAltText)
    setIsImagePreviewShown(true)
    setIsImageDropdownOpen(false)
  }


  const closeDropdown = () => {
    setIsImageDropdownOpen(false)
    setImageSourceSelect("default")
    clearSearchInput()
    setDropdownImages(defaultImgData)
  }




  /*
  getting the currentImage ready to be
  compressed by converting the image
  into a blob, so it can processed
  */
  useEffect(() => {
    // This function takes the currentImage and converts it to a Blob object,
    // which is a type of file format used to store binary data.
    // The resulting Blob object is set as the value of setCurrentImageBlob.
    if(currentImage) {
      convertImageToBlob(currentImage, setCurrentImageBlob)
    }
  },[currentImage])

  // compresses the currentImage to get a smaller file size for my image file
  useEffect(() => {
    /*
    This function uses the fetch API to get
    the binary data of the currentImageBlob
    (which is a blob this is different than a Blob object)
     */
    // It then converts this binary data into a Blob object
    if(currentImageBlob) {

      fetch(currentImageBlob).then(res => res.blob()).then(blob => {
        // This function compresses the given Blob object and sets the compressed version
        // as the value of setCurrentImageCompressed.
        compressImage(blob, setCurrentImageCompressed)
      })
    }
  },[currentImageBlob, currentImageCompressed])



  const getPostData = () => {
    let data = {
      text:postInfo.postText,
      title:postInfo.postTitle,
      tag:postInfo.postTag,
      postId:createdPostId,  
      createdAt:serverTimestamp(),
      authorUid:user.uid,
      image:currentImageCompressed,
      altText:currentAltText,
      likes:[],
    }

    if(
      isImagePreviewShown 
      && currentImage
      && currentImageCompressed 
      && postInfo.postTitle
      && postInfo.postTag
      && postInfo.postText
      ) {
        return data
    }
  } 




  const fetchImagesUnsplashed = async () => {
    // Set up URL with API and user input parameters
    let baseUrl = "https://api.unsplash.com"
    let photoSearchUrl = "search/photos"
    let currentPageUrl = `page=${currentPage}`
    let queryUrl = `query=${searchImageText}&orientation=landscape`
    let clientId = `client_id=${import.meta.env.VITE_UNSPLASHED_ACCESS_KEY}`
    let fullUrlUnsplashed = `${baseUrl}/${photoSearchUrl}?${currentPageUrl}&${queryUrl}&${clientId}`
  
    try {
      setIsLoadingDropdownImages(true)
      // Fetch data from Unsplash API
      const response = await fetch(fullUrlUnsplashed);
      // Check for errors in response
      if (!response.ok) {
        setIsLoadingDropdownImages(false)
        setErrorInfo({isError:true, errorMessage:error.message})
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
  
      // get rate limit from API response headers
      const remaining = response.headers.get('x-ratelimit-remaining');
      const limit = response.headers.get('x-ratelimit-limit');
      setUnsplashedRequestData({...unsplashedRequestData, remaining, limit})
  
      // Refine the data received from the API to match the format of the dropdownImages state
      let refinedData = data?.results.map((el) => {
        return {
          description:el.alt_description,
          image:el.urls.regular,
          imageDownload:el.links.download_location,
          authorInfo:{
            name:`${el.user.first_name} ${el.user.last_name ? el.user.last_name : ""}`,
            link:el.user.links.html,
          },
        }
      })
      setIsLoadingDropdownImages(false)
      setErrorInfo({isError:false, errorMessage:""})
  
      // Update the dropdownImages state with refined data
      setDropdownImages(refinedData)
     
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
      setIsLoadingDropdownImages(false)
      setErrorInfo({isError:true, errorMessage:error.message})
    }
  }  




  // image search functionality
  useEffect(() => {
    // If the selected image source is Unsplash and there is search text, fetch images from the Unsplash API
    if (imageSourceSelect === "unsplashed" && searchImageText) {
      fetchImagesUnsplashed();
    }

    // If the selected image source is the default image source and there is search text
    if (imageSourceSelect === "default" && searchImageText) {
      // Filter the defaultImgData to find images that match the search text
      let filteredDefaultImgData = defaultImgData.filter((el) => {
        if (el.description.toLowerCase().indexOf(searchImageText.toLowerCase()) !== -1) {
          return el;
        }
      });
      // Update the dropdownImages state with the filtered results
      setDropdownImages(filteredDefaultImgData);
    } else if (imageSourceSelect === "default" && !searchImageText) {
      // If there is no search text, set the dropdownImages state back to the defaultImgData
      setDropdownImages(defaultImgData);
    }
  }, [imageSourceSelect, searchImageText]);




  // kick user to default images if the amount of api tokens is used up
  useEffect(() => {
    // If there are no remaining tokens, switch back to the default image source and show an error message
    if (unsplashedRequestData.remaining <= 0) {
      setImageSourceSelect("default");
      setErrorInfo({
        isError: true,
        errorMessage: "Ran out of request tokens for the Unsplash API. Tokens will refresh in approximately 1 hour."
      });
    }
  }, [unsplashedRequestData.remaining]);




  // get request amount and limit from unsplashed api 
  useEffect(() => {
    // If the selected image source is Unsplash, fetch the request amount from the API
    if (imageSourceSelect === "unsplashed") {
      // Construct the client ID header using the access key from the environment variables
      let clientId = `client_id=${import.meta.env.VITE_UNSPLASHED_ACCESS_KEY}`;

      // Send a HEAD request to the Unsplash API to get the remaining and limit of the API request quota
      fetch(`https://api.unsplash.com/stats/total?${clientId}`, { method: 'HEAD' })
        .then(response => {
          // Extract the remaining and limit values from the response headers
          const remaining = response.headers.get('x-ratelimit-remaining');
          const limit = response.headers.get('x-ratelimit-limit');

          // Update the unsplashedRequestData state with the new values
          setUnsplashedRequestData({...unsplashedRequestData, remaining, limit});
        })
        .catch(error => {
          // Log any errors that occur while making the API request
          console.error('Error:', error);
        });
    }
  }, [imageSourceSelect]);




  return (
    <>
      <div className={`fixed bg-white drop-shadow rounded p-4 mt-2 duration-300 -translate-x-1/2 left-1/2  transition-transform  ${isPublishPostDropdownShown ? "translate-y-0 z-40" : "-translate-y-16 -z-40" }`}>Publishing post...</div>
      <GeneralPageHeading text={"create a post"}/>

      <div className="outer-width mx-auto my-4 relative flex flex-col justify-center items-center">
        {/* image section */}
        <div className="flex flex-col justify-center md:w-[75%] w-full">
          <div className="my-6 relative">
            <h2 className="mb-2 font-semibold">Add an image</h2>
            {isImagePreviewShown ? (
              <div className="flex rounded-sm w-full h-[450px] text-white">
                <div className="absolute w-full flex justify-end p-2">
                  <button className="text-2xl bg-gray-800 bg-opacity-75 w-10 h-10 rounded-full flex items-center justify-center" onClick={() => {
                    setIsImagePreviewShown(false)
                  }}>
                    <BiTrash/>
                  </button>
                </div>
                <img src={currentImage} alt={currentAltText} className="object-cover w-full h-full rounded-sm"/>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 flex rounded-sm w-full border-2 border-dashed border-blue-500" >
                <div className="bg-blue-600 text-white text-xl p-1 rounded-full w-10 h-10 flex items-center justify-center">
                  <MdOutlineAddPhotoAlternate/>
                </div>
                <div className="ml-4">
                  <h4 className="my-1">Add an image and see a preview of that image here</h4>
                  <button ref={openImageDropdownRef} onClick={() => setIsImageDropdownOpen(true)} className="bg-white font-semibold rounded-sm py-2 px-3 border border-gray-300">Add Image</button>
                </div>
              </div>
            )}

            {/* dropdown for the images */}
            <div ref={imageDropdownMenuRef} className={`dropdown-menu-container ${isImageDropdownOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed hidden"} left-0 md:w-[70%] w-full  h-72 grid grid-col-2 px-0`}>
              <header className="flex min-[376px]:flex-row flex-col items-center relative px-3">
                {/* search image container */}
                <div className="bg-slate-100 flex items-center p-2 w-full">
                  <div className="top-[2px] relative text-slate-500 text-lg mr-1">
                    <BiSearch/>
                  </div>
                  <input className="bg-slate-100 w-full focus:outline-none focus:border-transparent" ref={searchInputRef} placeholder="search for an image"  onChange={(e) => {
                    /*
                    debounceTime in milliseconds,
                    750 is what felt responsive
                    but also slow enough not to use up
                    to many api tickets
                    */
                    let debounceTime = 750
                    if(imageSourceSelect === "default") {
                      setSearchImageText(e.target.value)
                    } else {
                      debounce(function() {
                        setSearchImageText(e.target.value)
                      }, debounceTime)
                    }
                  }} />
                  <button className="text-lg px-0 bg-gray-100 min-[376px]:text-slate-500 text-slate-700 min-[376px]:bg-transparent" onClick={() => clearSearchInput()}>
                    <RiCloseLine/>
                  </button>
                </div>
                <div className="px-2 min-[376px]:py-0 py-6 ">
                  <select id="image-source" value={imageSourceSelect} onChange={(e) => setImageSourceSelect(e.target.value)}>
                    <option value="unsplashed" disabled={unsplashedRequestData.remaining <= 0 ? true : false}>Unsplashed</option>
                    <option value="default">Default</option>
                  </select>
                </div>
                <button className="text-2xl px-3 bg-gray-100 min-[376px]:text-slate-500 text-slate-700 min-[376px]:bg-transparent" onClick={() => closeDropdown()}>
                  <RiCloseLine/>
                </button>
              </header>
              <section className="my-4 h-full overflow-auto before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-slate-100 before:left-0">
                {errorInfo.isError == true ? (
                  <ErrorComponent errorMessage={errorInfo.errorMessage}/>
                ) : ""}
                {dropdownImages.length <= 0 ? <p className="mt-4 mx-4 text-center">No results found</p> : ""}
                <div className="grid grid-cols-2 gap-3 h-full px-3 ">
                  {!isLoadingDropdownImages ? dropdownImages.map((el, index) => {
                    return (
                      <button key={index} onClick={(e) => {
                        chooseImage(e.target)
                      }}>
                        <img src={el.image} alt={el.description} title={el.description} className="w-full h-full object-cover" />
                      </button>
                    )
                  }) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Loading/>
                    </div>
                  )}
                </div>
              </section>
            </div> 
            <div className={`mt-4 flex items-center ${isImagePreviewShown ? "justify-between" : "justify-end"} w-full`}>
                {isImagePreviewShown ? (
                  <button ref={imageDropdownMenuRef}  onClick={() => setIsImageDropdownOpen(true)} className="bg-white font-semibold rounded-sm py-2 px-3 border border-gray-300">Add Different Image</button>
                ) : ""}
                {imageSourceSelect === "unsplashed" ? <p>{unsplashedRequestData.remaining} / {unsplashedRequestData.limit} per hour (unsplashed)</p> : ""}
                {imageSourceSelect === "default" ? <p>no request limit (default images)</p> : ""}
              </div>
          </div>
          {/* post title */}
          <div className="my-6">
            <h2 className="mb-2 font-semibold ">Add title</h2>
            <input className="w-full p-2 rounded-sm border border-gray-300" value={postInfo.postTitle} maxLength={postTitleMaxChar} onChange={(e) => setPostInfo({...postInfo,postTitle:e.target.value }) }/>
            <p className="mt-3 w-full text-end">{postInfo.postTitle.length} / {postTitleMaxChar}</p>
          </div>

          {/* select a tag for the post */}
          <div className="flex flex-col my-6">
            <label htmlFor="tags" className="mb-2 font-semibold">Select a tag:</label>
            <select id="tags" name="tags" className="w-full p-2 rounded-sm border border-gray-300" value={postInfo.postTag} onChange={(e) => {
              // setPostTag(e.target.value)
              setPostInfo({...postInfo,postTag:e.target.value })
              clearSearchInput()
            }}>
              <option value="">--Select a tag--</option>
              <option value="science">Science</option>
              <option value="gaming">Gaming</option>
              <option value="business">Business</option>
              <option value="movies">Movies</option>
              <option value="food">Food</option>
            </select>
          </div>

          {/* post text */}
          <div className="my-6">
            <h2 className="mb-2  font-semibold">Add text</h2>
            <textarea className="w-full h-72 p-2 rounded-sm border border-gray-300" value={postInfo.postText} onChange={(e) => setPostInfo({...postInfo,postText:e.target.value })} placeholder="Write your story here..." maxLength={postTextMaxChar}></textarea>
          </div>
              
          {/* publish / create the post */}
          <div className="mb-6 flex justify-between w-full">
            {/* <button className="bg-white text-black border-2 border-black rounded-sm py-2 px-3">Cancel</button> */}
            {/* using  toLocaleString() on postTextMaxChar to format it as 10,000 instead of it being 10000 */}
            <p>{postInfo.postText.length} / {postTextMaxChar.toLocaleString()}</p>
            <button className="bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700" type="button" disabled={isImagePreviewShown && currentImage && postInfo.postText && postInfo.postTag && postInfo.postText ? false : true} onClick={() => {
              // add the post to the database
              createPost(getPostData())
              // show the user that the post is being published
              setIsPublishPostDropdownShown(true)
              /* go to post the user just made,
              but wait 500 milliseconds because if you go
              right away the page wont load with the post data */
              setTimeout(() => {
                navigate(`/post/${createdPostId}`)
              }, 600)
            }}>Create Post</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAPost