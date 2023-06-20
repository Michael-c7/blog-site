import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import PrivateRoutes from "./utility/PrivateRoutes"


// public route
import Home from "./pages/Home"
const Login = React.lazy(() => import("./pages/Login"))
const SignUp = React.lazy(() => import("./pages/SignUp"))
const ForgotPassword = React.lazy(() => import("./pages/forgotPassword"))
const Author = React.lazy(() => import("./pages/Author"))
const Category = React.lazy(() => import("./pages/Category"))
const Post = React.lazy(() => import("./pages/Post"))




// private route
const CreateAPost = React.lazy(() => import("./pages/CreateAPost"))
const LikedPosts = React.lazy(() => import("./pages/LikedPosts"))
const Stats = React.lazy(() => import("./pages/Stats"))


// component
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"
import Overlay from "./components/Overlay"
import Error from "./pages/Error"
import ErrorComponent from "./components/Error";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop"



import { useAuthContext } from "./Auth/AuthContext"

function App() {
  const { isAuthError, AuthErrorMsg } = useAuthContext()

  // to prevent the bug where the vertical scroll bar is hidden on page load
  useEffect(() => {
    document.body.style.overflowY = "initial";
  }, [])

  return (
    <>
      <Router>
        <React.Suspense fallback={<Loading/>}>
          <Navbar/>

          {isAuthError ? <ErrorComponent errorMessage={AuthErrorMsg}/> : ""}

          <Sidebar/>

          {/* <SearchOverlay/> */}

          <ScrollToTop/>
          
          <Overlay/>

          <Routes>
            {/* All private routes go in here */}
            <Route element={<PrivateRoutes/>}>
              <Route element={<CreateAPost/>} path="/createAPost"/>
              <Route element={<Stats/>} path="/stats"/>
            </Route>

            <Route element={<Home/>} path="/"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<SignUp/>} path="/SignUp"/>
            <Route element={<ForgotPassword/>} path="/forgotPassword"/>
            <Route element={<Author/>} path="/author/:authorId"/>
            <Route element={<Category/>} path="/category/:categoryName"/>
            <Route element={<Post/>} path="/post/:postId"/>
            {/* <Route element={<Search/>} path="/search"/> */}
            <Route element={<LikedPosts/>} path="/likedPosts"/>
 


            <Route element={<Error/>} path="*"/>
          </Routes>
          <Footer/>
        </React.Suspense>
      </Router>
    </>
  )
}

export default App
