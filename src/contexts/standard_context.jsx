import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/standard_reducer'

// import {} from '../actions'

const initialState = {
}

const StandardContext = React.createContext()

export const StandardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const testFunc2 = _ => {
    console.log('test func from standard context')
  }


  return (
    <StandardContext.Provider
      value={{
        ...state,
        testFunc2,
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