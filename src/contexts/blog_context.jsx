import React, { useContext, useEffect, useState, useReducer } from 'react'
import reducer from '../reducers/blog_reducer'

// import {} from '../actions'
import { useAuthContext } from "../Auth/AuthContext"

const initialState = {
}

import { AppAuth, db } from "../Auth/firebase"

import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

import { getDateFromTime } from "../utility/misc"

const BlogContext = React.createContext()


export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const { user } = useAuthContext()
  // const navigate = useNavigate();

  // const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [ErrorMsg, setRErrorMsg] = useState("")
  const [currentPost, setCurrentPost] = useState({})


  const testFunc3 = _ => {
    console.log('test func from blog context')
  }


  const createPost = async (postData) => {
    // Add a new document in collection "posts"
    await setDoc(doc(db, "posts", postData.postId), postData);
    console.log("create post form blog context")
    console.log(postData)

    // to go the post i just made
    // navigate(`/post/${postId}`);
  }



  const getPost = async (postId) => {
    // complete data is all the data need for the post
    let completeData = {}

    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);



    if (docSnap.exists()) {
      // get username
      const docRef1 = doc(db, "users", docSnap.data().authorUid);
      const docSnap1 = await getDoc(docRef1);

      // get display name
      const docRef2 = doc(db, "usernames", docSnap1.data().username);
      const docSnap2 = await getDoc(docRef2);

      completeData = {
        postId:docSnap.data().postId,
        image:docSnap.data().image,
        title:docSnap.data().title,
        text:docSnap.data().text,
        tag:docSnap.data().tag,
        // for the createdAt use the function to convert to readable date
        createdAt:getDateFromTime(docSnap.data().createdAt.nanoseconds, docSnap.data().createdAt.seconds),
        // for authorUid use function to get the display name and username
        username:docSnap1.data().username,
        displayName:docSnap2.data().displayName,
        authorUid:docSnap.data().authorUid,
        altText:docSnap.data().altText,
        
      }
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // console.log(completeData)
    setCurrentPost(completeData)
  }




  const deletePost = (postId) => {

  }

  const likePost = (postId, userUid) => {

  }


  const createPostComment = (commentInfo) => {

  }

  const EditPostComment = (postCommentId, updatedInfo) => {

  }

  const DeletePostComment = (postCommentId) => {

  }




  const getLikedPosts = () => {
    // get all posts liked by the current user, for the /likedPosts page
  }

  const getAuthorsPosts = (userUid,username) => {
    /*get all the posts by the user 
    (for when you click on a user profile),
    for /author page */
  }

  const getCategoryPosts = (category) => {
    /*get all posts that belong to a certain category, eg: science,food,ect...
    for the /category page
    */
  }

  const getSearchPosts = (searchTerm) => {
    /*returns all the posts that that have the search term eg: sonic, n64,ect..
    for the /search page
    */
  }


  /*also have function for collection of data eg: function to get all
  liked posts(for liked posts page), author posts,ect...
  */

  // put the backend stuff here, createapost,ect...

  return (
    <BlogContext.Provider
      value={{
        ...state,
        testFunc3,
        createPost,
        getPost,
        currentPost,
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