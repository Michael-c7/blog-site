import React from "react"
import { Link } from "react-router-dom"


const Tag = (props) => {
  const { bgColor, link, text } = props
  console.log(props)
  return (
    <Link to={link} className={`${bgColor ? `bg-[${bgColor}]` : "bg-slate-500"} text-xs py-1 px-4 font-medium rounded uppercase text-white text-center`}>
    {text}
    </Link>
  )
}

export default Tag