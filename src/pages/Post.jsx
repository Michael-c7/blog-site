import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthorAndDate from '../components/widgets/AuthorAndDate'
import Tag from '../components/widgets/Tag'
import TestText from "../components/TestText"
import InfoSidebar from "../components/InfoSidebar"

import useClickOff from "../hooks/useClickOff";

import { generateUniqueId } from '../utility/misc'

import { FaComment, FaRegHeart } from "react-icons/fa"
import { RxDotsVertical } from "react-icons/rx"

import { AiOutlineEdit } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

import testImg from "../assets/images/testImg1.jpg"
import testAuthorImg from "../assets/images/testAuthorImg1.jpg"
import Author from '../components/widgets/Author'
import Date from '../components/widgets/Date'

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
        /*
          if the id args match an id from looping
          through the original obj of the comments data
          then set isOpen to true else set isOpen
          to false, for all of them
        */  


      // setIsDropdownOpen([
      //   {id: '52e29d6d-bead-476a-8047-e70843882285', isOpen: true},
      //   {id: 'f0bc4460-30db-4754-9028-09c72fd722bc', isOpen: false}
      // ])
    }


  let postACommentText = useRef(null)
  // let testCommentAmount = Array.from({ length:2 })
  let [testCommentAmount, setTestCommentAmount] = useState([
    {
      text:"item 1",
      UniqueId:generateUniqueId(),
    },
    {
      text:"item 2",
      UniqueId:generateUniqueId(),
    }
  ])


  const cancelBtn = _ => {
    setCurrentUserCommentText("")
  }

  const createEditedComment = () => {
    console.log("edit comment function here")
    // 1. do editing logic here
    // 2. set edit mode to false
      // setIsEditingEnabled(false)
  }

  const postComment = () => {
    console.log("post comment function")
  }


// comment
  // useClickOff(commentMenuRef, dotsBtnRef, setIsCommentDropdownShown)


  let testComment1 = "this is a test comment. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id in ab, temporibus et praesentium reiciendis accusantium voluptate assumenda suscipit incidunt possimus ipsum facere. Vitae harum tempore doloremque saepe nam repudiandae?"



  useEffect(() => {
    // getting and setting the dropdown items data
    let items = testCommentAmount.map((el, index) => {
      
      return {
        id:el.UniqueId,
        isOpen:false,
      }
    })

    setIsDropdownOpen(items)
  },[testCommentAmount])


  useEffect(() => {
    console.log(isDropdownOpen)
  }, [isDropdownOpen])




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
              <Date {...{textColor:"#000"}}/>
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
            <div className=' mb-12' >
              <div className='flex flex-row gap-4'>
                <Link to="/cat123" className='rounded-full w-14 h-12 '>
                  <img src={testImg} alt="alt text" className='rounded-full w-full h-full'/>
                </Link>
                <textarea onChange={() => setCurrentUserCommentText(postACommentText.current.value)} ref={postACommentText} value={currentUserCommentText} maxLength={1000} placeholder="Join the discussion and leave a comment!" className=" resize-y w-full h-24 border border-gray-300 rounded-sm p-2"></textarea>
              </div>
              <div className='flex flex-row justify-end gap-4 mt-3'>
                {isEditingEnabled ? (
                  <button className='bg-black text-white rounded-sm py-2 px-3' type='button' onClick={() => createEditedComment()}>Update Comment</button>
                ) : (
                  <button className='bg-black text-white rounded-sm py-2 px-3' type='button' onClick={() => postComment()}>Post comment</button>
                )}
                <button className='bg-white text-black border-2 border-black rounded-sm py-2 px-3' onClick={() => cancelBtn()}>Cancel</button>
              </div>
            </div>
            {/* comments */}
            <ul className='w-full my-6 '>
              {/* comment */}
              {testCommentAmount.map((el, index) => {
                const { UniqueId } = el
                // let isOpen = isDropdownOpen.filter((el) => el.id === UniqueId)[0]?.isOpen

                return (
                  <li ref={(ref) => setRef(ref, index)} data-uniqueid={el.UniqueId}  className='flex flex-row gap-4 w-full my-6 relative ' key={index}>
                  <Link to="/author link goes here" className='rounded-full w-14 h-12 '>
                    <img src={testImg} alt="alt text" className='rounded-full w-12 h-12'/>
                  </Link>
                  <div id="container-test" className='w-full'>
                    <header className='flex flex-row items-center w-full '>
                      <Link to="/link to author here">
                        <h2 className='font-medium  mr-2'>John smith</h2>
                      </Link>
                      <p className=' text-slate-500 text-sm'>9 months ago</p>
                      {isUserComment ? (
                        <button className='dots-btn ml-auto' ref={dotsBtnRef} onClick={() => handleClick(el.UniqueId)}>
                          <RxDotsVertical/>
                        </button>
                      ) : ""}
                      {/* comment dropdown menu */}
                      <div ref={commentMenuRef} className={`dropdown-menu-container ${1== 0 ? "dropdown-menu-container--open" : "dropdown-menu-container--closed"} top-[30px] w-28 flex`}>
                        <ul className=' w-full'>
                          <li className='mb-4 w-full'>
                            <button className='flex flex-row items-center  w-full'>
                              <AiOutlineEdit/>
                              <span className='ml-2'>Edit</span>
                            </button>
                          </li>
                          <li className='mt-4'>
                            <button className='flex flex-row items-center w-full text-red-600'>
                              <BiTrash/>
                              <span className='ml-2'>Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </header>
                    <p>{testComment1}</p>
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