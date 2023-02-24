import React from "react"
import PostPreviewRowBig from "./widgets/postPreview/PostPreviewRowBig"
import InfoSidebar from "./InfoSidebar"
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"


const MoreArticles = () => {
  let testRowArr = Array.from({ length:6 })
  let testBottomArr = Array.from({ length:4 })

  return (
    <div className="bg-white my-10">
        <div className="min-[995px]:grid min-[995px]:grid-cols-3 flex flex-col gap-8">
            {/* main articles */}
            <div className="col-span-2 mb-8 ">
            {testRowArr.map((el, index) => {
                    return (
                        <div className="my-8 first-of-type:mt-0 last-of-type:mb-0">
                            <PostPreviewRowBig key={index} direction={"md:flex-row flex-col"}/>
                        </div>
                    )
                })}
            </div>
            {/* info sidebar */}
            <InfoSidebar/>
        </div>
        {/* bottom articles */}
        <div className="min-[900px]:grid min-[900px]:grid-cols-4 gap-6 flex flex-col">
            {testBottomArr.map((el, index) => {
                return (
                    <PostPreviewCol key={index} {...{showDescription:true}}/>
                )
            })}
        </div>
    </div>
  )
}

export default MoreArticles