import React from 'react'

const SignUp = () => {
  const [signUpStateData, setSignUpStateData] = React.useState({
    email:'',
    password:'',
  })

  React.useEffect(() => {
    console.log(signUpStateData)
  }, [signUpStateData])

  return (
    <div className="h-[75vh] flex flex-col justify-center items-center">
      <form className="form-card">
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input className="form-input" name="login-email" id="login-email" type="email" onChange={(e) => setSignUpStateData({...signUpStateData, email:e.target.value})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" name="login-password" id="login-password" type="password" onChange={(e) => setSignUpStateData({...signUpStateData, password:e.target.value})}/>
        </div>
        <button className="form-primary-btn" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp