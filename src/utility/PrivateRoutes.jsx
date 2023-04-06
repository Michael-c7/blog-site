import React from 'react'
import { Outlet, Navigate  } from 'react-router-dom'
import { useAuthContext } from "../Auth/AuthContext"


const PrivateRoutes = () => {
  const { isLoggedIn } = useAuthContext()

    return (
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes