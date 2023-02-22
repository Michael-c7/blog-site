import React from "react"
import Tag from "../Tag"
import Date from "../Date"
import testImg from "../../../assets/images/testImg1.jpg"
import { Link } from "react-router-dom"

/*
Where image is on the left
and details(tag,title,date)
are on the right

have a reverse prop for reverse needs eg:recent posts
*/

/**
 * 
 * @param {*} props 
 * @param {string} direction - the flex direction 
 * @returns 
 */
const PostPreviewRow = (props, direction) => {
  return (
    <div className="flex items-center">
        <Link className="min-[995px]:w-1/2 w-24 h-24" to="/link to post">
          <img src={testImg} alt={"alt text here"} title={`alt text here`} className="w-full h-full rounded-xl object-cover"/>
        </Link>

      <div className="ml-4">
        <Tag {...{bgColor:"#ccc", link:"/test", text:"tag text"}}/>
        <Link to="/link to post here">
          <h2 className="font-bold text-black my-1 leading-snug	">The Great Time For Enjoy City View On Mountain</h2>
        </Link>
        <Date/>
      </div>
    </div>
  )
}

export default PostPreviewRow