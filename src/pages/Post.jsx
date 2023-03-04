import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthorAndDate from '../components/widgets/AuthorAndDate'
import Tag from '../components/widgets/Tag'
import TestText from "../components/TestText"
import InfoSidebar from "../components/InfoSidebar"

import useClickOff from "../hooks/useClickOff";

import { generateUniqueId, getTimeDifference, generateRandomName } from '../utility/misc'

import { FaComment, FaRegHeart } from "react-icons/fa"
import { RxDotsVertical } from "react-icons/rx"

import { AiOutlineEdit } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

import testImg from "../assets/images/testImg1.jpg"
import testImg2 from "../assets/images/testImg2.jpg"


import testAuthorImg from "../assets/images/testAuthorImg1.jpg"
import Author from '../components/widgets/Author'
// import this as DateWidget so it doesn't conflict w/ the Date object
import DateWidget from '../components/widgets/Date'

let textText2 = "welcome Mauris mattis auctor cursus. Phasellus tellus tellus, imperdiet ut imperdiet eu, iaculis a sem. Donec vehicula luctus nunc in laoreet. Aliquam erat volutpat. Suspendisse vulputate porttitor condimentum."


const Post = () => {
  /*
  a temp variable to show the dots w/ dropdown
  to edit / delete a comment if
  the logged in user made the comment
  */
  let isUserComment = true

  let [isCommentDropdownShown, setIsCommentDropdownShown] = useState(false)



  let [currentUserCommentText, setCurrentUserCommentText] = useState("")
  let [isEditingEnabled, setIsEditingEnabled] = useState(false)
  let [currentCommentId, setCurrentCommentId] = useState(null)

  const commentMenuRef = useRef(null)
  const dotsBtnRef = useRef(null)


  const myRefs = useRef([])
  // for the re-render
  const [refState, setRefsState] = useState("")

  // multiple
  let [isDropdownOpen, setIsDropdownOpen] = useState([])

  // this function will be called for each element
  const setRef = (ref, index) => {
    myRefs.current[index] = ref;
  };

    // this function will be called on button click
    const handleClick = (id) => {
      let newItems = testCommentData.map((el, index) => {
        if(el.uniqueId === id) {
          return {
            id:el.uniqueId,
            isOpen:!el.isOpen,
          }
        } else {
          return {
            id:el.uniqueId,
            isOpen:false,
          }
        }
      })
      setIsDropdownOpen(newItems)
    }


  let postACommentText = useRef(null)


  const closeAllDropdown = () => {
    let newItems = testCommentData.map((el, index) => {
      return {
        id:el.uniqueId,
        isOpen:false,
      }
    })
    setIsDropdownOpen(newItems)
  }
 

  let [testCommentData, setTestCommentData] = useState([
    {
      text:"this is a test comment 1. Lorem, ipsum dolor sit amet consectetur?",
      uniqueId:generateUniqueId(),
      name:"john smith",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testAuthorImg,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 2. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum tempore doloremque saepe nam repudiandae?",
      uniqueId:generateUniqueId(),
      name:"john smith 2",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 3!!!",
      uniqueId:generateUniqueId(),
      name:"john smith 3",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
    {
      text:"this is a test comment 4. Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      uniqueId:generateUniqueId(),
      name:"john smith 4",
      dateCreated:"Fri Mar 03 2023 10:40:45 GMT-0600 (Central Standard Time)",
      profileImg:testImg2,
      hasBeenEdited:false,
    },
  ])


  const cancelBtn = _ => {
    setCurrentUserCommentText("")
    setIsEditingEnabled(false)
  }

  const editComment = (arr) => {
    // edit the comment locally in the dom
    // 1. get index of current comment in testCommentData
    const currentIndex = testCommentData.findIndex(el => el.uniqueId === currentCommentId)

    // 2. get current item and update it w/ the text form textarea
    let oldCurrentItem = testCommentData.filter((el) => el.uniqueId === currentCommentId)[0]

    let newCurrentItem = {
      text:currentUserCommentText,
      uniqueId:oldCurrentItem.uniqueId,
      name:oldCurrentItem.name,
      dateCreated:oldCurrentItem.dateCreated,
      profileImg:oldCurrentItem.profileImg,
      hasBeenEdited:true,
    }
    
    // 3. get all old item minus current item
    let allOldItemsMinusCurrent = testCommentData.filter((el) => el.uniqueId !== currentCommentId)

    allOldItemsMinusCurrent.splice(currentIndex,0,newCurrentItem)
    setTestCommentData(allOldItemsMinusCurrent)

    setCurrentUserCommentText("")
    setIsEditingEnabled(false)

    // edit the comment in the database [NEED TO ADD]
  }



  const postComment = () => {
    // post the comment locally in the dom
    let newItem = {
      text:currentUserCommentText,
      uniqueId:generateUniqueId(),
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


  const deleteComment = (id) => {
    // deletes the comment locally in the dom
    let filteredComments = testCommentData.filter((el) => el.uniqueId !== id)
    setTestCommentData(filteredComments)
    // delete the comment in the database [NEED TO ADD]
  }


// comment
  // useClickOff(commentMenuRef, dotsBtnRef, setIsCommentDropdownShown)


  let testComment1 = "this is a test comment. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum tempore doloremque saepe nam repudiandae?"



  useEffect(() => {
    // getting and setting the dropdown items data
    let items = testCommentData.map((el, index) => {
      return {
        id:el.uniqueId,
        isOpen:false,
      }
    })

    setIsDropdownOpen(items)
  },[testCommentData])


  useEffect(() => {
    // console.log(isDropdownOpen)
  }, [isDropdownOpen])

  useEffect(() => {
    // console.log(currentUserCommentText)
  },[currentUserCommentText])


  return (
    <article className="outer-width mx-auto">
      <div className='min-[990px]:grid min-[990px]:grid-cols-3 min-[990px]:my-12 my-6 gap-12 flex flex-col'>
        <div className='col-span-2'>
          {/* main post content section */}
          <header className='mb-4'>
            <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
            <h2 className='font-bold text-4xl my-4'>this is the test post title</h2>
            <div className='flex flex-col gap-1 min-[375px]:flex-row min-[375px]:gap-0 items-center'>
              <Author {...{textColor:"#000"}}/>
              <DateWidget {...{textColor:"#000"}}/>
              <div className='flex items-center text-sm mx-3'>
                <FaComment className='text-xs mr-1'/>
                <p>0 comments</p>
              </div>
              <div className='flex items-center text-sm '>
                <FaRegHeart className='text-xs mr-1'/>
                <p>4</p>
              </div>
            </div>
          </header>
          {/* post section */}
          <section>
            {/* the actual post */}
            <img src={testImg} alt="alt text for main img" className='w-full rounded-xl my-6'/>
            <TestText amount={10}/>
            {/* author details section */}
            <div className='flex flex-col md:flex-row md:text-left text-center gap-4 my-12'>
              <Link to="/author link here" className='w-28 h-28 rounded-full flex-shrink-0 mx-auto'>
                <img src={testAuthorImg} className="w-28 h-28 rounded-full object-cover"/>
              </Link>
              <div className='flex-auto'>
                <h3 className='text-xl font-bold mb-1 capitalize'><Link to="/author link here">john johnson</Link></h3>
                <p>{testComment1}</p>
              </div>
            </div>
          </section>

          {/* comments section */}
          <section className='p-6 bg-slate-100 rounded-xl'>
            {/* post a comment */}
            <div className={`${testCommentData.length < 1 ? "mb-0" : "mb-12"}`}>
              <div className='flex flex-row gap-4'>
                <Link to="/cat123" className='rounded-full w-14 h-12 '>
                  <img src={testImg} alt="alt text" className='rounded-full w-full h-full'/>
                </Link>
                <textarea onChange={() => setCurrentUserCommentText(postACommentText.current.value)} ref={postACommentText} value={currentUserCommentText} maxLength={1000} placeholder="Join the discussion and leave a comment!" className=" resize-y w-full h-24 border border-gray-300 rounded-sm p-2"></textarea>
              </div>
              <div className='flex flex-row justify-end gap-4 mt-3'>
                {isEditingEnabled ? (
                  <button className='bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700' disabled={currentUserCommentText.length >= 1 ? false : true} type='button' onClick={() => editComment()}>Update Comment</button>
                ) : (
                  <button className='bg-black text-white rounded-sm py-2 px-3 disabled:opacity-75 disabled:bg-slate-700' disabled={currentUserCommentText.length >= 1 ? false : true} type='button' onClick={() => postComment()}>Post comment</button>
                )}
                <button className='bg-white text-black border-2 border-black rounded-sm py-2 px-3' onClick={() => cancelBtn()}>Cancel</button>
              </div>
            </div>
            {/* comments */}
            <ul className='w-full my-6 '>
              {/* comment */}
              {testCommentData.map((el, index) => {
                const { uniqueId } = el
                let isOpen = isDropdownOpen.filter((el) => el.id === uniqueId)[0]?.isOpen
                /*loop through my data and create a commentMenuRef and dotsBtnRef for each one */
                //  useClickOff(commentMenuRef, dotsBtnRef, setIsCommentDropdownShown)
                
                return (
                  <li ref={(ref) => setRef(ref, index)} data-uniqueid={el.uniqueId}  className='flex flex-row gap-4 w-full my-8 relative' key={index}>
                  <Link to="/author link goes here" className='rounded-full w-14 h-12 '>
                    <img src={el.profileImg} alt="alt text" className='rounded-full w-12 h-12 object-cover'/>
                  </Link>
                  <div id="container-test" className='w-full'>
                    <header className='flex flex-row items-center w-full '>
                      <Link to="/link to author here">
                        <h2 className='font-medium mr-2'>{el.name}</h2>
                      </Link>
                      <p className='text-slate-500 text-sm'>{getTimeDifference(el.dateCreated, Date())}</p>
                      {el.hasBeenEdited ? <span className='text-slate-500 text-sm ml-1'>(edited)</span> : ""}
                      {isUserComment ? (
                        <button className='dots-btn ml-auto' ref={dotsBtnRef} onClick={() => handleClick(el.uniqueId)}>
                          <RxDotsVertical/>
                        </button>
                      ) : ""}
                      {/* comment dropdown menu */}
                      <div ref={commentMenuRef} className={`dropdown-menu-container ${isOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed"} top-[30px] w-28 flex`}>
                        <ul className=' w-full'>
                          <li className='mb-4 w-full'>
                            <button className='flex flex-row items-center w-full' type='button' onClick={() => {
                              // focus the input
                              let input = document.querySelector("textarea").focus()
                              // enabling editing mode
                              setIsEditingEnabled(true)
                              // close menu
                              closeAllDropdown()
                              // update state value w/ the id
                              setCurrentCommentId(el.uniqueId)
                              // set text textarea text
                              setCurrentUserCommentText(el.text)

                            }}>
                              <AiOutlineEdit/>
                              <span className='ml-2'>Edit</span>
                            </button>
                          </li>
                          <li className='mt-4'>
                            <button className='flex flex-row items-center w-full text-red-600' type='button' onClick={() => deleteComment(uniqueId)}>
                              <BiTrash/>
                              <span className='ml-2'>Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </header>
                    <p className='flex flex-row flex-wrap'>{el.text}</p>
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
  )
}

export default Post