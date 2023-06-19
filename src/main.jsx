import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { StandardProvider } from './contexts/standard_context.jsx'
import { BlogProvider } from './contexts/blog_context'
import { AuthContextProvider } from './Auth/AuthContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StandardProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </StandardProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)