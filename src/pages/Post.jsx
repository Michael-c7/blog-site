import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Tag from "../components/widgets/Tag"
import TestText from "../components/TestText"
import { 
  generateUniqueId,
  getTimeDifference,
  generateRandomName,
  socialMediaNumberFormatter,
} from "../utility/misc"
import InfoSidebar from "../components/InfoSidebar"
import Author from "../components/widgets/Author"
// import this as DateWidget so it doesn't conflict w/ the Date object
import DateWidget from "../components/widgets/Date"
// using for just the post click off, not comments click off
import useClickOff from "../hooks/useClickOff"

import useGetScrollY from "../hooks/useGetScrollY"


// icons
import { FaComment, FaRegHeart, FaEye } from "react-icons/fa"
import { RxDotsVertical } from "react-icons/rx"
import { AiOutlineEdit } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"
// test / placeholder images
import testImg from "../assets/images/testImg1.jpg"
import testImg2 from "../assets/images/testImg2.jpg"
import testAuthorImg from "../assets/images/testAuthorImg1.jpg"

// profanity filter
import swearjar from "swearjar-extended2"
import AreYouSureModal from "../components/AreYouSureModal"


const Post = () => {
  /*
  a temp variable to show the dots w/ dropdown
  to edit / delete a comment if
  the logged in user made the comment
  */
  let isUserComment = true

  let testAuthorDesc = "this is a test author description. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum?"

  let [wordLimitAmount, setWordLimitAmount] = useState(1000)
  let [currentUserCommentText, setCurrentUserCommentText] = useState("")
  let [isEditingEnabled, setIsEditingEnabled] = useState(false)
  let [currentCommentId, setCurrentCommentId] = useState(null)  
  // an array of object eg: [{ id:1234, isOpen:false }, { id:678, isOpen:true }]
  let [isDropdownOpen, setIsDropdownOpen] = useState([])
  // for the post dropdown, a boolean
  let [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false)
  // for the post itself
  let [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false)
  // for the post comments
  let [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false)

  let postDropdownDotsRef = React.useRef(null)
  let postDropdownMenuRef = React.useRef(null)

  
  let postACommentText = useRef(null)

  let [testCommentData, setTestCommentData] = useState([
    {
      text:"this is a test comment 1. Lorem, ipsum dolor sit amet consectetur?",
      id:generateUniqueId(),
      name:"john smith",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testAuthorImg,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 2. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum tempore doloremque saepe nam repudiandae?",
      id:generateUniqueId(),
      name:"john smith 2",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 3!!!",
      id:generateUniqueId(),
      name:"john smith 3",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 4. Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      id:generateUniqueId(),
      name:"john smith 4",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
  ])





  useEffect(() => {
    // getting and setting the dropdown items data
    let items = testCommentData.map((el, index) => {
      return {
        id:el.id,
        isOpen:false,
      }
    })

    setIsDropdownOpen(items)
  },[testCommentData])





  const closeAllDropdown = () => {
    let newItems = testCommentData.map((el, index) => {
      return {
        id:el.id,
        isOpen:false,
      }
    })
    setIsDropdownOpen(newItems)
  }





  const cancelBtn = _ => {
    setCurrentUserCommentText("")
    setIsEditingEnabled(false)
  }





  const postComment = () => {
    // post the comment locally in the dom
    let newItem = {
      text:swearjar.censor(currentUserCommentText),
      id:generateUniqueId(),
      // get the name from the current logged in user, for test use fake name
      name:generateRandomName(),
      dateCreated:Date(),
      // get the profileImg from the current logged in user, for test use fake profileImg
      profileImg:testAuthorImg,
      hasBeenEdited:false,
    }

    const oldItems = testCommentData

    const allItem = [newItem, ...oldItems]
    setTestCommentData(allItem)

    // removes the text form the input & sets isEditingEnabled to false
    cancelBtn()
    // post the comment in the database [NEED TO ADD]
  }





  /* this function edits the comment */
  const editComment = (arr) => {
    // edit the comment locally in the dom
    // get index of current comment in testCommentData
    const currentIndex = testCommentData.findIndex(el => el.id === currentCommentId)

    // get current item and update it w/ the text form textarea
    let oldCurrentItem = testCommentData.filter((el) => el.id === currentCommentId)[0]

    let newCurrentItem = {
      text:swearjar.censor(currentUserCommentText),
      id:oldCurrentItem.id,
      name:oldCurrentItem.name,
      dateCreated:oldCurrentItem.dateCreated,
      profileImg:oldCurrentItem.profileImg,
      hasBeenEdited:true,
    }
    
    // get all old item minus current item
    let allOldItemsMinusCurrent = testCommentData.filter((el) => el.id !== currentCommentId)
    allOldItemsMinusCurrent.splice(currentIndex,0,newCurrentItem)
    setTestCommentData(allOldItemsMinusCurrent)

    setCurrentUserCommentText("")
    setIsEditingEnabled(false)

    // edit the comment in the database [NEED TO ADD]
  }





  const deleteComment = (id) => {
    // deletes the comment locally in the dom
    let filteredComments = testCommentData.filter((el) => el.id !== id)
    setTestCommentData(filteredComments)
    // delete the comment in the database [NEED TO ADD]
  }





  /*editBtn is the functionality of pressing
  the edit button in the dropdown menu */
  const editBtn = (id, text) => {
    document.querySelector("#post-a-comment-input").focus()
    setIsEditingEnabled(true)
    closeAllDropdown()
    // to know what to update
    setCurrentCommentId(id)
    // text to update
    setCurrentUserCommentText(text)
  }





  const handleCommentMenuInteraction = event => {
    let currentComment = event.target.closest("#post-comment")
    let currentId = currentComment?.getAttribute("data-uniqueid")
    let currentDots = event.target.closest(".dots-btn")
    let currentMenu = document.querySelector(".dropdown-menu-container--open")

    let newItems = testCommentData.map((el) => {
      if(el.id === currentId) {
        let currentIsOpen = isDropdownOpen.filter((el) => el.id === currentId)[0]?.isOpen
        return {
          id:el.id,
          isOpen:currentIsOpen ? false : true,
        }
      } else {
        return {
          id:el.id,
          isOpen:false,
        }
      }
    })
    
    if(currentDots) {
      // toggle open / closed
      setIsDropdownOpen(newItems)
    } else if(currentMenu?.contains(event.target)) {
      // stay open / do nothing
    } else {
      // close menu
      closeAllDropdown()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCommentMenuInteraction);
      
    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleCommentMenuInteraction);
    };
  })

  // for the post dots / menu
  useClickOff(postDropdownMenuRef, postDropdownDotsRef, setIsPostDropdownOpen)





  return (
    <>
    {/* for the post dropdown menu */}
    <AreYouSureModal {...{isOpen:isDeletePostModalOpen, setIsOpen:setIsDeletePostModalOpen, confirmFunction:"", headingText:"Are you sure you want to delete this post?", }}/>

    {/* for the comment dropdown menu */}
    <AreYouSureModal {...{isOpen:isDeleteCommentModalOpen, setIsOpen:setIsDeleteCommentModalOpen, confirmFunction:deleteComment,confirmFunctionArgs:currentCommentId, headingText:"Are you sure you want to delete this comment?", }}/>

    <article className="outer-width mx-auto">
      <div className="min-[990px]:grid min-[990px]:grid-cols-3 min-[990px]:my-12 my-6 gap-12 flex flex-col">
        <div className="col-span-2">
          {/* main post content section */}
          <header className="mb-4">
            <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
            <div className="relative">
              <div className="flex items-center">
                <h2 className="font-bold text-4xl my-4">this is the test post title</h2>
                {isUserComment ? (
                  <button className="dots-btn ml-auto" ref={postDropdownDotsRef} onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}>
                    <RxDotsVertical/>
                  </button>
                ) : ""}
              </div>
                {/* post dropdown menu */}
                <div  ref={postDropdownMenuRef} className={`dropdown-menu-container ${isPostDropdownOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed hidden"} top-[60px] w-28 flex`}>
                  <ul className="w-full">
                    {/* <li className="mb-4 w-full">
                      <button className="flex flex-row items-center w-full" type="button" onClick={() => console.log("post edit btn here")}>
                         <AiOutlineEdit/>
                         <span className="ml-2">Edit</span>
                      </button>
                    </li> */}
                    <li className="mt-0">
                      <button className="flex flex-row items-center w-full text-red-600" type="button" onClick={() => {
                        setIsPostDropdownOpen(false)
                        setIsDeletePostModalOpen(true)
                      }}>
                        <BiTrash/>
                        <span className="ml-2">Delete</span>
                      </button>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="flex flex-col gap-1 min-[375px]:flex-row min-[375px]:gap-0 items-center">
              <Author {...{textColor:"#000"}}/>
              <DateWidget {...{textColor:"#000"}}/>
              <div className="flex items-center text-sm mx-3">
                <FaComment className="text-xs mr-1"/>
                {/* this is a temp test number */}
                <p>{socialMediaNumberFormatter.format(25000)} comments</p>
              </div>
              <div className="flex items-center text-sm ">
                <FaRegHeart className="text-xs mr-1"/>
                {/* this is a temp test number */}
                <p>{socialMediaNumberFormatter.format(30000)}</p>
              </div>
              <div className="flex items-center text-sm mx-3">
                <FaEye className="mr-1"/>
                {/* this is a temp test number */}
                <p>{socialMediaNumberFormatter.format(20000)}</p>
              </div>
            </div>
          </header>
          {/* post section */}
          <section>
            {/* the actual post */}
            <img src={testImg} alt="alt text for main img" className="w-full rounded-xl my-6"/>
            <TestText amount={10}/>
            {/* author details section */}
            <div className="flex flex-col md:flex-row md:text-left text-center gap-4 my-12">
              <Link to="/author link here" className="w-28 h-28 rounded-full flex-shrink-0 mx-auto">
                <img src={testAuthorImg} className="w-28 h-28 rounded-full object-cover"/>
              </Link>
              <div className="flex-auto">
                <h3 className="text-xl font-bold mb-1 capitalize"><Link to="/author link here">john johnson</Link></h3>
                <p>{testAuthorDesc}</p>
              </div>
            </div>
          </section>

          {/* comments section */}
          <section className="p-6 bg-slate-100 rounded">
            {/* post a comment */}
            <div className={`${testCommentData.length < 1 ? "mb-0" : "mb-12"}`}>
              <div className="flex flex-row gap-4">
                <Link to="/author link here" className="rounded-full w-14 h-12 ">
                  <img src={testImg} alt="alt text" className="rounded-full w-full h-full"/>
                </Link>
                <textarea id="post-a-comment-input" onChange={() => setCurrentUserCommentText(postACommentText.current.value)} ref={postACommentText} value={currentUserCommentText} maxLength={wordLimitAmount} placeholder="Join the discussion and leave a comment!" className=" resize-y w-full h-24 border border-gray-300 rounded-sm p-2"></textarea>
              </div>
              <div className="flex min-[425px]:flex-row flex-col min-[425px]:justify-between justify-center items-center mt-3  min-[425px]:ml-0  ml-16">
                <p className="min-[425px]:ml-16 ml-0 min-[425px]:mb-0 mb-4">{currentUserCommentText.length} / {wordLimitAmount}</p>

                <div className="flex min-[425px]:flex-row flex-col gap-4">
                  {isEditingEnabled ? (
                    <button className="bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700" disabled={currentUserCommentText.length >= 1 ? false : true} type="button" onClick={() => editComment()}>Update Comment</button>
                  ) : (
                    <button className="bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700" disabled={currentUserCommentText.length >= 1 ? false : true} type="button" onClick={() => postComment()}>Post comment</button>
                  )}
                  <button className="bg-white text-black border-2 border-black rounded-sm py-2 px-3" onClick={() => cancelBtn()}>Cancel</button>
                </div>
              </div>
            </div>
            {testCommentData.length <= 0 && <h2 className="mt-12 text-center text-lg">Leave a comment and start the discussion!</h2>}
            
            {/* comments */}
            <ul className="w-full my-6">
              {/* comment */}
              {testCommentData.map((el, index) => {
                const { id } = el
                let isOpen = isDropdownOpen.filter((el) => el.id === id)[0]?.isOpen
             
                return (
                  <li id="post-comment" data-uniqueid={el.id} className="flex flex-row gap-4 w-full my-8 relative" key={index}>
                  <Link to="/author link goes here" className="rounded-full w-14 h-12 ">
                    <img src={el.profileImg} alt="alt text" className="rounded-full w-12 h-12 object-cover"/>
                  </Link>
                  <div id="container-test" className="w-full">
                    <header className="flex flex-row items-center w-full ">
                      <Link to="/link to author here">
                        <h2 className="font-medium mr-2">{el.name}</h2>
                      </Link>
                      <p className="text-slate-500 text-sm">{getTimeDifference(el.dateCreated, Date())}</p>
                      {el.hasBeenEdited ? <span className="text-slate-500 text-sm ml-1">(edited)</span> : ""}
                      {isUserComment ? (
                        <button className="dots-btn ml-auto">
                          <RxDotsVertical/>
                        </button>
                      ) : ""}
                      {/* comment dropdown menu */}
                      <div className={`dropdown-menu-container ${isOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed hidden"} top-[30px] w-28 flex`}>
                        <ul className="w-full">
                          <li className="mb-4 w-full">
                            <button className="flex flex-row items-center w-full" type="button" onClick={() => editBtn(el.id, el.text)}>
                              <AiOutlineEdit/>
                              <span className="ml-2">Edit</span>
                            </button>
                          </li>
                          <li className="mt-4">
                            <button className="flex flex-row items-center w-full text-red-600" type="button" onClick={() => {
                              setIsDeleteCommentModalOpen(true)
                              setCurrentCommentId(id)
                            }}>
                              <BiTrash/>
                              <span className="ml-2">Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </header>
                    <p className="flex flex-row flex-wrap">{el.text}</p>
                  </div>
                </li>
                )
              })}
            </ul>
          </section>
        </div>
        {/* info sidebar */}
        <InfoSidebar/>
      </div>
    </article>
  </>
  )
}

export default Post