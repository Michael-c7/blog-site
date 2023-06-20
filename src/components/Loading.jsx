import React from 'react'
import { ImSpinner2 } from "react-icons/im"

const Loading = () => {
  return (
    <div className="text-9xl absolute z-50 bg-white w-full h-full flex flex-col justify-center items-center">
      <ImSpinner2 className='animate-spin text-9xl'/>
      <h1 className="mt-4 text-5xl text-center">Loading...</h1>
    </div>
  )
}

export default Loading