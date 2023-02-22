import React from 'react'
import { ImClock } from "react-icons/im"


const Date = (props) => {
  const { date, textColor, textSize } = props

  return (
    <span className="flex flex-row items-center text-gray-500 text-sm" style={{color:textColor}}>
        <ImClock className="mr-1 text-xs"/>
        <p>Dec 24, 2016</p>
    </span>
  )
}

export default Date