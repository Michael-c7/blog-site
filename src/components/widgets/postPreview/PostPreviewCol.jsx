import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Tag from "../Tag"
import AuthorAndDate from "../AuthorAndDate"
import { getDateFromTime } from "../../../utility/misc"

import testImg from "../../../assets/images/testImg1.jpg"

const PostPreviewCol = (props) => {
  let [data, setData] = React.useState([])

  useEffect(() => {
    setData(props.post)
  },[props])


  const [articleTextCutoff, setArticleTextCutoff] = useState(125)
  const [titleTitleCutoff, setTitleCutoff] = useState(55)

  return (
    <section>
      <div>
        <div className="absolute ml-4 mt-4">
          <Tag {...{bgColor:`--category--${data?.tag}`, link:`/category/${data?.tag}`, text:`${data?.tag}`}}/>
        </div>
        <Link to={`/post/${data?.postId}`}>
          <img src={data?.image ? data?.image : testImg} alt={`${data?.altText ? data?.altText : "default image"}`} title={`${data?.title ? data?.title : "default image"}`} className="rounded-xl h-[250px] w-full object-cover"/>
        </Link>
      </div>
      <Link to={`/post/${data?.postId ? data?.postId : "default post no id"}`}>
        <h2 className="text-2xl font-medium my-3">{data?.title?.length > titleTitleCutoff ? `${data?.title?.slice(0,titleTitleCutoff).trim()}...` : data?.title}</h2>
      </Link>
      <AuthorAndDate {...{authorLink:`/author/${data?.username}`, authorName:data?.displayName, date:getDateFromTime(data?.createdAt?.nanoseconds, data?.createdAt?.seconds)}}/>
      {props.hideDescription ? "" : (
        <p className="text-gray-500 my-3">{data?.text?.length >= articleTextCutoff ? `${data?.text.slice(0, articleTextCutoff)}...` : data?.text}</p>
      )}
    </section>
  )
}

export default PostPreviewCol