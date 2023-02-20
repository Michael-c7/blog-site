import React from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import useGetScrollY from "../hooks/useGetScrollY"

const ScrollToTop = () => {
    const { scrollY } = useGetScrollY()

    const [isShown, setIsShown] = React.useState(false)
    // in pixels, eg: 800px
    const [amtToScroll, setAmtToScroll] = React.useState(800)


    React.useEffect(() => {
        if(scrollY <= amtToScroll) {
            // show
            setIsShown(false)
        } else {
            // hide
            setIsShown(true)
        }
    },[scrollY])

    return (
        <button onClick={() => document.querySelector(".site-wrapper").scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bg-[rgba(0,0,0,0.8)] text-white p-2 text-2xl rounded  right-8 bottom-4 transition-all ${isShown ? "opacity-100 z-40" : "opacity-0 -z-40"}`}>
            <MdOutlineKeyboardArrowUp />
        </button>
    )
}

export default ScrollToTop