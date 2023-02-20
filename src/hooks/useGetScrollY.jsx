import React, { useState, useEffect } from 'react'

const useGetScrollY = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = _ => {
        setScrollY(document.querySelector(".site-wrapper").scrollTop)
    }

    useEffect(() => {
        document.querySelector(".site-wrapper").addEventListener("scroll", handleScroll);

        return (() => document.querySelector(".site-wrapper").removeEventListener("scroll", handleScroll))
    })

    return { scrollY }
}

export default useGetScrollY