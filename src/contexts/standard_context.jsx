import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/standard_reducer'

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
} from '../actions'

const initialState = {
  isSidebarOpen:false,
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


  return (
    <StandardContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
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