import React, { useState, useEffect, createContext, useContext } from 'react'



const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)


export const AuthContextProvider = ({children}) => {

    const testFunc = _ => {
        console.log("this is the test func")
    }
  
    const contextValue = {
        testFunc,
    }
  
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}