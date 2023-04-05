import React from 'react'
import { BiErrorCircle, BiX } from "react-icons/bi"
import { useAuthContext } from "../Auth/AuthContext"

/**
 * Error component that displays an error message
 * @param {object} props - The props object
 * @param {string} props.errorMessage - The error message to display
 * @returns {JSX.Element} - The Error component
 */
const Error = (props) => {
  const { isAuthError, setIsAuthError } = useAuthContext()

  return (
    <>
      <div className={`error-msg grid grid-cols-[auto_1fr_auto] bg-red-600 text-white absolute w-full py-4 px-1 items-center z-40 break-all`}>
        <div className="text-2xl">
          <BiErrorCircle/>
        </div>
        <div className='msg-here mx-3'>{props.errorMessage ? props.errorMessage : "An error occurred."}</div>
        <button className="text-4xl relative top-[2px] ml-auto h-full" onClick={() => setIsAuthError(false)}>
          <BiX/>
        </button>
      </div>
    </>

  )
}

export default Error