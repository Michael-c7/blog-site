import React from 'react'
import { Link } from 'react-router-dom'

import defaultUserImg from "../../assets/images/defaultUser.png" 

const Author = (props) => {
    const { authorImg, authorName, authorLink, textColor, fontSize, imageSize } = props

    return (
        <Link to={authorLink} className="flex flex-row items-center text-gray-500">
            <img className="w-6 h-6 rounded-full object-cover" src={authorImg ? authorImg : defaultUserImg} alt={`author img alt text`}/>
            <h2 className="text-sm min-[425px]:ml-2 ml-1 mr-3" style={{color:`${textColor}`}}>{authorName ? authorName : "author name"}</h2>
        </Link>
    )
}

export default Author