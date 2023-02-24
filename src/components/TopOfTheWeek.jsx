import React from 'react'

import PostPreviewTogether from './widgets/postPreview/PostPreviewTogether'
import PostPreviewRow from './widgets/postPreview/PostPreviewRow'

import Tag from './widgets/Tag'
import AuthorAndDate from './widgets/AuthorAndDate'
import testImg from "../assets/images/testImg2.jpg"
import { Link } from 'react-router-dom'

const TopOfTheWeek = () => {
  let testBottomArr = Array.from({ length:3 })
  let testSideArr = Array.from({ length:4 })

  return (
    <article className='top-of-the-week--before relative py-10'>
      <h2 className="text-3xl font-medium mb-6">Top of the week</h2>
      <div>
        <div className='min-[995px]:grid min-[995px]:grid-cols-3 gap-5 flex flex-col mb-12 '>
          {/**main article here */}
          <section className='relative col-span-2'>
            <Link to="/to post here">
              <img src={testImg} alt="the alt text here" title="alt text here" className='w-full h-full rounded-xl'/>
            </Link>
            <div className='absolute bottom-0 m-6'>
              <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
              <h2 className='text-white font-medium text-3xl my-2'>the title goes here</h2>
              <AuthorAndDate {...{textColor:"#fff"}}/>
            </div>
          </section>
          {/* sidebar articles here */}
          <div className='grid grid-rows-4 gap-5'>
            {testSideArr.map((el, index) => {
              return (
                <PostPreviewRow key={index}/>
                )
              })}
          </div>
        </div>
        {/* bottom together articles here */}
        <div className='grid min-[900px]:grid-cols-3 grid-cols-1 gap-6'>
          {testBottomArr.map((el, index) => {
            return (
              <PostPreviewTogether key={index}/>
              )
            })}
        </div>
      </div>
    </article>
  )
}

export default TopOfTheWeek