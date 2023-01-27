import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/blog_reducer'

// import {} from '../actions'

const initialState = {
}

const BlogContext = React.createContext()

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const testFunc3 = _ => {
    console.log('test func from blog context')
  }

  return (
    <BlogContext.Provider
      value={{
        ...state,
        testFunc3,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}



// make sure to use this hook
export const useBlogContext = () => {
  return useContext(BlogContext)
}