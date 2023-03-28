import React from "react"


import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"


let testArr = Array.from({ length:6 })

const EditorsChoice = () => {
  return (
    <article className="my-8">
        <h2 className="text-3xl font-medium mb-8">Editor"s Choice</h2>
        {/* 3x3 grid goes here */}
        <div className="grid min-[900px]:grid-cols-3 grid-cols-31 gap-6">
          {testArr.map((el, index) => {
            return (
              <PostPreviewCol key={index}/>
            )
          })}
        </div>
    </article>
  )
}

export default EditorsChoice