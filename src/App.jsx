import React from 'react'
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

// component
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Overlay from './components/Overlay'
import SearchOverlay from './components/SearchOverlay'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <div className='site-wrapper'>
      <Router>
        <Navbar/>

        <Sidebar/>

        <SearchOverlay/>

        <ScrollToTop/>
        
        <Overlay/>


        <Routes>
          {/* All private routes go in here */}
          <Route element={<PrivateRoutes/>}>
            <Route element={<CreateAPost/>} path="/createapost"/>
          </Route>

          <Route element={<Home/>} path="/"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<SignUp/>} path="/SignUp"/>
          <Route element={<Author/>} path="/author/:authorId"/>
          <Route element={<Category/>} path="/category/:categoryName"/>
          <Route element={<Post/>} path="/post/:postId"/>
          <Route element={<Search/>} path="/search"/>

          <Route element={<Error/>} path="*"/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
