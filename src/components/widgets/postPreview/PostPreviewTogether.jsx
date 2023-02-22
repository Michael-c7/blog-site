import React from 'react'

import Tag from "../Tag"
import AuthorAndDate from "../AuthorAndDate"

import testImg from "../../../assets/images/testImg1.jpg"


/*
Where the text is on to of the image,
not for the hero slider on homepage
eg: in example Top of the week section
*/

const PostPreviewTogether = () => {
  return (
    <section className='relative'>
      <img src={testImg} alt="the alt text here" title="alt text here" className='w-full h-full rounded-xl'/>
      <div className="absolute top-0 m-6">
        <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
      </div>
      <div className='absolute bottom-0 m-6'>
        <h2 className='text-white font-medium text-2xl'>the title goes here</h2>
        <AuthorAndDate {...{textColor:"#fff"}}/>
      </div>
    </section>
  )
}

export default PostPreviewTogether