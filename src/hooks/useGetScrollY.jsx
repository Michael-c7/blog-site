import React, { useState, useEffect } from 'react'

const useGetScrollY = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = _ => {
        setScrollY(window.scrollY)
      }
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return (() => window.removeEventListener("scroll", handleScroll))
      })

    return { scrollY }
}

export default useGetScrollY