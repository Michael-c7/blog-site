import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link } from 'react-router-dom'
import Tag from "../Tag"
import AuthorAndDate from "../AuthorAndDate"
import { getDateFromTime } from '../../../utility/misc'

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

  let [data, setData] = React.useState([])
  let [articleTitleCutoff, setArticleTitleCutoff] = useState(35)

  useEffect(() => {
    setData(props.post)
  },[props])
  
  return (
    <>
      {data.image ? (
            <section className={`${props.position ? props.position : "relative"} ${props?.width} ${props?.height}`}>
            <Link to={`/post/${data?.postId}`} className='w-full h-full'>
              <img src={data?.image ? data?.image : testImg} alt={data?.altText} title={data?.title} className='w-full h-full rounded-xl object-cover'/>
            </Link>
            <div className="absolute top-0 m-6">
              <Tag {...{bgColor:`--category--${data?.tag}`, link:`/category/${data?.tag}`, text:`${data?.tag}`}}/>
            </div>
            <div className='absolute bottom-0 m-6'>
              <Link to={`/post/${data?.postId}`}>
                <h2 className='text-white font-medium text-2xl mb-2'>{data?.title ? (data.title.length > articleTitleCutoff ? `${data.title.slice(0, articleTitleCutoff).trim()}...` : data?.title) : "title unknown"}</h2>
              </Link>
              <AuthorAndDate {...{authorLink:`/author/${data?.username}`, authorName:data?.displayName, date:getDateFromTime(data?.createdAt?.nanoseconds, data?.createdAt?.seconds), textColor:"#fff"}}/>
            </div>
          </section>
      ) : (
        <Skeleton className="h-[300px]" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)" borderRadius="0.5rem"/>
      )}
    </>

  )
}

export default PostPreviewTogether