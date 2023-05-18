import React, { useState, useEffect } from "react"


import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"
import { useBlogContext } from "../contexts/blog_context"


let testArr = Array.from({ length:6 })




const EditorsChoice = () => {
  const { getPostsByIds } = useBlogContext()

  let [postData, setPostData] = useState([])


  let editorsChoicePostIds = [
    "066f514b-9088-4650-9167-513f33a27d4f",
    "5fee3e3f-f8bb-4ecd-8698-536f408e552b",
    "40d85166-1c3f-4f1d-b222-190adf901a8e",
    "bfd50fe1-ec09-4452-9161-25ef70056bc1",
    "c62c5241-e544-44ea-961e-fcd5a60c0aeb",
    "61bee128-4e13-45a0-a234-e3f8267b58f6",
  ]

  // get the post data for the slides
  useEffect(() => {
    getPostsByIds(editorsChoicePostIds).then((data) => setPostData(data))
  }, [])



  return (
    <article className="my-8">
        <h2 className="text-3xl font-medium mb-8">Editor's Choice</h2>
        <div className="grid min-[900px]:grid-cols-3 grid-cols-31 gap-6">
          {postData.map((data, index) => {
            return (
              <PostPreviewCol key={index} {...{post:data}}/>
            )
          })}
        </div>
    </article>
  )
}

export default EditorsChoice