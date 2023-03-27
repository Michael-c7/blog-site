import React from "react"
import { Link } from "react-router-dom"

import {
  navItems,
  socialMediaItems,
} from "../utility/reusable"

import PostPreviewRow from "../components/widgets/postPreview/PostPreviewRow"

const Footer = () => {
  let recentPostsArr = Array.from({ length:2 })


  return (
    <footer className="bg-black text-white relative">
        <div className="relative after:content-[''] after:absolute after:bg-zinc-800 after:w-full after:h-px after:bottom-0">
          <div className="outer-width mx-auto">
            <section className="footer-top-bit--after relative w-full py-12 gap-10 flex flex-col md:flex-row ">
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
                      <Link to="/" key={el.id} className="p-3 mx-1 first-of-type:ml-0 rounded-full text-white max-[320px]:my-1  max-[320px]:first-of-type:ml-1" style={{backgroundColor:`var(${el.bgColor})`}}>
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
                  {recentPostsArr.map((el, index) => {
                    return (
                      <PostPreviewRow key={index} {...{textColor:"#fff", direction:"flex-row-reverse"}} />
                    )
                  })}
                </div>

              </div>
              {/* categories section */}
              <div className="categories">
                <h2 className="font-bold mb-4 text-lg">Categories</h2>
                <ul>
                  {/* Slice removes the first item which is home */}
                  {navItems.slice(1,navItems.length).map((el) => {
                    return (
                      <li key={el.id} className="categories-items--after relative py-3 flex flex-row justify-between">
                        <Link to={`${el.link}`}>{el.text}</Link>
                        <div className="rounded-full p-1 flex justify-center items-center text-center text-xs min-w-[1.5rem] min-h-[1.5rem]" 
                          style={{backgroundColor:`var(${el.bgColor})`}}
                        >13</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
        {/* copyright section */}
        <section className="outer-width mx-auto py-6">
          <div>
            <div className="text-center">&copy; Copyright {new Date().getFullYear()} BizTech. All Rights Reserved.</div>
          </div>
        </section>
    </footer>
  )
}

export default Footer