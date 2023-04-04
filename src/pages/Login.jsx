import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GeneralHeading from '../components/GeneralHeading'
import { useAuthContext } from "../Auth/AuthContext"

const Login = () => {
  const { signInUser } = useAuthContext()
  const navigate = useNavigate();

  const [loginStateData, setLoginStateData] = React.useState({
    email:'',
    password:'',
  })

  const isSubmitAllowed = (
    loginStateData.email
    && loginStateData.password
  )


  const onSubmit = e => {
    e.preventDefault()
    
    if(isSubmitAllowed) {
      signInUser(loginStateData.email, loginStateData.password)
      navigate("/")
    }
  }

  

  return (
    <div className="flex flex-col">
      <GeneralHeading/>
      <form className="form-card" onSubmit={onSubmit}>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input className="form-input" name="login-email" id="login-email" type="email" onChange={(e) => setLoginStateData({...loginStateData, email:e.target.value})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" name="login-password" id="login-password" type="password" onChange={(e) => setLoginStateData({...loginStateData, password:e.target.value})}/>
        </div>
        <p className="text-center my-1">Don't have an account? <Link className="text-blue-500" to="/signUp">Sign Up</Link></p>
        <p className="text-center my-1">Forgot your password? <Link className="text-blue-500" to="/forgotpassword">Recover Password</Link></p>
        <button className={`form-primary-btn ${isSubmitAllowed ? "opacity-100" : " opacity-50"}`} disabled={isSubmitAllowed ? false : true} type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login