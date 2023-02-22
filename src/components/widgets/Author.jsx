import React from 'react'
import { Link } from 'react-router-dom'

import defaultAuthorImg from "../../assets/images/testAuthorImg1.jpg"

const Author = (props) => {
    const { authorImg, authorName, textColor, fontSize, imageSize } = props

    return (
        <Link to="/ to author page" className='flex flex-row items-center text-gray-500'>
            <img className='w-6 h-6 rounded-full object-cover' src={defaultAuthorImg} alt={`author img alt text`}/>
            <h2 className="text-sm min-[425px]:ml-2 ml-1 mr-3" style={{color:`${textColor}`}}>john smith</h2>
        </Link>
    )
}

export default Author