import React from 'react'
import { AiOutlineClockCircle } from "react-icons/ai"

import testImg from "../../assets/images/testImg1.jpg"
import Tag from './Tag'

const RecentPosts = (props) => {
  

  return (
    <div className='recent-posts'>
        <h2 className='font-bold mb-4 text-lg'>Recent Posts</h2>
        <ul >
            <li className='flex flex-row items-center'>
              <div className='details'>
                <Tag {...{bgColor:"#1AB7EA", link:"/test", text:"test123"}}/>
                <h2 className=''>article title here</h2>
                <div className='flex flex-row items-center'>
                  <AiOutlineClockCircle/>
                  <span>Mar 10, 2020</span>
                </div>
              </div>
              <div className='img-container'>
                <img className='w-20' src={testImg} alt="post image" />
              </div>
            </li>
        </ul>
    </div>
  )
}

export default RecentPosts