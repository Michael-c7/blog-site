import React, { useState, useEffect, useRef } from "react"


/**
 * 
 * @param {*} excludedMenuRef - 1st  element ref excluded from onClose functionality, usually a dropdown menu
 * @param {*} excludedProfileRef 2nd element ref excluded from onClose functionality, usually a profile picture
 * @param {function} onClose - a function that will be triggered when the user clicks on a non excluded element 
 * @param {array} onCloseArgs - an array of argument(s) for the onClose function, default value is [false]
 */
const useClickOff = (excludedMenuRef, excludedProfileRef, onClose, onCloseArgs = [false]) => {
    if(typeof onClose !== "function") {
        throw new Error("OnClose argument must be a function")
    }

    // checks if argument for the onCloseArgs is an array or not
    if(onCloseArgs.constructor !== Array) {
        throw new Error("onCloseArgs argument must be an array")
    }

    useEffect(() => {
        if (!excludedMenuRef.current) {
            console.error("excludedMenuRef ref not provided. Click off event will not work.")
        }

        if (!excludedProfileRef.current) {
            console.error("excludedProfileRef ref not provided. Click off event will not work.")
        }

        // Add a click event listener to the document
        const handleClick = event => {
          let menu = excludedMenuRef.current.contains(event.target)
          let profile = excludedProfileRef.current.contains(event.target)
      
          // Check if the clicked element is the excluded element or a child of it
          if (!profile && excludedMenuRef.current && !menu) {
            // The click event occurred outside of the excluded element
            onClose(...onCloseArgs)
          }
        };
      
        document.addEventListener("click", handleClick);
      
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);
}

export default useClickOff