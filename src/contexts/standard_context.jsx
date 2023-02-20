import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/standard_reducer'

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  SEARCH_OVERLAY_OPEN,
  SEARCH_OVERLAY_CLOSE,
} from '../actions'

const initialState = {
  isSidebarOpen:false,
  isSidebarOverlayOpen:false,
}

const StandardContext = React.createContext()

export const StandardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = _ => {
    dispatch({type: SIDEBAR_OPEN})
  }

  const closeSidebar = _ => {
    dispatch({type: SIDEBAR_CLOSE})
  }


  const openSearchOverlay = _ => {
    dispatch({type: SEARCH_OVERLAY_OPEN})

  }

  const closeSearchOverlay = _ => {
    dispatch({type: SEARCH_OVERLAY_CLOSE})
    
  }


  return (
    <StandardContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        openSearchOverlay,
        closeSearchOverlay,
      }}
    >
      {children}
    </StandardContext.Provider>
  )
}



// make sure to use this hook
export const useStandardContext = () => {
  return useContext(StandardContext)
}