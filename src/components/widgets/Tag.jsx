import React from "react"
import { Link } from "react-router-dom"

/**
 * 
 * @param {*} props bgColor: a color eg:#efefef, link: a link to the category eg: gaming, text: text for the text eg: gaming
 * @returns 
 */
const Tag = (props) => {
  const { bgColor, link, text } = props
  
  return (
    <Link to={link} className={`text-xs py-1 px-4 font-medium rounded uppercase text-white text-center`} style={{backgroundColor:`${bgColor}`}}>
    {text}
    </Link>
  )
}

export default Tag