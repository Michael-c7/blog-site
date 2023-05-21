import React from "react"
import Tag from "../Tag"
import Date from "../Date"
import testImg from "../../../assets/images/testImg1.jpg"
import { Link } from "react-router-dom"
import { getDateFromTime } from "../../../utility/misc"

/*
Where image is on the left
and details(tag,title,date)
are on the right

have a reverse prop for reverse needs eg:recent posts
*/


/**
 * 
 * @param {*} props 
 * @param {string} direction - ether row or row-reverse
 * @param {string} textColor - a css color eg:#fff, rgba(25,25,25,0.8),ect...
 * @returns 
 */
const PostPreviewRow = (props) => {
  // ${props.direction === "row-reverse" ? "flex-row-reverse" : "flex-row"}

  let [data, setData] = React.useState([])

  React.useEffect(() => {
    setData(props.post)
  },[props])

  let titleTitleCutoff = 45;

  return (
    <div className={`flex items-center  ${props.direction ? props.direction : "flex-row"} ${props.direction === "flex-row-reverse" ? "justify-between" : ""}`}>
        <Link className="w-24 h-24 flex-shrink-0" to="/link to post">
          <img src={data?.image ? data?.image : testImg} alt={data?.title} title={data?.title} className="w-full h-full rounded-xl object-cover  "/>
        </Link>

      <div className={`${props.direction === "flex-row-reverse" ? "ml-0 mr-3" : "ml-3 mr-0"}`}>
        <Tag {...{bgColor:`--category--${data?.tag}`, link:`/category/${data?.tag}`, text:`${data?.tag}`}}/>
        <Link to={`/post/${data?.postId}`}>
          <h2 className="font-bold text-black my-2 leading-snug" style={{color:props.textColor}}>{data?.title ? (data.title.length > titleTitleCutoff ? `${data.title.slice(0, titleTitleCutoff).trim()}...` : data?.title) : "no title"}</h2>
        </Link>
        <Date {...{date:getDateFromTime(data?.createdAt?.nanoseconds, data?.createdAt?.seconds)}}/>
      </div>
    </div>
  )
}

export default PostPreviewRow