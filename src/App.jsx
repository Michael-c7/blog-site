import { useState } from 'react'

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'

import PrivateRoutes from './utility/PrivateRoutes'

// public route
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Author from './pages/Author'
import Category from './pages/Category'
import Post from './pages/Post'
import Search from './pages/Search'

import Error from './pages/Error'
// private route
import CreateAPost from './pages/CreateAPost'


function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* All private routes go in here */}
          <Route element={<PrivateRoutes/>}>
            <Route element={<CreateAPost/>} path="/createapost"/>
          </Route>

          <Route element={<Home/>} path="/"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<SignUp/>} path="/SignUp"/>

          <Route element={<Author/>} path="/author"/>
          <Route element={<Category/>} path="/category"/>
          <Route element={<Post/>} path="/post"/>
          <Route element={<Search/>} path="/search"/>


          <Route element={<Error/>} path="*"/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
