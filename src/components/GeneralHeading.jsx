import React from 'react'
import { useLocation } from 'react-router-dom'


const GeneralHeading = ({ text }) => {
    let defaultText = useLocation().pathname.slice(1)

    return (
        <div className='text-4xl font-semibold text-center bg-gray-100 py-12 capitalize'>{text || defaultText}</div>
    )
}

export default GeneralHeading