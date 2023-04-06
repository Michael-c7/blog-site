import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../Auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { AppAuth } from "../Auth/firebase";

/**
 * This is a custom React hook that is used to navigate to a specified location
 * after the user has been authenticated. It uses Firebase Authentication and
 * React Router to achieve this.
 *
 * @param {string} locationToNavigate - The location to navigate to after the user is authenticated. Defaults to "/" if not provided.
 *
 * @return {void}
 */
const useNavigateOnAuth = (locationToNavigate = "/") => {
  // Get the authentication state and error handling functions from the AuthContext
  const { 
    isAuthError,
    setIsAuthError,
  } = useAuthContext()

  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Listen to changes in the authentication state
  React.useEffect(() => {
    // Set up the listener and save the unsubscribe function to a variable
    const unsubscribe = onAuthStateChanged(AppAuth, currentUser => {
      if(currentUser) {
        // If the user is authenticated, navigate to the specified location
        navigate(locationToNavigate);
        // Set the authentication error state to false
        setIsAuthError(false)
      }            
    });

    // Return the unsubscribe function to remove the listener when the component unmounts
    return unsubscribe;
  }, [locationToNavigate, navigate, setIsAuthError]);
}

export default useNavigateOnAuth;
