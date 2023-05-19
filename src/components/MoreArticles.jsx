import React, { useState, useEffect } from "react"
import PostPreviewRowBig from "./widgets/postPreview/PostPreviewRowBig"
import InfoSidebar from "./InfoSidebar"
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"
import { useBlogContext } from "../contexts/blog_context"


const MoreArticles = () => {
  const { getPostsByIds } = useBlogContext()
  let [postData, setPostData] = useState([])

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

  return (
    <div className="bg-white my-10">
        <div className="min-[995px]:grid min-[995px]:grid-cols-3 flex flex-col gap-28 mb-8">
            {/* main articles */}
            <div className="col-span-2">
            {postData.slice(topDataStartIndex, topDataEndIndex).map((data, index) => {
                    return (
                        <div className="my-8 first-of-type:mt-0 last-of-type:mb-0" key={index}>
                            <PostPreviewRowBig {...{post:data, direction:"md:flex-row flex-col"}}/>
                        </div>
                    )
                })}
            </div>
            {/* info sidebar */}
            <InfoSidebar/>
        </div>
        {/* bottom articles */}
        <div className="min-[900px]:grid min-[900px]:grid-cols-4 gap-6 flex flex-col">
            {postData.slice(bottomDataStartIndex, bottomDataEndIndex).map((data, index) => {
                return (
                    <PostPreviewCol key={index} {...{post:data, hideDescription:true}}/>
                )
            })}
        </div>
    </div>
  )
}

export default MoreArticles