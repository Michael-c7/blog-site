import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
// images
import logo from "../assets/images/BizTech.png"
import user from "../assets/images/defaultUser.png"

// icons
import { IoIosArrowDown, } from "react-icons/io"
import { BiSearch, BiUser } from "react-icons/bi"
import { 
  AiOutlineHeart,
  AiOutlineForm,
  AiOutlineMenu,
} from "react-icons/ai"
import { MdLogout } from "react-icons/md"

// misc
import { navItems } from "../utility/reusable"
import useClickOff from "../hooks/useClickOff"

// contexts
import { useStandardContext } from "../contexts/standard_context"
import { useAuthContext } from "../Auth/AuthContext"
import { useBlogContext } from "../contexts/blog_context"


const Navbar = () => {
  const { isLoggedIn, logoutUser } = useAuthContext()
  const { openSidebar, openSearchOverlay } = useStandardContext()
  const { currentUserName } = useBlogContext()

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = React.useState(false)
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = React.useState(false)

  
// refs
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
              <img src={logo} alt="biztech logo"/>
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
            {!isLoggedIn ? (
              <Link className="mr-4 max-[530px]:hidden" to="/signUp">Sign Up</Link>
            ) : ""}

            {!isLoggedIn ? (
              <Link className="mr-4 max-[530px]:hidden" to="/login">Login</Link>
            ) : ""}

            {isLoggedIn ? (
              <Link className="flex flex-row self-center mr-0 max-[530px]:hidden" to="/createAPost">
                <div className="flex flex-row self-center mr-1">
                  <AiOutlineForm/>
                </div>
                <span>Write</span>
              </Link>
            ) : ""}

            {/* <button className="bg-gray-200 p-2 rounded-full flex-center text-[18px] relative" onClick={() => openSearchOverlay()}>
              <BiSearch/>
            </button> */}

            <button className="hidden max-[530px]:block bg-gray-200 p-2 rounded-full flex-center text-[16px] relative ml-2"  onClick={() => openSidebar()}>
              <AiOutlineMenu/>
            </button>
            

            <button ref={profileRef} className="flex-center flex-row ml-3" onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}>
                <img src={user} className="mr-1 w-[32px]" alt="user image"/>
                <IoIosArrowDown className="text-zinc-500"/>
            </button>

            <div ref={profileMenuRef} className={`dropdown-menu-container top-[55px] ${isDropdownMenuOpen ? "dropdown-menu-container--open" : "dropdown-menu-container--closed"} `}>
            {/* Show when user is logged in */}
              {isLoggedIn ? (
                <ul className="dropdown-menu text-zinc-500">
                  <li className="my-4 hover:text-zinc-900">
                      <Link to={`/author/${currentUserName}`} className="flex flex-row items-center">
                        <BiUser className="mr-3 text-xl"/>
                        <span>Profile</span>
                      </Link>
                  </li>
                  <li className="my-4 hover:text-zinc-900 min-[530px]:hidden">
                      <Link to="/createAPost" className="flex flex-row items-center" onClick={() =>  setIsDropdownMenuOpen(false)}>
                        <AiOutlineForm className="mr-3 text-xl"/>
                        <span>Write</span>
                      </Link>
                  </li>
                  <li className="my-4 hover:text-zinc-900">
                    <Link to="/likedPosts" className="flex flex-row items-center" onClick={() =>  setIsDropdownMenuOpen(false)}>
                      <AiOutlineHeart className="mr-3 text-xl"/>
                      <span>Liked Posts</span>
                    </Link>
                  </li>
                  {/* <li className="my-4 hover:text-zinc-900">
                    <Link to="/stats" className="flex flex-row items-center" onClick={() =>  setIsDropdownMenuOpen(false)}>
                      <AiOutlineBarChart className="mr-3 text-xl"/>
                      <span>Stats</span>
                    </Link>
                  </li> */}

                  <li className="my-4 hover:text-zinc-900">
                    <button className="flex flex-row items-center" onClick={() => {
                      logoutUser()
                      setIsDropdownMenuOpen(false)
                    }}>
                      <MdLogout className="mr-3 text-xl"/>
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              ) : ""}
            {/* Show when user is logged out */}
                {!isLoggedIn ? (
                  <div className="text-center">
                    <h2 className="font-medium">Get started on BizTech</h2>
                    <Link to="/login" className="flex flex-row justify-center items-center my-4 form-primary-btn text-sm mx-0" onClick={() =>  setIsDropdownMenuOpen(false)}>
                    Login
                    </Link>
                    <Link to="/signUp" className="flex flex-row justify-center items-center my-4 form-secondary-btn text-sm mx-0" onClick={() =>  setIsDropdownMenuOpen(false)}>
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