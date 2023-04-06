import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import GeneralHeading from '../components/GeneralHeading'
import { debounce } from "../utility/misc"
import { useAuthContext } from "../Auth/AuthContext"
import useNavigateOnAuth from '../hooks/useNavigateOnAuth';

const SignUp = () => {
  const { 
    registerUser,
    checkUsernameAvailability,
    isUsernameAvailable,
    isAuthError,
    signInGuestAccount,
  } = useAuthContext()

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

  

  useEffect(() => {
    checkUsernameAvailability(signUpStateData.username)
  },[signUpStateData.username])






  const onSubmit = e => {
    e.preventDefault()

    if(isSubmitAllowed) {
      registerUser(signUpStateData.email, signUpStateData.password, signUpStateData.username, signUpStateData.displayName)
      if(isAuthError) {
        setIsAuthError(false)
      }
    }
  }


  // redirects the user to the home page after logging in
  useNavigateOnAuth()



  return (
    <div className="flex flex-col">
      <GeneralHeading text={"Sign up"}/>
      <form className="form-card" onSubmit={onSubmit}>
        {/* username is the unique address for the user eg: author/@johnSmith */}
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-username">Username</label>
          <input className="form-input" autoComplete='off' maxLength={50} name="login-username" id="login-username" type="text" placeholder="eg: johnSmith123abc" onChange={(e) => {
            let debounceTimeInMilliseconds = 500
            debounce(async function() {
              setSignUpStateData({...signUpStateData, username:e.target.value.toLowerCase().replace(/\s/g, "")})
            }, debounceTimeInMilliseconds)
          }}/>
          {signUpStateData.username ? (
          <p className={`${isUsernameAvailable ? "text-green-600" : "text-red-600"}`}>@{signUpStateData.username} {isUsernameAvailable ? " is available" : " is already taken"}</p>
          ) : ""}
        </div>
        {/* display name is not unique and whats in the author eg: john smith */}
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-displayname">Display name</label>
          <input className="form-input" name="login-displayname" id="login-displayname" type="text" placeholder="eg: john smith" onChange={(e) => setSignUpStateData({...signUpStateData, displayName:e.target.value.trim()})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input className="form-input" name="login-email" id="login-email" type="email" placeholder="eg: johnsmith@gmail.com" onChange={(e) => setSignUpStateData({...signUpStateData, email:e.target.value.trim()})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" name="login-password" id="login-password" type="password" onChange={(e) => setSignUpStateData({...signUpStateData, password:e.target.value})}/>
        </div>
        <p className='text-center'>Have an account? <Link className="text-blue-500"  to="/login">Login</Link></p>
        <p className='text-center'>Just curious? <button className="text-blue-500" type="button" onClick={signInGuestAccount}>Try a demo account</button></p>
        
        <button className={`form-primary-btn ${isSubmitAllowed ? "opacity-100" : " opacity-50"}`} disabled={isSubmitAllowed ? false : true} type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp