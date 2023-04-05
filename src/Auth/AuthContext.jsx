import React, { useState, useEffect, createContext, useContext } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import { AppAuth } from "../Auth/firebase"

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)


export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [AuthErrorMsg, setAuthErrorMsg] = useState("")
    const [user, setUser] = useState(null)


    const testFunc = _ => {
        console.log("this is the test func")
    }

    // This effect monitors the authentication state of the user
    useEffect(() => {
        setIsAuthLoading(true)
        const unsubscribe = onAuthStateChanged(AppAuth, currentUser => {
            currentUser ? setUser(currentUser) : setUser(null)
            currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
            console.log(currentUser)
            setIsAuthLoading(false)
        });
        return unsubscribe;
    }, [])



    const registerUser = (email, password) => {
        // const auth = getAuth();
        createUserWithEmailAndPassword(AppAuth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            setIsAuthError(false)
            setAuthErrorMsg("")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode,errorMessage)
            setIsAuthError(true)
            setAuthErrorMsg(errorMessage)
          });
    }



    const signInUser = (email, password) => {
        // const auth = getAuth();
        signInWithEmailAndPassword(AppAuth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            setIsAuthError(false)
            setAuthErrorMsg("")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode,errorMessage)
            setIsAuthError(true)
            setAuthErrorMsg(errorMessage)
          });
    }



    const logoutUser = () => {
      signOut(AppAuth).then(function() {
        // Sign-out successful.
        setIsAuthError(false)
        setAuthErrorMsg("")
      }).catch(function(error) {
        // An error happened.
        setIsAuthError(true)
        setAuthErrorMsg(error.message)
      });
    }



    const forgotPassword = (email) => {
      sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        // Password reset email sent!
        setIsAuthError(false)
        setAuthErrorMsg("")
      })
      .catch((error) => {
        setIsAuthError(true)
        setAuthErrorMsg(error.message)
        console.error(errorMessage)
      });
    }











    const contextValue = {
        isLoggedIn,
        isAuthLoading,
        isAuthError,setIsAuthError,
        AuthErrorMsg,
        user,
        testFunc,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}