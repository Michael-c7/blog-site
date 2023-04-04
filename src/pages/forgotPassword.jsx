import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GeneralHeading from '../components/GeneralHeading'
import { useAuthContext } from "../Auth/AuthContext"

const forgotPassword = () => {
  const { forgotPassword } = useAuthContext()
  const [emailState, setEmailState] = React.useState("")

  const isSubmitAllowed = (
    emailState
  )

  const onSubmit = e => {
    e.preventDefault()
    
    if(isSubmitAllowed) {
        forgotPassword(emailState)
        setEmailState("")
        // show success banner that says 
        /*Success! Your password recovery request
        has been received and a recovery email has
        been sent to the email address associated
        with your account.
        Please check your inbox shortly 
        and follow the instructions in the
        email to reset your password. */
    }
  }


  return (
    <div className="flex flex-col">
      <GeneralHeading text={"Recover Password"}/>
      <form className="form-card" onSubmit={onSubmit}>
        <div className="form-input-container">
          <label className="form-label" htmlFor="recover-email">Email Address</label>
          <input className="form-input" name="recover-email" id="recover-email" type="email" onChange={(e) => setEmailState(e.target.value)} value={emailState}/>
        </div>
        <p className="text-center my-1">Don't have an account? <Link className="text-blue-500"  to="/signUp">Sign Up</Link></p>
        <p className="text-center my-1">Have have an account? <Link className="text-blue-500"  to="/login">Login</Link></p>
        <button className={`form-primary-btn ${isSubmitAllowed ? "opacity-100" : " opacity-50"}`} disabled={isSubmitAllowed ? false : true} type="submit">Send recovery email</button>
      </form>
    </div>
  )
}

export default forgotPassword