import React, { useState, useEffect, useRef } from "react"

import { VscChromeClose } from "react-icons/vsc"
import { useStandardContext } from "../contexts/standard_context";
import useGetScrollY from "../hooks/useGetScrollY"

const SearchOverlay = () => {
    const { isSidebarOverlayOpen, closeSearchOverlay  } = useStandardContext()

    const { scrollY } = useGetScrollY()


    React.useEffect(() => {
        if(isSidebarOverlayOpen) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "initial"
        }
    },[isSidebarOverlayOpen])

    return (
        <div className={`absolute w-full h-full top-0 bg-gray-100 ${isSidebarOverlayOpen ? "opacity-80 z-50" : " opacity-0 -z-50"}`} style={{top:`${scrollY}px`}}>
            <button className="absolute text-3xl top-0 right-0 m-8 p-3 z-10" onClick={() => closeSearchOverlay()}>
                <VscChromeClose/>
            </button>
            <div className="absolute w-full h-full flex justify-center items-center ">
             <input type="text" placeholder="Search..." className="absolute bg-transparent placeholder:text-black text-6xl font-medium max-[850px]:text-4xl max-[500px]:text-3xl max-[425px]:w-11/12 border-b-2 border-black"/> 
            </div>
        </div>
    )
}

export default SearchOverlay