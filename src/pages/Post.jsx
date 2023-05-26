// react and third-party libraries
import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom";;

// components and pages
import Tag from "../components/widgets/Tag";
import InfoSidebar from "../components/InfoSidebar";
import Author from "../components/widgets/Author";
import DateWidget from "../components/widgets/Date";
import AreYouSureModal from "../components/AreYouSureModal";
import Error from "../pages/Error";

// assets and external libraries
import defaultUserImg from "../assets/images/defaultUser.png";


// utility functions and hooks
import { 
  generateUniqueId,
  getTimeDifference,
  socialMediaNumberFormatter,
} from "../utility/misc";
import useClickOff from "../hooks/useClickOff";

// context providers
import { useBlogContext } from "../contexts/blog_context";
import { useAuthContext } from "../Auth/AuthContext";

// icon imports
import { FaComment, FaRegHeart, FaHeart, FaEye } from "react-icons/fa";
import { RxDotsVertical } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";


const Post = () => {
  const { postId } = useParams();

  const { 
    // post
      getPost,
      currentPost,
      deletePost,
      isCurrentPostLoading,
    // post comments
      createPostComment,
      getPostComments,
      currentPostComments,
      editPostComment,
      deletePostComment,
    // post likes
      togglePostLike,
    // post views
      currentPostViews,
      getPostViewData,
      addPostViewData,
      postIdExistsInViewsDatabase,
    // username & displayName
      currentUserName,
      currentDisplayName,
  } = useBlogContext()

  const { 
    isLoggedIn,
    user,
  } = useAuthContext()

// Author description for the blog
let authorDesc = "We don't know a lot about them, but we're sure they're great. Their air of mystery only adds to the intrigue surrounding them. From what little information we have, they possess an undeniable charisma and captivating presence that draws people towards them."

// State variables with their initial values using useState hook
let [wordLimitAmount, setWordLimitAmount] = useState(1000)
let [currentUserCommentText, setCurrentUserCommentText] = useState("")
let [isEditingEnabled, setIsEditingEnabled] = useState(false)
let [currentCommentId, setCurrentCommentId] = useState(null)  

// An array of object eg: [{ id:1234, isOpen:false }, { id:678, isOpen:true }]
let [isDropdownOpen, setIsDropdownOpen] = useState([])

// State variables for modals
let [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false) // for the post dropdown
let [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false) // for the post itself
let [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false) // for the post comments

// Refs
let postDropdownDotsRef = React.useRef(null) // Ref for post dropdown dots
let postDropdownMenuRef = React.useRef(null) // Ref for post dropdown menu
let postACommentText = useRef(null) // Ref for posting a comment

// State variable to store local comment data
let [localCommentData, setLocalCommentData] = useState([])

let [currentPostId, setCurrentPostId] = useState("") // State variable for current post id

let [isPostLikedByCurrentUser, setIsPostLikedByCurrentUser] = useState(false) // State variable to check if post is liked by current user

// State variable to store user ids of users who have liked the post
let [localLikeUids, setLocalLikeUids] = useState([])

// State variables for page views
const [localCurrentPageViews, setLocalCurrentPageViews] = useState(0)
const [currentUserMetaData, setCurrentUserMetaData] = useState([])




const getCommentData = () => {
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
}



// get current postID
  useEffect(() => {
    setCurrentPostId(postId)
  }, [])


// get post data
  useEffect(() => {
    getPost(postId)

    getPostComments(postId)
  }, [postId])

  // set local commentData w/ the actual commentData
  useEffect(() => {
    setLocalCommentData(currentPostComments)
  }, [postId, currentPostComments])



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


  // gets initial state for amount of likes and if current user likes the current post
  useEffect(() => {
    // gets initial state of if current post liked by current user
    setIsPostLikedByCurrentUser(currentPost?.likes?.includes(user?.uid))
    // the initial like amount from the database
    setLocalLikeUids(currentPost?.likes)
  }, [currentPost])



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
      text:currentUserCommentText,
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
  const editComment = () => {
    // edit the comment locally in the dom
    // get index of current comment in localCommentData
    const currentIndex = localCommentData.findIndex(el => el.id === currentCommentId)

    // get current item and update it w/ the text form textarea
    let oldCurrentItem = localCommentData.filter((el) => el.id === currentCommentId)[0]

    let newCurrentItem = {
      authorDisplayName:oldCurrentItem.authorDisplayName,
      authorUid:oldCurrentItem.authorUid,
      authorUsername:oldCurrentItem.authorUsername,
      createdAt:oldCurrentItem.createdAt,
      id:oldCurrentItem.id,
      isEdited:true,
      text:currentUserCommentText,
    }
    
    // get all old item minus current item
    let allOldItemsMinusCurrent = localCommentData.filter((el) => el.id !== currentCommentId)
    // adds the current item w/ the into the position it used to have
    allOldItemsMinusCurrent.splice(currentIndex,0,newCurrentItem)
    setLocalCommentData(allOldItemsMinusCurrent)

    setCurrentUserCommentText("")
    setIsEditingEnabled(false)

    // edit the comment in the database 
    editPostComment(currentPostId, allOldItemsMinusCurrent)
  }



  const deleteComment = (id) => {
    // deletes the comment locally in the dom
    let filteredComments = localCommentData.filter((el) => el.id !== id)
    setLocalCommentData(filteredComments)
    // delete the comment in the database
    deletePostComment(currentPostId, filteredComments)
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




  const likePostLocal = (currentUserUid, currentPostId) => {    
    setIsPostLikedByCurrentUser(true)
    setLocalLikeUids([...localLikeUids, currentUserUid])

    // upload to database
    togglePostLike(
      // postId
      currentPostId,
      // likeData
      Array.from(new Set([...localLikeUids, currentUserUid])),
      // userUid
      currentUserUid,
      // likeOrUnlike
      "like",
    )
  }

  const unlikePostLocal = (currentUserUid, currentPostId) => {
    setIsPostLikedByCurrentUser(false)
    setLocalLikeUids([...localLikeUids.filter(id => id !== currentUserUid)])
    
    // upload to database
    togglePostLike(
      // postId
      currentPostId,
      // likeData
      [...localLikeUids.filter(id => id !== currentUserUid)],
      // userUid
      currentUserUid,
      // likeOrUnlike
      "unlike",
    )
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

  // for the post dots / dropdown menu
  useClickOff(postDropdownMenuRef, postDropdownDotsRef, setIsPostDropdownOpen)





  const getLocationDataLocal = ()  => {
    // get viewer data
      // https://ip-api.com/docs/api:json
      // up to 45 HTTP requests per minute from an ip address
      fetch("http://ip-api.com/json?fields=status,message,country,timezone")
      .then((res) => res.json())
      .then(data => {
        if(data.status === "success") {
          setCurrentUserMetaData({
            country:data.country,
            timezone:data.timezone,
            createdAt:new Date(),
          })
        } else {
          console.error("Error fetching user location data")
        }
      })
  }


  const updateViewsLocal = () => {
    // set local views
    setLocalCurrentPageViews(currentPostViews + 1)

    // send the views and view metadata to the database
    //  currentPostId, user.uid, currentPostViews + 1, currentUserMetaData
    addPostViewData(currentPostId, user?.uid, currentPostViews + 1, currentUserMetaData)
  }


// get the location meta data
  useEffect(() => {
    getLocationDataLocal()
  }, [])



// get the data of the views from the database
  useEffect(() => {
    getPostViewData(currentPostId)
  }, [currentPostId])

// update the views
  useEffect(() => {
    updateViewsLocal()
  }, [currentPostViews, postIdExistsInViewsDatabase])




  let hasDataInCurrentPost = Object.getOwnPropertyNames(currentPost).length !== 0
  /* checking if the currentPost is loaded and if currentPost has data*/
  if(!isCurrentPostLoading && !hasDataInCurrentPost) {
    return (
      <Error text={`Page /${currentPostId} not found`}/>
    )
  }

  return (
    <>
    {/* for the post dropdown menu */}
    <AreYouSureModal {...{isOpen:isDeletePostModalOpen, setIsOpen:setIsDeletePostModalOpen, confirmFunction:deletePost,confirmFunctionArgs:currentPostId, headingText:"Are you sure you want to delete this post?", hasNavigate:true, navigateLocation:"/", }}/>

    {/* for the comment dropdown menu */}
    <AreYouSureModal {...{isOpen:isDeleteCommentModalOpen, setIsOpen:setIsDeleteCommentModalOpen, confirmFunction:deleteComment,confirmFunctionArgs:currentCommentId, headingText:"Are you sure you want to delete this comment?", }}/>

    <article className="outer-width mx-auto">
      {/* min-[995px]:grid min-[995px]:grid-cols-3 flex flex-col gap-28 mb-8 */}
      <div className="min-[990px]:grid min-[990px]:grid-cols-3 min-[990px]:my-12 my-6 gap-12 flex flex-col">
        <div className="col-span-2">
          {/* main post content section */}
          <header className="mb-4">
            <Tag {...{bgColor:`--category--${currentPost.tag}`, link:`/category/${currentPost.tag}`, text:currentPost.tag}}/>
            <div className="relative">
              <div className="flex items-center">
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
                <p>{socialMediaNumberFormatter.format(localCommentData.length)} comments</p>
              </div>
              <button className="flex items-center text-sm" type="button" onClick={() => isPostLikedByCurrentUser ? unlikePostLocal(user.uid, currentPostId) : likePostLocal(user.uid, currentPostId)}>
                {isPostLikedByCurrentUser ? (
                   <FaHeart className="text-xs mr-1"/>
                ) : (
                  <FaRegHeart className="text-xs mr-1"/>
                )}
                <p>{socialMediaNumberFormatter.format(localLikeUids?.length)}</p>
              </button>
              <div className="flex items-center text-sm mx-3">
                <FaEye className="mr-1"/>
                <p>{socialMediaNumberFormatter.format(localCurrentPageViews)}</p>
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
                {/* the current user */}
                <Link to={`/author/${currentUserName}`} className="rounded-full w-14 h-12 ">
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
                  <Link to={`/author/${el.authorUsername}`} className="rounded-full w-14 h-12">
                    <img src={defaultUserImg} alt="alt text" className="rounded-full w-12 h-12 object-cover"/>
                  </Link>
                  <div id="container-test" className="w-full">
                    <header className="flex flex-row items-center w-full">
                      <Link to={`/author/${el.authorUsername}`}>
                        <h2 className="font-medium mr-2">{el.authorDisplayName}</h2>
                      </Link>
                      <p className="text-slate-500 text-sm">{getTimeDifference(el.createdAt, Date())}</p>
                      {el.isEdited ? <span className="text-slate-500 text-sm ml-1">(edited)</span> : ""}
                      {user?.uid === el.authorUid ? (
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