import React, { useState, useRef, useEffect } from "react"
import GeneralPageHeading from "../components/GeneralHeading"

import useClickOff from "../hooks/useClickOff"

import { defaultImgData } from "../utility/reusable"
import testImg1 from "../assets/images/testImg1.jpg"
import { generateUniqueId } from "../utility/misc"

import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { BiSearch, BiTrash } from "react-icons/bi"
import { RiCloseLine } from "react-icons/ri"

const CreateAPost = () => {
  const [postTitleMaxChar, setPostTitleMaxChar] = useState(100)
  const [postTextMaxChar, setPostTextMaxChar] = useState(5000)
  const [postInfo, setPostInfo] = useState({postTitle:"", postTag:"", postText:""})

  const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false)
  const [isImagePreviewShown, setIsImagePreviewShown] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [searchImageText, setSearchImageText] = useState("")
  const [imageSourceSelect, setImageSourceSelect] = useState("default")
  // eg: 5 / 50 request per hour (unsplashed)
  const [imageRequestAmountText, setImageRequestAmountText] = useState("")
  const [unsplashedRequestData, setUnsplashedRequestData] = useState({remaining:"", limit:""})

  const [dropdownImages, setDropdownImages] = useState(defaultImgData)
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoadingDropdownImages, setIsLoadingDropdownImages] = useState(false)
  const [errorInfo, setErrorInfo] = useState({isError:false,errorMessage:""})

  const openImageDropdownRef = useRef(null)
  const imageDropdownMenuRef = useRef(null)


  // for image select dropdown menu
  // useClickOff(imageDropdownMenuRef,openImageDropdownRef, setIsImageDropdownOpen)


  /*
  TODO:
    - get real images from api(s) [X]
    - search functionality w/ api's [X]
    - return and display result [X]
    - plus error checking [X]

    - fix ui bug where the text to show request amount doesn't show,
    to fix have to get it independency
    and update the way it used to on
    imageSourceSelect, dropdownImages update in a useEffect),
    not just w/ search

    - debounce search to use up less tokens
    
    - plus display the errors

    - switch between api's

    - update the per hour counter w/ real data for each api call (unsplashed)
    
    - compress images chosen image in createPost function
      - could use: https://tinypng.com/developers (500 images a month free)

    - firebase stuff(post to the database)
  */


  const chooseImage = (data) => {
    // get the image from the dropdown onClick
    let targetImg = data.src
    // set it to the currentImage / setCurrentImage(imageHere)
    setCurrentImage(targetImg)
    // set to true / setIsImagePreviewShown(true)
    setIsImagePreviewShown(true)
    // close the drop down menu / setIsImageDropdownOpen(false)
    setIsImageDropdownOpen(false)
  }





  const createPost = () => {
    let data = {
      id:generateUniqueId(),
    }

    // get post image
    if(isImagePreviewShown && currentImage) {
      data = {...data, image:currentImage}
    }

    // get post title
    if(postInfo.title) {
      data = {...data, title:postInfo.title}
    }
    
    // get post tag
    if(postInfo.postTag) {
      data = {...data, tag:postInfo.postTag}
    }

    // get post text
    if(postInfo.postText) {
      data = {...data, text:postInfo.postText}
    }
    console.log(data)
    // compress chosen image [NEED TO ADD]

    // create / send the post in the database [NEED TO ADD]
  }




 


  const fetchUnsplashedImages = async () => {
    /*
    data to get: image, alt text, how much request used & available
    */
    let baseUrl = "https://api.unsplash.com"
    let photoSearch = "search/photos"
    let currentPageEl = `page=${currentPage}`
    let query = `query=${searchImageText}&orientation=landscape`
    let clientId = `client_id=${import.meta.env.VITE_UNSPLASHED_ACCESS_KEY}`
    let unsplashedFullString = `${baseUrl}/${photoSearch}?${currentPageEl}&${query}&${clientId}`

    

    try {
      setIsLoadingDropdownImages(true)
      const response = await fetch(unsplashedFullString);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()

      // get rate limit
      const remaining = response.headers.get('x-ratelimit-remaining');
      const limit = response.headers.get('x-ratelimit-limit');
      setUnsplashedRequestData({...unsplashedRequestData, remaining, limit})

      setIsLoadingDropdownImages(false)
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
      // get data we need, and set it , setDropdownImages()
      setDropdownImages(refinedData)
     
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
      setIsLoadingDropdownImages(false)
      setErrorInfo({isError:true, errorMessage:error})
    }
  }



  const closeDropdown = () => {
    setIsImageDropdownOpen(false)
    setImageSourceSelect("default")
    setSearchImageText("")
    setDropdownImages(defaultImgData)
  }






  useEffect(() => {
    // dropdownImagesToShow(imageSourceSelect)

    if(imageSourceSelect === "unsplashed") {      
      // get images from unsplashed api
      if(searchImageText === "") {
        setDropdownImages(defaultImgData)
      } else {
        fetchUnsplashedImages()
      }
    }
    // console.log(imageSourceSelect)
  }, [imageSourceSelect, searchImageText])



  useEffect(() => {
    // determine and set the request amt text
    if(imageSourceSelect === "unsplashed") {
      // get request amount from unsplashed api
      let clientId = `client_id=${import.meta.env.VITE_UNSPLASHED_ACCESS_KEY}`

      fetch(`https://api.unsplash.com/photos/?${clientId}`,{
        method: 'HEAD'
      })
      .then(response => {
        const remaining = response.headers.get('x-ratelimit-remaining');
        const limit = response.headers.get('x-ratelimit-limit');
        // set here
        setUnsplashedRequestData({...unsplashedRequestData, remaining, limit})
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
      // 5 / 50 request per hour (unsplashed)

      
    } else if(imageSourceSelect === "default") {
      setImageRequestAmountText("no request limit (default images)")
    }
  },[imageSourceSelect, dropdownImages])



  

  return (
    <>
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
                    // setCurrentImage("")
                    setIsImagePreviewShown(false)
                  }}>
                    <BiTrash/>
                  </button>
                </div>
                <img src={currentImage} alt={currentImage} className="object-cover w-full h-full rounded-sm"/>
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
                  <input className="bg-slate-100 w-full focus:outline-none focus:border-transparent" placeholder="search for an image" value={searchImageText} onChange={(e) => setSearchImageText(e.target.value)} />
                  <button className="text-lg px-0 bg-gray-100 min-[376px]:text-slate-500 text-slate-700 min-[376px]:bg-transparent" onClick={() => setSearchImageText("")}>
                    <RiCloseLine/>
                  </button>
                </div>
                <div className="px-2 min-[376px]:py-0 py-6 ">
                  {/* goes here */}
                  <select id="image-source" value={imageSourceSelect} onChange={(e) => setImageSourceSelect(e.target.value)}>
                    <option value="unsplashed">Unsplashed</option>
                    <option value="default">Default</option>
                  </select>
                </div>
                <button className="text-2xl px-3 bg-gray-100 min-[376px]:text-slate-500 text-slate-700 min-[376px]:bg-transparent" onClick={() => closeDropdown()}>
                  <RiCloseLine/>
                </button>
              </header>
              <section className="my-4 h-full overflow-auto before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-slate-100 before:left-0">
                <div className="grid grid-cols-2 gap-3 h-full px-3 ">
                  {!isLoadingDropdownImages ? dropdownImages.map((el, index) => {
                    return (
                      <button key={index} onClick={(e) => {
                        chooseImage(e.target)
                      }}>
                        <img src={el.image} alt={el.description} title={el.description} className="w-full h-full object-cover" />
                      </button>
                    )
                  }) : <h2>Loading...</h2>}
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
              setSearchImageText("")
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
            <p>{postInfo.postText.length} / {postTextMaxChar}</p>
            <button className="bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700" type="button" disabled={isImagePreviewShown && currentImage && postInfo.postText && postInfo.postTag && postInfo.postText ? false : true} onClick={() => createPost()}>Create Post</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default CreateAPost