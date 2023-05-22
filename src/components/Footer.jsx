import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
  getAllCategories,
  socialMediaItems,
} from "../utility/reusable"

import PostPreviewRow from "../components/widgets/postPreview/PostPreviewRow"
import { useBlogContext } from "../contexts/blog_context"


const Footer = () => {
  const { getMostRecentPosts, getAllCategoriesAndCategoryAmount } = useBlogContext()
  let [recentPostsData, setRecentPostsData] = React.useState([])
  let [categories, setCategories] = useState([])

  React.useEffect(() => {
    let amountOfPostsToGet = 2
    getMostRecentPosts(amountOfPostsToGet).then((data) => setRecentPostsData(data))
  },[])


  React.useEffect(() => {
    getAllCategoriesAndCategoryAmount(getAllCategories()).then((data) => setCategories(data))
}, [getAllCategories])

  return (
    <footer className="bg-black text-white relative">
        <div className="relative after:content-[''] after:absolute after:bg-zinc-800 after:w-full after:h-px after:bottom-0">
          <div className="outer-width mx-auto">
            <section className=" relative w-full py-12 gap-10 flex flex-col md:grid md:grid-cols-3">
              {/* about us section */}
              <div className="about-us-and-icons">
                <div className="about-us">
                  <h2 className="font-bold mb-4 text-lg">About Us</h2>
                  <p className="text-gray-200">
                  BizTech is a blog offering diverse topics such as gaming, science, business, food, and movies. We aim to provide latest, relevant info in an engaging way. Our team is passionate and strives to deliver top content. Whether a gamer, science enthusiast, business professional, foodie, or movie buff, you"ll find something of interest on BizTech. Stay tuned for an enjoyable read!
                  </p>
                </div>
                <div className="social-icons flex flex-row mt-6 flex-wrap">
                  {socialMediaItems.map((el) => {
                    return (
                      <Link to="/" key={el.id} className="p-3 m-1 first-of-type:ml-0 rounded-full text-white max-[320px]:my-1 max-[320px]:first-of-type:ml-1" style={{backgroundColor:`var(${el.bgColor})`}}>
                        <el.icon/>
                      </Link>
                    )
                  })}
                </div>
              </div>
              {/* Recent posts section */}
              <div>
                <h2 className="font-bold mb-4 text-lg">Recent Posts</h2>
                <div className="flex flex-col gap-6">
                  {recentPostsData.map((data, index) => {
                    return (
                      <PostPreviewRow key={index} {...{post:data, textColor:"#fff", direction:"flex-row-reverse"}} />
                    )
                  })}
                </div>

              </div>
              {/* categories section */}
              <div className="categories">
                <h2 className="font-bold mb-4 text-lg">Categories</h2>
                <ul>
                  {/* Slice removes the first item which is home */}
                  {categories.map((el, index) => {
                    return (
                      <li key={el.category} className="relative py-3 flex flex-row justify-between after:content-[''] after:absolute after:bg-zinc-800 after:w-full after:left-0 after:h-px after:bottom-0">
                        <Link to={`/category/${el.category}`}>{el.category}</Link>
                        <div className="rounded-full p-1 flex justify-center items-center text-center text-xs min-w-[1.5rem] min-h-[1.5rem]" 
                          style={{backgroundColor:`var(--category--${el.category.toLowerCase()})`}}
                        >{el.amount}</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
        {/* copyright section */}
        <div className="outer-width mx-auto py-6">
          <section>
            <div className="text-center">&copy; Copyright {new Date().getFullYear()} BizTech. All Rights Reserved.</div>
          </section>
        </div>
    </footer>
  )

}

export default Footer