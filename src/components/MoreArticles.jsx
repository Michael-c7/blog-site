import React, { useState, useEffect } from "react"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { generateUniqueId } from "../utility/misc"

import LazyLoad from 'react-lazy-load';


import PostPreviewRowBig from "./widgets/postPreview/PostPreviewRowBig"
import InfoSidebar from "./InfoSidebar"
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"
import { useBlogContext } from "../contexts/blog_context"


const MoreArticles = () => {
  const { getPostsByIds } = useBlogContext()
  let [postData, setPostData] = useState([])


  let loadingVar = postData.length > 0
  let skeletonArticleLayoutArray = Array.from({ length:6 })
  let skeletonBottomArticleLayoutArray = Array.from({ length:4 })


  let topDataStartIndex = 0
  let topDataEndIndex = 6
  let bottomDataStartIndex = 6
  let bottomDataEndIndex = 10


  let moreArticlePostIds = [
    // top data ids
    "d34f57b1-92ce-41ec-9b2d-b4175ad6d0e1",
    "347ece9f-83fe-4fb5-88bf-d02f9a4cd3c5",
    "9eec3e42-f7c7-4780-a60d-0f30722e3669",
    "c62c5241-e544-44ea-961e-fcd5a60c0aeb",
    "11ac8511-cd46-4b7a-b1f2-da495e2ed89a",
    "86dad1fb-77bf-44e3-bdcb-6845c63340b0",
    // bottom data ids
    "4e2da6ba-a556-4a97-a202-2d552047c25d",
    "f2c30036-a962-49ee-949f-f98b16ba6078",
    "113fbd78-4e8e-4a74-950c-bbe5f27aace4",
    "33ae13f2-5729-40b7-ab38-90b376ce82f9",
  ]

  useEffect(() => {
    getPostsByIds(moreArticlePostIds).then((data) => setPostData(data))
  }, [])

  


  const TopArticleSkeleton = _ => {
    return (
      <div className="flex flex-row justify-center items-center my-2">
        <Skeleton className="min-[360px]:w-[350px] w-[220px] h-[240px]" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
        <div className="ml-4 w-full min-[600px]:block hidden">
          <Skeleton className="w-3/5 h-[24px]" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
          <Skeleton className="w-4/5 h-[64px]" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
          <Skeleton className="w-full h-[96px]" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
        </div>
      </div>
    )
  }


  const BottomArticleSkeleton = () => {
    return (
      <div>
        <Skeleton className="h-[250px] my-1" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)" borderRadius="0.5rem"/>
        <Skeleton className="h-[64px] my-1" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
        <Skeleton className="h-[24px] my-2" baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)"/>
      </div>
    )
  }




  return (
    <div className="bg-white my-10">
      <LazyLoad offset={100}>
        <div className="min-[995px]:grid min-[995px]:grid-cols-3 flex flex-col gap-28 mb-8">
            {/* main articles */}
            <div className="col-span-2">
              {loadingVar ? (
                postData.slice(topDataStartIndex, topDataEndIndex).map((data) => {
                  return (
                    <div className="my-8 first-of-type:mt-0 last-of-type:mb-0" key={data.postId}>
                        <PostPreviewRowBig {...{post:data, direction:"md:flex-row flex-col"}}/>
                    </div>
                  )
                })
              ) : (
                <div className="my-8 first-of-type:mt-0 last-of-type:mb-0 w-full">
                  {skeletonArticleLayoutArray.map((_) => {
                    return <TopArticleSkeleton key={generateUniqueId()}/>
                  })}
                </div>
              )}
            </div>
            {/* info sidebar */}
            <InfoSidebar/>
        </div>
      </LazyLoad>
      <LazyLoad offset={100}>
        {/* bottom articles */}
        <div className="min-[900px]:grid min-[900px]:grid-cols-4 gap-6 flex flex-col">
            {loadingVar ? (
              postData.slice(bottomDataStartIndex, bottomDataEndIndex).map((data) => {
                return (
                    <PostPreviewCol key={data.postId} {...{post:data, hideDescription:true}}/>
                )
              })
            ) : (
              skeletonBottomArticleLayoutArray.map((_) => {
                return (
                  <BottomArticleSkeleton key={generateUniqueId()}/>
                )
              })
            )}
        </div>
      </LazyLoad>
    </div>
  )
}

export default MoreArticles