import React from 'react'
import { Outlet, Navigate  } from 'react-router-dom'


const PrivateRoutes = () => {
    // auth var is temp until you get actual auth from firebase
    let auth = false
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes