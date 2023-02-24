import React from 'react'
import { Link } from 'react-router-dom'

import Tag from "../Tag"
import AuthorAndDate from "../AuthorAndDate"

import testImg from "../../../assets/images/testImg1.jpg"


/*
Where the text is on to of the image,
not for the hero slider on homepage
eg: in example Top of the week section
*/
/**
 * 
 * @param {*} props - props are position, width, height all use tailwind classes eg: w-full
 * @returns 
 */
const PostPreviewTogether = (props) => {
  // className={`${props.position === "absolute" ? "absolute h-full w-full" : "relative"}`}
  return (
    <section className={`${props.position ? props.position : "relative"} ${props?.width} ${props?.height}`}>
      <Link to="/link to post" className='w-full h-full'>
        <img src={testImg} alt="the alt text here" title="alt text here" className='w-full h-full rounded-xl object-cover'/>
      </Link>
      <div className="absolute top-0 m-6">
        <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
      </div>
      <div className='absolute bottom-0 m-6'>
        <Link to="/link to post here">
          <h2 className='text-white font-medium text-2xl mb-2'>the title goes here</h2>
        </Link>
        <AuthorAndDate {...{textColor:"#fff"}}/>
      </div>
    </section>
  )
}

export default PostPreviewTogether