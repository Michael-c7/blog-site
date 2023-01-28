import React from 'react'

const Login = () => {
  const [loginStateData, setLoginStateData] = React.useState({
    email:'',
    password:'',
  })

  React.useEffect(() => {
    console.log(loginStateData)
  }, [loginStateData])

  return (
    <div className="h-[75vh] flex flex-col justify-center items-center">
      <form className="form-card">
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input className="form-input" name="login-email" id="login-email" type="email" onChange={(e) => setLoginStateData({...loginStateData, email:e.target.value})}/>
        </div>
        <div className="form-input-container">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" name="login-password" id="login-password" type="password" onChange={(e) => setLoginStateData({...loginStateData, password:e.target.value})}/>
        </div>
        <button className="form-primary-btn" type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login