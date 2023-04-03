import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import GeneralHeading from '../components/GeneralHeading'

import { useAuthContext } from "../Auth/AuthContext"

const SignUp = () => {
  const { registerUser } = useAuthContext()
  const navigate = useNavigate();
  
  // temp var
  let isUsernameAvailable = true

  const [signUpStateData, setSignUpStateData] = React.useState({
    username:"",
    displayName:"",
    email:"",
    password:"",
  })


  const isSubmitAllowed = (
    signUpStateData.username
    && isUsernameAvailable 
    && signUpStateData.displayName
    && signUpStateData.email
    && signUpStateData.password
  )

  const onSubmit = e => {
    e.preventDefault()

    if(isSubmitAllowed) {
      registerUser(signUpStateData.email, signUpStateData.password)
      navigate("/")
    }
  }



  return (
    <div className="flex flex-col">
      <GeneralHeading text={"Sign up"}/>
      <form className="form-card" onSubmit={onSubmit}>
        {/* username is the unique address for the user eg: author/@johnSmith */}
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-username">Username</label>
          <input className="form-input" name="login-username" id="login-username" type="text" placeholder="eg: johnSmith123abc" onChange={(e) => setSignUpStateData({...signUpStateData, username:e.target.value})}/>
          {signUpStateData.username ? (
          <p className={`${isUsernameAvailable ? "text-green-600" : "text-red-600"}`}>@{signUpStateData.username} {isUsernameAvailable ? " is available" : " is already taken"}</p>
          ) : ""}
        </div>
        {/* display name is not unique and whats in the author eg: john smith */}
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-displayname">Display name</label>
          <input className="form-input" name="login-displayname" id="login-displayname" type="text" placeholder="eg: john smith" onChange={(e) => setSignUpStateData({...signUpStateData, displayName:e.target.value})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input className="form-input" name="login-email" id="login-email" type="email" placeholder="eg: johnsmith@gmail.com" onChange={(e) => setSignUpStateData({...signUpStateData, email:e.target.value})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" name="login-password" id="login-password" type="password" onChange={(e) => setSignUpStateData({...signUpStateData, password:e.target.value})}/>
        </div>
        <p className='text-center'>Have an account? <Link className="text-blue-500"  to="/login">Login</Link></p>
        
        <button className={`form-primary-btn ${isSubmitAllowed ? "opacity-100" : " opacity-50"}`} disabled={isSubmitAllowed ? false : true} type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp