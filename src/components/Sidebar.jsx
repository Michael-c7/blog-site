import React from 'react'
import { VscChromeClose } from "react-icons/vsc"

import { Link } from 'react-router-dom'
import { navItems } from '../utility/reusable'
import { socialMediaItems } from '../utility/reusable'
import { useStandardContext } from "../contexts/standard_context"



const Sidebar = (props) => {
    const {
        isSidebarOpen,
        closeSidebar,
    } = useStandardContext()

    return (
        <aside className={`absolute top-0 right-0 h-[100%] bg-white drop-shadow w-[20rem] max-[320px]:w-[100%] px-8 py-10 z-50 transition-all duration-[375ms] ${isSidebarOpen ? "right-[0]" : "right-[-20rem]"}`}>
            <button className="relative text-3xl" style={{left:"100%", transform:"translate(-100%)"}} onClick={() => closeSidebar()}>
                <VscChromeClose/>
            </button>
            <ul className="max-[320px]:text-center">
                {navItems.map((el) => {
                    return (
                        <li key={el.id} className="my-4 font-medium">
                            <Link to={`${el.link}`}>{el.text}</Link>
                        </li>
                    )
                })}
            </ul>
            {/* social media icons */}
            <ul className="flex flex-row text-white mt-10">
                {socialMediaItems.map((el) => {
                    return (
                        <li key={el.id} className={`p-3 mx-1 first-of-type:ml-0 rounded-full`}  style={{backgroundColor:`var(${el.bgColor})`}}>
                            {<el.icon/>}
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default Sidebar