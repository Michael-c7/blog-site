import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="h-[50vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">An Error occurred.</h1>
      <Link to="/">
        <button className="form-primary-btn" type="button">Go Home</button>
      </Link>
    </div>
  )
}

export default Error