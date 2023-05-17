import React, { useState, useEffect, useRef } from "react"

import { VscChromeClose } from "react-icons/vsc"
import { useStandardContext } from "../contexts/standard_context";
import { useBlogContext } from "../contexts/blog_context";

import useGetScrollY from "../hooks/useGetScrollY"
import { redirect } from "react-router-dom";


const SearchOverlay = () => {
    const { isSidebarOverlayOpen, closeSearchOverlay } = useStandardContext()
    const { setCurrentSearchTerm } = useBlogContext()

    const { scrollY } = useGetScrollY()

    
    let [localSearchTerm, setLocalSearchTerm] = useState("")


    React.useEffect(() => {
        if(isSidebarOverlayOpen) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "initial"
        }
    },[isSidebarOverlayOpen])


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Enter key was pressed
            performSearch()
            // close the search overlay
            closeSearchOverlay()
            // redirect to the /search page
            return redirect("/search")
        }
    }

    const performSearch = (event) => {
        // Perform search logic here using the search term
        // the actual search term
        setCurrentSearchTerm(localSearchTerm)
        // Reset the local search term
        setLocalSearchTerm("")
      }

    return (
        <div className={`absolute w-full h-full top-0 bg-gray-100 ${isSidebarOverlayOpen ? "opacity-80 z-50 block" : "opacity-0 -z-50 hidden"}`} style={{top:`${scrollY}px`}}>
            <button className="absolute text-3xl top-0 right-0 m-8 p-3 z-10" onClick={() => closeSearchOverlay()}>
                <VscChromeClose/>
            </button>
            <div className="absolute w-full h-full flex justify-center items-center">
             <input type="text" placeholder="Search..." value={localSearchTerm} className="absolute bg-transparent placeholder:text-black text-6xl font-medium max-[850px]:text-4xl max-[500px]:text-3xl max-[425px]:w-11/12 border-b-2 border-black" onChange={(event) => setLocalSearchTerm(event.target.value)} onKeyDown={handleKeyDown}/> 
            </div>
        </div>
    )
}

export default SearchOverlay