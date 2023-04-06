import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GeneralHeading from '../components/GeneralHeading'
import { useAuthContext } from "../Auth/AuthContext"


const forgotPassword = () => {
  const { forgotPassword, isAuthError,setIsAuthError } = useAuthContext()
  const [emailState, setEmailState] = React.useState("")
  const [RecoveryEmailSent, setRecoveryEmailSent] = React.useState(false)

  const isSubmitAllowed = (
    emailState
  )

  const onSubmit = e => {
    e.preventDefault()
    if(isSubmitAllowed) {
      forgotPassword(emailState)
      // checks to see if the email exists / if their are any errors
      if(isAuthError === true) {
        setEmailState("")
        setRecoveryEmailSent(true)
      }
    }
  }


  return (
    <div className='relative'>
    {/* <ErrorComponent /> */}
    {RecoveryEmailSent ? (
    <div className="flex flex-col">
      <GeneralHeading text={"Recover Password"}/>
      <form className="form-card" onSubmit={onSubmit}>
        <h2 className="text-center font-semibold text-lg">Email Sent</h2>
        <p className="my-2">A recovery email has been sent to the email address associated with your account. Make sure to check your spam folder!</p>
        <button className={`form-primary-btn`} type="button" onClick={() => setRecoveryEmailSent(false)}>Ok</button>
      </form>
    </div>
    ) : (
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
    )}
    </div>
  )
}

export default forgotPassword