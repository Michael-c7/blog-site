import React from 'react'
import { Link } from 'react-router-dom'

import {
  navItems,
  socialMediaItems,
} from "../utility/reusable"

import RecentPosts from './widgets/RecentPosts'

const Footer = () => {

  return (
    <footer className='footer-bg--before outer-width mx-auto text-white relative'>
      <section className='footer-top-bit--after relative w-full py-12 gap-10 flex flex-col md:flex-row'>
        <div className='about-us-and-icons'>
          <div className='about-us'>
            <h2 className='font-bold mb-4 text-lg'>About Us</h2>
            <p className=' text-gray-200'>
            BizTech is a blog offering diverse topics such as gaming, science, business, food, and movies. We aim to provide latest, relevant info in an engaging way. Our team is passionate and strives to deliver top content. Whether a gamer, science enthusiast, business professional, foodie, or movie buff, you'll find something of interest on BizTech. Stay tuned for an enjoyable read!
            </p>
          </div>
          <ul className='social-icons flex flex-row mt-6 flex-wrap'>
            {socialMediaItems.map((el) => {
              return (
                <li key={el.id} className='p-3 mx-1 first-of-type:ml-0 rounded-full text-white max-[320px]:my-1  max-[320px]:first-of-type:ml-1' style={{backgroundColor:`var(${el.bgColor})`}}>
                  <Link to="/" className=''>
                    <el.icon/>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <RecentPosts/>

        <div className='categories'>
          <h2 className='font-bold mb-4 text-lg'>Categories</h2>
          <ul className=''>
            {/* Slice removes the first item which is home */}
            {navItems.slice(1,navItems.length).map((el) => {
              return (
                <li key={el.id} className='categories-items--after relative py-3 flex flex-row justify-between'>
                  <Link to={`${el.link}`} className=''>{el.text}</Link>
                  <div className='rounded-full p-1 flex justify-center items-center text-center text-xs min-w-[1.5rem] min-h-[1.5rem]' 
                    style={{backgroundColor:`var(${el.bgColor})`}}
                  >13</div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className='bottom-bit py-6'>
          <div className=' text-center'>&copy; Copyright {new Date().getFullYear()} BizTech. All Rights Reserved.</div>
      </section>
    </footer>
  )
}

export default Footer