import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

import logo from "../assets/images/BizTech.png"
import user from "../assets/images/defaultUser.png"
// icons
import { IoIosArrowDown, } from "react-icons/io";
import { BiSearch, BiUser } from "react-icons/bi"
import { 
  AiOutlineHeart,
  AiOutlineForm,
  AiOutlineMenu
} from "react-icons/ai"
import { MdLogout } from "react-icons/md"

import { navItems } from "../utility/reusable"

import { useStandardContext } from "../contexts/standard_context";

import useClickOff from "../hooks/useClickOff";




const Navbar = () => {
  const { openSidebar, openSearchOverlay } = useStandardContext()

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = React.useState(false)
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = React.useState(false)

  // temp var
  let auth = false


  const profileMenuRef = useRef(null)
  const profileRef = useRef(null)
  const categoriesMenuRef = useRef(null)
  const categoriesProfileRef = useRef(null)


// profile menu
  useClickOff(profileMenuRef, profileRef, setIsDropdownMenuOpen)
// categories menu
  useClickOff(categoriesMenuRef, categoriesProfileRef, setIsCategoriesMenuOpen)




  return (
    <nav className="bg-white w-full sticky top-0 z-40 after:content-[''] after:w-full after:bg-gray-100 after:h-px after:absolute after:bottom-0 after:-z-10">
      <div className="py-4 flex-center flex-row outer-width mx-auto max-[320px]:flex-col">
          <div className="left-side flex flex-row">
            <Link className="logo-container mr-3 max-[320px]:mr-3 max-[320px]:mb-2" to="/">
              <img src={logo}/>
            </Link>

            <ul className="flex flex-row relative">
              <li className="mx-2 font-medium relative hidden max-[830px]:block max-[530px]:hidden">
                <button ref={categoriesProfileRef} className="flex-center" onClick={() => setIsCategoriesMenuOpen(!isCategoriesMenuOpen)}>
                  <span>Categories</span>
                  <IoIosArrowDown className="text-zinc-500 top-[2px] relative text-xs ml-[1px]" />
                </button>

                <ul ref={categoriesMenuRef} className={`dropdown-menu-container left-0 right-auto p-0 ${isCategoriesMenuOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed"}`}>
                {navItems.map((el) => {
                  return (
                    <li className="font-normal py-3 relative" key={el.id}>
                      <Link className="px-2" to={el.link}>{el.text}</Link>
                    </li>
                  )
                })}
                </ul>
              </li>
              
              {navItems.map((el) => {
                  return (
                    <li className="font-medium max-[830px]:hidden" key={el.id}>
                      <Link className="px-2" to={el.link}>{el.text}</Link>
                    </li>
                  )
                })}
            </ul>
          </div>

          <div className="right-side flex flex-row items-center relative">
            {!auth ? (
              <Link className="mr-4 max-[530px]:hidden" to="/signUp">Sign Up</Link>
            ) : ""}

            {!auth ? (
              <Link className="mr-4 max-[530px]:hidden" to="/login">Login</Link>
            ) : ""}

            {auth ? (
              <Link className="flex flex-row self-center mr-3 max-[530px]:hidden" to="/createAPost">
                <div className="flex flex-row self-center mr-1">
                  <AiOutlineForm/>
                </div>
                <span>Write</span>
              </Link>
            ) : ""}

            <button className="bg-gray-200 p-2 rounded-full flex-center text-[18px] relative" onClick={() => openSearchOverlay()}>
              <BiSearch/>
            </button>

            <button className="hidden max-[530px]:block bg-gray-200 p-2 rounded-full flex-center text-[16px] relative ml-2"  onClick={() => openSidebar()}>
              <AiOutlineMenu/>
            </button>

            <button ref={profileRef} className="flex-center flex-row ml-3" onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}>
                <img src={user} className="mr-1 w-[32px]"/>
                <IoIosArrowDown className="text-zinc-500" />
            </button>

            <div ref={profileMenuRef} className={`dropdown-menu-container top-[55px] ${isDropdownMenuOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed"} `}>
            {/* Show when user is logged in */}
              {auth ? (
                <ul className="dropdown-menu text-zinc-500">
                  <li className="my-4 hover:text-zinc-900">
                      <Link to="/profile" className="flex flex-row items-center">
                        <BiUser className="mr-3 text-xl"/>
                        <span>Profile</span>
                      </Link>
                  </li>
                  <li className="my-4 hover:text-zinc-900 min-[530px]:hidden">
                      <Link to="/createAPost" className="flex flex-row items-center">
                        <AiOutlineForm className="mr-3 text-xl"/>
                        <span>Write</span>
                      </Link>
                  </li>
                  <li className="my-4 hover:text-zinc-900">
                    <Link to="/likedPosts" className="flex flex-row items-center">
                      <AiOutlineHeart className="mr-3 text-xl"/>
                      <span>Liked Posts</span>
                    </Link>
                  </li>
                  <li className="my-4 hover:text-zinc-900">
                    <Link to="/" className="flex flex-row items-center">
                      <MdLogout className="mr-3 text-xl"/>
                      <span>Sign Out</span>
                    </Link>
                  </li>
                </ul>
              ) : ""}
            {/* Show when user is logged out */}
                {!auth ? (
                  <div className="text-center">
                    <h2 className="font-medium">Get started on BizTech</h2>
                    <Link to="/login" className="flex flex-row justify-center items-center my-4 form-primary-btn text-sm mx-0">
                    Login
                    </Link>
                    <Link to="/signUp" className="flex flex-row justify-center items-center my-4 form-secondary-btn text-sm mx-0">
                    Sign Up
                    </Link>
                  </div>
                ) : ""}
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar