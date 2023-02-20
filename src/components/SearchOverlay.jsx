import React, { useState, useEffect, useRef } from 'react'

import { VscChromeClose } from "react-icons/vsc"
import { useStandardContext } from "../contexts/standard_context";
import useGetScrollY from "../hooks/useGetScrollY"

const SearchOverlay = () => {
    const { isSidebarOverlayOpen, closeSearchOverlay  } = useStandardContext()

    const { scrollY } = useGetScrollY()

    React.useEffect(() => {
        let siteWrapper = document.querySelector(".site-wrapper")
        if(isSidebarOverlayOpen) {
            siteWrapper.style.overflowY = "hidden"
        } else {
            siteWrapper.style.overflowY = "initial"

        }
    }, [isSidebarOverlayOpen])

    return (
        <div className={ `${isSidebarOverlayOpen ? "overlay--shown " : "overlay--hidden"}`} style={{top:`${scrollY}px`}}>
            <button className="absolute text-3xl top-0 right-0 m-8 p-3 z-10 " onClick={() => closeSearchOverlay()}>
               <VscChromeClose/>
             </button>

             <div className='absolute w-full h-full flex justify-center items-center '>
                <input type="text" placeholder="Search..." className='absolute bg-transparent placeholder:text-black text-6xl font-medium max-[850px]:text-4xl max-[500px]:text-3xl max-[425px]:w-11/12' style={{borderBottom:"2px solid #000"}}/> 
             </div>
        </div>
    )
}

export default SearchOverlay