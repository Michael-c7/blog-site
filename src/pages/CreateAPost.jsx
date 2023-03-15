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
  const [postTitle, setPostTitle] = useState("")
  const [postTitleMaxChar, setPostTitleMaxChar] = useState(100)

  const [postTag, setPostTag] = useState("")
  const [postText, setPostText] = useState("")
  const [postTextMaxChar, setPostTextMaxChar] = useState(5000)

  const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false)
  const [isImagePreviewShown, setIsImagePreviewShown] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [searchImageInput, setSearchImageInput] = useState("")
  const [imageSourceSelect, setImageSourceSelect] = useState("unsplashed")
  // eg: 5 / 50 request per hour (unsplashed)
  const [imageSourceSelectText, setImageSourceSelectText] = useState("")

  const [dropdownImages, setDropdownImages] = useState([])

  const openImageDropdownRef = useRef(null)
  const imageDropdownMenuRef = useRef(null)


  // for image select dropdown menu
  // useClickOff(imageDropdownMenuRef,openImageDropdownRef, setIsImageDropdownOpen)


  /*
  TODO:
    - add image [X]
    - remove image [X]
    - add different image [X]
    - get all data into createPost function [X]

    - add uniqueId to post [DOING NOW]
    - fix style to look good
    - create mobile version

    - get real images from api(s)

    - search functionality w/ api's

    - switch between api's

    - have search dropdown be infinite scroll type thing

    - update the per hour counter w/ real data fro each api used (unsplashed, pexels)
    
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
    if(postTitle) {
      data = {...data, title:postTitle}
    }
    
    // get post tag
    if(postTag) {
      data = {...data, tag:postTag}
    }

    // get post text
    if(postText) {
      data = {...data, text:postText}
    }
    console.log(data)
    // compress chosen image [NEED TO ADD]

    // create / send the post in the database [NEED TO ADD]
  }





  const dropdownImagesToShow = (imageSource) => {
    if(imageSource.toLowerCase() === "unsplashed") {
      // get images from unsplashed api

      // set it
      // return array of obj w/ img
    } else if(imageSource.toLowerCase() === "pexels") {
      // get images from pexels api

      // set it
      // return array of obj w/ img
      // setDropdownImages()

    } else if(imageSource.toLowerCase() === "default") {
      // get images from default images folder // defaultImages
      
      // set it
      setDropdownImages(defaultImgData)
    }
  }

  useEffect(() => {
    // dropdownImagesToShow(imageSourceSelect)

    dropdownImagesToShow("default")
    // console.log(dropdownImages)
  }, [imageSourceSelect])



  useEffect(() => {
    // determine and set the request amt text
    if(imageSourceSelect === "unsplashed") {
      // get request amount from unsplashed api
      let unsplashedRequestAmount = 12
      let unsplashedRequestTotal = 50
      setImageSourceSelectText(`${unsplashedRequestAmount} / ${unsplashedRequestTotal} per hour (unsplashed)`)

      // 5 / 50 request per hour (unsplashed)
      
    } else if(imageSourceSelect === "pexels") {
      // get request amount from pexels api
      let pexelsRequestAmount = 17
      let pexelsRequestTotal = 200
      setImageSourceSelectText(`${pexelsRequestAmount} / ${pexelsRequestTotal} per hour (pexels)`)

      
    } else if(imageSourceSelect === "default") {
      setImageSourceSelectText("no request limit (default images)")
    }
  },[imageSourceSelect])



  

  return (
    <div className="">
      <GeneralPageHeading text={"create a post"}/>

      <div className="outer-width mx-auto my-0 flex flex-col justify-center relative">
        {/* image section */}
        <div className="my-6 relative">
          <h2 className="mb-2 font-semibold">Add an image</h2>
          {isImagePreviewShown ? (
            <div className="flex rounded-sm w-1/2 h-72 text-white">
              <div className="absolute w-1/2 flex justify-end p-2">
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
            <div className=" bg-gray-100 p-4 flex rounded-sm w-1/2 border-2 border-dashed border-blue-500" >
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
          <div ref={imageDropdownMenuRef} className={`dropdown-menu-container ${isImageDropdownOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed hidden"} left-0 w-1/2 h-72 grid grid-col-2 px-0`}>
            <header className="flex items-center relative px-3">
              {/* search image container */}
              <div className="bg-slate-100 flex items-center p-2 w-full">
                <div className="top-[2px] relative text-slate-500 text-lg mr-1">
                  <BiSearch/>
                </div>
                <input className="bg-slate-100 w-full focus:outline-none focus:border-transparent" placeholder="search for an image" onChange={(e) => setSearchImageInput(e.target.value)} />
              </div>
              <div className="px-2">
                {/* goes here */}
                <select id="image-source" value={imageSourceSelect} onChange={(e) => setImageSourceSelect(e.target.value)}>
                  <option value="unsplashed">Unsplashed</option>
                  <option value="pexels">Pexels</option>
                  <option value="default">Default</option>
                </select>
              </div>
              <button className="text-2xl text-slate-500 px-3" onClick={() => setIsImageDropdownOpen(false)}>
                <RiCloseLine/>
              </button>
            </header>
            <section className="my-4 h-full overflow-auto before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-slate-100 before:left-0">
              <div className="grid grid-cols-2 gap-3 h-full px-3 ">
                {dropdownImages.map((el, index) => {

                  return (
                    <button key={index} className="" onClick={(e) => {
                      chooseImage(e.target)
                    }}>
                      <img src={el.src} alt="alt text here" />
                    </button>
                  )
                })}
              </div>
            </section>
          </div> 
          <div className={`mt-4 flex items-center ${isImagePreviewShown ? "justify-between" : "justify-end"}  w-1/2`}>
              {isImagePreviewShown ? (
                <button ref={imageDropdownMenuRef}  onClick={() => setIsImageDropdownOpen(true)} className="bg-white font-semibold rounded-sm py-2 px-3 border border-gray-300">Add Different Image</button>
              ) : ""}
              <p className="">{imageSourceSelectText}</p>
            </div>
        </div>
        {/* post title */}
        <div className="my-6">
          <h2 className="mb-2 font-semibold ">Add title</h2>
          <input className="w-1/2 p-2 rounded-sm border border-gray-300" value={postTitle} maxLength={postTitleMaxChar} onChange={(e) => setPostTitle(e.target.value)}/>
          <p className="mt-3 w-1/2 text-end">{postTitle.length} / {postTitleMaxChar}</p>
        </div>

        {/* select a tag for the post */}
        <div className="flex flex-col my-6">
          <label htmlFor="tags" className="mb-2 font-semibold">Select a tag:</label>
          <select id="tags" name="tags" className="w-1/2 p-2 rounded-sm border border-gray-300" value={postTag} onChange={(e) => setPostTag(e.target.value)}>
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
          <textarea className="w-1/2 h-72 p-2 rounded-sm border border-gray-300" value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Write your story here..." maxLength={postTextMaxChar}></textarea>
        </div>

        {/* publish / create the post */}
        <div className="mb-6 flex justify-between w-1/2">
          {/* <button className="bg-white text-black border-2 border-black rounded-sm py-2 px-3">Cancel</button> */}
          <p>{postText.length} / {postTextMaxChar}</p>
          <button className="bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700" type="button" disabled={isImagePreviewShown && currentImage && postTitle && postTag && postText ? false : true} onClick={() => createPost()}>Create Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreateAPost