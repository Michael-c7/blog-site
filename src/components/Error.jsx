import React from 'react'
import { BiErrorCircle } from "react-icons/bi"
const Error = (props) => {
  return (
    <div className="bg-red-600 text-white px-4 py-4 mx-3 my-2 flex flex-row flex-wrap items-center">
    <div className="mr-1 text-lg">
      <BiErrorCircle/>
    </div>
    <h2>{props.errorMessage ? props.errorMessage : "There was an error"}</h2>
  </div>
  )
}

export default Error