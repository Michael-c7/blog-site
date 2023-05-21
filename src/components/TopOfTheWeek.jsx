import React, { useState, useEffect } from "react"

import PostPreviewTogether from "./widgets/postPreview/PostPreviewTogether"
import PostPreviewRow from "./widgets/postPreview/PostPreviewRow"

import Tag from "./widgets/Tag"
import AuthorAndDate from "./widgets/AuthorAndDate"
import testImg from "../assets/images/testImg2.jpg"
import { Link } from "react-router-dom"
import { useBlogContext } from "../contexts/blog_context"
import { getDateFromTime } from "../utility/misc"


const TopOfTheWeek = () => {
  const { getMostViewedPosts } = useBlogContext()
  let bottomArticlesIndexStart = 1
  let bottomArticlesIndexEnd = 4
  let sideArticlesIndexStart = bottomArticlesIndexEnd
  let sideArticlesIndexEnd = sideArticlesIndexStart * 2
  
   let [posts, setPosts] = useState([])

   let [mostViewedPost, setMostViewedPost] = useState({})


  useEffect(() => {
    getMostViewedPosts().then((data) => setPosts(data))
  }, [])
  


  useEffect(() => {
    setMostViewedPost(posts[0])
  }, [posts])
  

  return (
    <div className="bg-[#FDEEDC]">
      <article className="top-of-the-week--before relative py-10 outer-width mx-auto">
        <h2 className="text-3xl font-medium mb-6">Top of the week</h2>
        <div>
          <div className="min-[995px]:grid min-[995px]:grid-cols-3 gap-6 flex flex-col mb-12 ">
            {/* main article here */}
            <section className="relative col-span-2">
              <Link to={`/post/${mostViewedPost?.postId}`}>
                <img src={mostViewedPost?.image ? mostViewedPost?.image : testImg} alt={mostViewedPost?.title} title={mostViewedPost?.title} className="w-full h-full rounded-xl"/>
              </Link>
              <div className="absolute bottom-0 m-6">
                <Tag {...{bgColor:`--category--${mostViewedPost?.tag}`, link:`/category/${mostViewedPost?.tag ? mostViewedPost?.tag : "unknown"}`, text:mostViewedPost?.tag ? mostViewedPost?.tag : "unknown"}}/>
                <h2 className="text-white font-medium md:text-3xl text-2xl my-2">{mostViewedPost?.title ? mostViewedPost?.title.slice(0,40) : "title goes here"}</h2>
                <AuthorAndDate {...{authorLink:`/author/${mostViewedPost?.username}`, authorName:mostViewedPost?.[" displayName"], date:getDateFromTime(mostViewedPost?.createdAt?.nanoseconds, mostViewedPost?.createdAt?.seconds), textColor:"#fff"}}/>
              </div>
            </section>
            {/* sidebar articles here */}
            <div className="grid grid-rows-4 gap-6">
              {posts?.slice(sideArticlesIndexStart, sideArticlesIndexEnd)?.map((data, index) => {
                return (
                  <PostPreviewRow key={index} {...{post:data}}/>
                  )
                })}
            </div>
          </div>
          {/* bottom together articles here */}
          <div className="grid min-[900px]:grid-cols-3 grid-cols-1 gap-6">
            {posts?.slice(bottomArticlesIndexStart, bottomArticlesIndexEnd)?.map((data, index) => {

              return (
                <PostPreviewTogether key={index} {...{post:data}}/>
                )
              })}
          </div>
        </div>
      </article>
    </div>
  )
}

export default TopOfTheWeek