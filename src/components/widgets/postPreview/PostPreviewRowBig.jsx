import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import testImg from "../../../assets/images/testImg1.jpg"
import { FaHeart } from "react-icons/fa"

// components
import Tag from "../Tag"
import Date from "../Date"
import { getDateFromTime } from "../../../utility/misc"


const PostPreviewRowBig = (props) => {
  /* The articleTextCutoff number is based on how good
  this amount of characters looks in the layout & the effects the layout */
  let  articleTextCutoff = 160
  let articleTitleCutoff = 55

  let [data, setData] = useState([])

  useEffect(() => {
    setData(props.post)
  },[props])


  return (
    <section className={`flex ${props?.direction ? props?.direction : "flex-row"} gap-6`}>
        <Link to={`/post/${data.postId}`} className="flex-1 min-h-60">
            <img src={data?.image ? data?.image : testImg} alt={data?.altText} title={`${data?.title ? data?.title : "default image"}`} className="w-full rounded-lg h-60"/>
        </Link>
        <div className="flex-1">
            <header className="flex items-center">
                <Tag {...{bgColor:`--category--${data?.tag}`, link:`/category/${data?.tag}`, text:data?.tag}}/>
                <div className="mx-2">
                    <Date {...{date:getDateFromTime(data?.createdAt?.nanoseconds, data?.createdAt?.seconds)}}/>
                </div>
                <div className="relative flex items-center text-gray-500">
                    <div className="relative">
                        <FaHeart className="text-xs mr-1"/>
                    </div>
                    <div className="relative top-[-1px]">{data?.likes?.length}</div>
                </div>
            </header>
            <Link to={`/post/${data.postId}`}>
                <h2 className="text-2xl font-medium my-2">{data?.title?.length >= articleTitleCutoff ? `${data?.title?.slice(0, articleTitleCutoff)}...` : data?.title}</h2>
            </Link>
            <p>{data?.text?.length >= articleTextCutoff ? `${data?.text?.slice(0, articleTextCutoff).trim()}...` : data?.text}</p>
        </div>
    </section>
  )
}

export default PostPreviewRowBig