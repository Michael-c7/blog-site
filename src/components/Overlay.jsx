import React from 'react'
import { useStandardContext } from "../contexts/standard_context"


const Overlay = () => {
  const {
    isSidebarOpen,
    closeSidebar,
  } = useStandardContext()

  return (
    <div className={`absolute top-0 w-full h-full bg-[rgba(5,5,5,0.85)] ease-in-out duration-200  ${isSidebarOpen ? " opacity-100 z-40 transition" : "opacity-0 -z-40 transition-none"}`}  onClick={() => closeSidebar()}></div>
  )
}

export default Overlay