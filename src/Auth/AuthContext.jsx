import React, { useState, useEffect, createContext, useContext } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import { AppAuth, db } from "../Auth/firebase"
import { 
  collection,
  getDocs,
  doc,
  getDoc,
  writeBatch
} from "firebase/firestore"; 


const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)


export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [AuthErrorMsg, setAuthErrorMsg] = useState("")
    const [user, setUser] = useState(null)
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)

    const testFunc = _ => {
        console.log("this is the test func")
    }

    // This effect monitors the authentication state of the user
    useEffect(() => {
        setIsAuthLoading(true)
        const unsubscribe = onAuthStateChanged(AppAuth, currentUser => {
            currentUser ? setUser(currentUser) : setUser(null)
            currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
            // console.log(currentUser)

            setIsAuthLoading(false)
        });
        return unsubscribe;
    }, [])



    const checkUsernameAvailability = async (username) => {
      // Create a document reference for the given username in the "usernames" collection
      const docRef = doc(db, "usernames", username);
      // Retrieve a document snapshot for the given username
      const docSnap = await getDoc(docRef);

      // Check if the document snapshot exists for the given username
      if (docSnap.exists()) {
        setIsUsernameAvailable(false)
      } else {
        // docSnap.data() will be undefined in this case
        setIsUsernameAvailable(true)
      }
    }




    const CreateUserAndUsername = async (username, userUid, displayName) => {
      // Get a new write batch
      const batch = writeBatch(db)

      // create refs for both documents
      const userDoc = doc(db, "users", userUid)
      const usernameDoc =  doc(db, "usernames", username)

      // commit both docs together as a batch write
      batch.set(userDoc, { username, displayName })
      batch.set(usernameDoc, { uid:userUid, displayName })

      // Commit the batch
      await batch.commit();
    }



    const registerUser = (email, password, username, displayName) => {
        createUserWithEmailAndPassword(AppAuth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            setIsAuthError(false)
            setAuthErrorMsg("")

            // put the custom name batch write stuff here
            CreateUserAndUsername(username, user.uid, displayName)
            
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



    const signInGuestAccount = _ => {
      let guestEmail = import.meta.env.VITE_GUEST_USER_EMAIL
      let guestPassword = import.meta.env.VITE_GUEST_USER_PASSWORD

      signInWithEmailAndPassword(AppAuth, guestEmail, guestPassword)
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
        signInGuestAccount,
        logoutUser,
        forgotPassword,
        checkUsernameAvailability,
        isUsernameAvailable,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}