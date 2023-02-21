import React from 'react'
import { Link } from 'react-router-dom'

import defaultAuthorImg from "../../assets/images/testAuthorImg1.jpg"

const Author = (authorImg, authorName, textColor, fontSize, imageSize) => {

    return (
        <Link to="/ to author page" className='flex flex-row items-center '>
            <img className='w-6 h-6 rounded-full object-cover' src={defaultAuthorImg} alt={`authorData.authorName`}/>
            <h2 className="text-gray-500 text-sm min-[425px]:ml-2 ml-1 mr-3">john smith</h2>
        </Link>
    )
}

export default Author