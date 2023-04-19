import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Tag from "../components/widgets/Tag"

import { 
  generateUniqueId,
  getTimeDifference,
  socialMediaNumberFormatter,
} from "../utility/misc"
import InfoSidebar from "../components/InfoSidebar"
import Author from "../components/widgets/Author"
// import this as DateWidget so it doesn't conflict w/ the Date object
import DateWidget from "../components/widgets/Date"
// using for just the post click off, not comments click off
import useClickOff from "../hooks/useClickOff"

import useGetScrollY from "../hooks/useGetScrollY"
import AreYouSureModal from "../components/AreYouSureModal"

// icons
import { FaComment, FaRegHeart, FaEye } from "react-icons/fa"
import { RxDotsVertical } from "react-icons/rx"
import { AiOutlineEdit } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"
// test / placeholder images
import defaultUserImg from "../assets/images/defaultUser.png"

// profanity filter
import swearjar from "swearjar-extended2"



import { useBlogContext } from "../contexts/blog_context"
import { useAuthContext } from "../Auth/AuthContext"


const Post = () => {
  const { 
    getPost,
    currentPost,
    currentUserName,
    currentDisplayName,
    createPostComment,
    getPostComments,
    currentPostComments,
    editPostComment,
    deletePostComment,
  } = useBlogContext()

  const { 
    isLoggedIn,
    user,
  } = useAuthContext()

  let authorDesc = "My goal is to create content that provides value to my readers in an engaging and informative way. Whether I have a specific area of expertise or cover a range of topics, I strive to write high-quality content that resonates with my audience and builds a community around my blog."

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

  // let [localCommentData, setLocalCommentData] = useState([
  //   {
  //     text:"this is a test comment 1. Lorem, ipsum dolor sit amet consectetur?",
  //     id:generateUniqueId(),
  //     authorDisplayName:"john smith",
  //     createdAt:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
  //     isEdited:false,
  //   },
  //   {
  //     text:"this is a test comment 2. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum tempore doloremque saepe nam repudiandae?",
  //     id:generateUniqueId(),
  //     authorDisplayName:"john smith 2",
  //     createdAt:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
  //     isEdited:false,
  //   },
  //   {
  //     text:"this is a test comment 3!!!",
  //     id:generateUniqueId(),
  //     authorDisplayName:"john smith 3",
  //     createdAt:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
  //     isEdited:false,
  //   },
  //   {
  //     text:"this is a test comment 4. Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  //     id:generateUniqueId(),
  //     authorDisplayName:"john smith 4",
  //     createdAt:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
  //     isEdited:false,
  //   },
  // ])

  
  
  let [localCommentData, setLocalCommentData] = useState([])


  let [currentPostId, setCurrentPostId] = useState("")



  const getCommentData = () => {
    // currentPostId
    let data = {
      id:generateUniqueId(),
      authorUid:user.uid,
      authorUsername:currentUserName,
      authorDisplayName:currentDisplayName,
      createdAt:new Date(),
      text:currentUserCommentText,
      isEdited:false,
    }
    return data
    // console.log(data, currentPostId)
  }



// get current postID
  useEffect(() => {
    // gets the current url
    const currentUrl = window.location.href;
    {/* the URL is first parsed using the URL constructor
    to create a URL object. The pathname property
    of the URL object is then accessed,
    which returns the path component of the URL */}
    const url = new URL(currentUrl);
    const postId = url.pathname.split('/').pop();
    setCurrentPostId(postId)
  }, [])


// get post data
  useEffect(() => {
    getPost(currentPostId)

    getPostComments(currentPostId)
  }, [currentPostId])

  // set local commentData w/ the actual commentData
  useEffect(() => {
    setLocalCommentData(currentPostComments)

  },[currentPostComments])




  useEffect(() => {
    // getting and setting the dropdown items data
    let items = localCommentData.map((el, index) => {
      return {
        id:el.id,
        isOpen:false,
      }
    })

    setIsDropdownOpen(items)
  },[localCommentData])





  const closeAllDropdown = () => {
    let newItems = localCommentData.map((el, index) => {
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
      // get the authorDisplayName from the current logged in user, for test use fake authorDisplayName
      authorDisplayName:currentDisplayName,
      createdAt:Date(),
      isEdited:false,
    }

    const oldItems = localCommentData

    const allItem = [newItem, ...oldItems]
    setLocalCommentData(allItem)

    // removes the text form the input & sets isEditingEnabled to false
    cancelBtn()
    // post the comment in the database
    createPostComment(currentPostId, getCommentData())
  }





  /* this function edits the comment */
  const editComment = (arr) => {
    // edit the comment locally in the dom
    // get index of current comment in localCommentData
    const currentIndex = localCommentData.findIndex(el => el.id === currentCommentId)

    // get current item and update it w/ the text form textarea
    let oldCurrentItem = localCommentData.filter((el) => el.id === currentCommentId)[0]

    let newCurrentItem = {
      text:swearjar.censor(currentUserCommentText),
      id:oldCurrentItem.id,
      authorDisplayName:oldCurrentItem.authorDisplayName,
      createdAt:oldCurrentItem.createdAt,
      isEdited:true,
    }
    
    // get all old item minus current item
    let allOldItemsMinusCurrent = localCommentData.filter((el) => el.id !== currentCommentId)
    allOldItemsMinusCurrent.splice(currentIndex,0,newCurrentItem)
    setLocalCommentData(allOldItemsMinusCurrent)

    setCurrentUserCommentText("")
    setIsEditingEnabled(false)

    // edit the comment in the database 
    editPostComment(currentPostId, currentCommentId, currentUserCommentText)
  }





  const deleteComment = (id) => {
    // deletes the comment locally in the dom
    let filteredComments = localCommentData.filter((el) => el.id !== id)
    setLocalCommentData(filteredComments)
    // delete the comment in the database [NEED TO ADD]
    deletePostComment(currentPostId, currentCommentId)
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

    let newItems = localCommentData.map((el) => {
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


  // useEffect(() => {
  //   // https://ip-api.com/docs/api:json
  //   // up to 45 HTTP requests per minute from an ip address
  //   fetch("http://ip-api.com/json")
  //   .then((res) => res.json())
  //   .then(data => console.log(data))

  // })




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
            <Tag {...{bgColor:"--category--science", link:`/category/${currentPost.tag}`, text:currentPost.tag}}/>
            <div className="relative">
              <div className="flex items-center ">
                <h2 className="font-bold text-4xl my-4">{currentPost.title}</h2>
                {/* this is be checking if current user uid is same as user uid of the author of the post not if user is logged in not not */}
                {user?.uid === currentPost?.authorUid ? (
                  <button className="dots-btn ml-auto relative top-1" ref={postDropdownDotsRef} onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}>
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
              <Author {...{textColor:"#000", authorLink:`/author/${currentPost.username}`, authorName:currentPost.displayName}}/>
              <DateWidget {...{textColor:"#000", date:currentPost.createdAt}}/>
              <div className="flex items-center text-sm mx-3">
                <FaComment className="text-xs mr-1"/>
                {/* this is a temp test number */}
                <p>{socialMediaNumberFormatter.format(localCommentData.length)} comments</p>
              </div>
              <div className="flex items-center text-sm">
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
            <img src={currentPost.image} alt={currentPost.altText ? currentPost.altText : ""} className="w-full rounded-xl my-6"/>
            <p className="leading-relaxed">{currentPost.text}</p>
            {/* author details section */}
            <div className="flex flex-col md:flex-row md:text-left text-center gap-4 my-12">
              <Link to={`/author/${currentPost.username}`} className="w-28 h-28 rounded-full flex-shrink-0 mx-auto">
                <img src={defaultUserImg} className="w-28 h-28 rounded-full object-cover"/>
              </Link>
              <div className="flex-auto">
                <h3 className="text-xl font-bold mb-1 capitalize"><Link to={`/author/${currentPost.username}`}>{currentPost.displayName}</Link></h3>
                <p>{authorDesc}</p>
              </div>
            </div>
          </section>

          {/* comments section */}
          <section className="p-6 bg-slate-100 rounded">
            {/* post a comment */}
            <div className={`${localCommentData.length < 1 ? "mb-0" : "mb-12"}`}>
              <div className="flex flex-row gap-4">
                <Link to="/author link here" className="rounded-full w-14 h-12 ">
                  <img src={defaultUserImg} alt="alt text" className="rounded-full w-full h-full"/>
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
            {localCommentData.length <= 0 && <h2 className="mt-12 text-center text-lg">Leave a comment and start the discussion!</h2>}
            
            {/* comments */}
            <ul className="w-full my-6">
              {/* comment */}
              {localCommentData.map((el, index) => {
                const { id } = el
                let isOpen = isDropdownOpen.filter((el) => el.id === id)[0]?.isOpen
             
                return (
                  <li id="post-comment" data-uniqueid={el.id} className="flex flex-row gap-4 w-full my-8 relative" key={index}>
                  <Link to="/author link goes here" className="rounded-full w-14 h-12 ">
                    <img src={defaultUserImg} alt="alt text" className="rounded-full w-12 h-12 object-cover"/>
                  </Link>
                  <div id="container-test" className="w-full">
                    <header className="flex flex-row items-center w-full ">
                      <Link to="/link to author here">
                        <h2 className="font-medium mr-2">{el.authorDisplayName}</h2>
                      </Link>
                      <p className="text-slate-500 text-sm">{getTimeDifference(el.createdAt, Date())}</p>
                      {el.isEdited ? <span className="text-slate-500 text-sm ml-1">(edited)</span> : ""}
                      {/* this should be user?.uid === commentUser?.uid or something like that */}
                      {isLoggedIn ? (
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