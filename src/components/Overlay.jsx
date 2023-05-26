import React from 'react'
import { useStandardContext } from "../contexts/standard_context"
import useGetScrollY from "../hooks/useGetScrollY"


const Overlay = () => {
  const {
    isSidebarOpen,
    closeSidebar,
  } = useStandardContext()

  const { scrollY } = useGetScrollY()

  return (
    <div className={`absolute top-0 w-full h-full bg-[rgba(5,5,5,0.85)] ease-in-out duration-200  ${isSidebarOpen ? " opacity-100 z-40 transition block" : "opacity-0 -z-40 transition-none hidden"}`}  onClick={() => closeSidebar()} style={{top:`${scrollY}px`}}></div>
  )
}

export default Overlay