import React from 'react'

import { VscChromeClose } from "react-icons/vsc"


const SearchOverlay = (props) => {
    const { isSearchOverlayShown, setIsSearchOverlayShown } = props

    React.useEffect(() => {
        let siteWrapper = document.querySelector(".site-wrapper")
        if(isSearchOverlayShown) {
            siteWrapper.style.overflowY = "hidden"
        } else {
            siteWrapper.style.overflowY = "initial"

        }
    }, [isSearchOverlayShown])

    return (
        <div className={`absolute bg-[rgba(250,250,250,0.93)] z-50 left-0 top-0 w-full h-full ease-in-out duration-150 transition-all ${isSearchOverlayShown ? " z-50 opacity-100" : "z-[-1] opacity-0"}`}>
            <button className="absolute text-3xl top-0 right-0 m-8 p-3" onClick={() => setIsSearchOverlayShown(false)}>
                <VscChromeClose/>
            </button>
            <input type="text" placeholder="Search..." className='absolute bg-transparent placeholder:text-black text-6xl font-medium   max-[850px]:text-4xl max-[500px]:text-3xl max-[425px]:w-11/12' style={{transform:"translate(-50%, -50%", left:"50%", top:"50%", borderBottom:"1px solid #000"}}/>
        </div>
    )
}

export default SearchOverlay