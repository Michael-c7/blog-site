import React from "react"
import { Link } from "react-router-dom"


const Tag = (props) => {
  const { bgColor, link, text } = props
  
  return (
    <Link to={link} className={`text-xs py-1 px-4 font-medium rounded uppercase text-white text-center`} style={{backgroundColor:`${bgColor}`}}>
    {text}
    </Link>
  )
}

export default Tag