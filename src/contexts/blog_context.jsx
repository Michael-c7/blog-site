import React, { useContext, useEffect, useState, useReducer } from 'react'
import reducer from '../reducers/blog_reducer'

// import {} from '../actions'
import { useAuthContext } from "../Auth/AuthContext"

const initialState = {
}

import { AppAuth, db } from "../Auth/firebase"

import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { useNavigate, redirect, Navigate, } from "react-router-dom";

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
  const [currentUserName, setCurrentUsername] = useState("")
  const [currentDisplayName, setCurrentDisplayName] = useState("")
  const [currentPostComments, setCurrentPostComments] = useState([])

  const [isCurrentPostLoading, setIsCurrentPostLoading] = useState(true)


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

  const getUserInfoFromUid = async (userUid) => {
      // get username and display name
      const docRef1 = doc(db, "users", userUid);
      const docSnap1 = await getDoc(docRef1);
      
      setCurrentUsername(docSnap1.data().username)
      setCurrentDisplayName(docSnap1.data().displayName)
  }

  useEffect(() => {
    getUserInfoFromUid(user?.uid)
  },[user])



  const getPost = async (postId) => {
    // complete data is all the data need for the post
    let completeData = {}

    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    setIsCurrentPostLoading(true)

    if (docSnap.exists()) {
      // get username
      const docRef1 = doc(db, "users", docSnap.data().authorUid);
      const docSnap1 = await getDoc(docRef1);

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
        displayName:docSnap1.data().displayName,
        authorUid:docSnap.data().authorUid,
        altText:docSnap.data().altText,
        likes:docSnap.data().likes,
      }
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setIsCurrentPostLoading(false)
    }

    // console.log(completeData)
    setCurrentPost(completeData)
    setIsCurrentPostLoading(false)
  }



  const createPostComment = async (postId, commentData) => {
    const docRef = doc(db, "postComments", postId);
    const docSnap = await getDoc(docRef);
      
    if(docSnap.exists()) {
      /*get all old post de stringify
      combine w/ current / new post re-stringify and send to the place
      in an array of objects*/
      let oldData = JSON.parse(docSnap.data().comments)
      let newData = JSON.stringify([...oldData, commentData])
      await setDoc(doc(db, "postComments", postId), {comments:newData});
    } else {
      // new one here, so just create new doc of an array w/ the object data and post it
      console.log("No such document!");
      let comments = JSON.stringify([commentData])
      await setDoc(doc(db, "postComments", postId), {comments});
    }
  }

  const getPostComments = async (postId) => {
    const docRef = doc(db, "postComments", postId);
    const docSnap = await getDoc(docRef);
    // console.log(JSON.parse(docSnap.data().comments))
    if(docSnap.exists()) {
      setCurrentPostComments(JSON.parse(docSnap.data().comments))
    }
  }



  const editPostComment = async (postId, editedData) => {
    await setDoc(doc(db, "postComments", postId), {comments:JSON.stringify(editedData)});
  }


  const deletePostComment = async (postId, updatedData) => {
    await setDoc(doc(db, "postComments", postId), {comments:JSON.stringify(updatedData)});
  }



  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  }




  const togglePostLike = async (postId, likeData) => {  
    /* in the posts collection, all the user who've liked this post */
    const docRef = doc(db, "posts", postId);
    setDoc(docRef, { likes: likeData }, { merge: true });
    /* in the likedPosts collection --> authorUid --> array of 
    all the posts they've liked */
    const docRef1 = doc(db, "likedPosts", user.uid);
    setDoc(docRef1, { likes: likeData });
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


  // after everything else is done do stuff for /stats here


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
        getUserInfoFromUid,
        currentUserName,
        currentDisplayName,
        createPostComment,
        getPostComments,
        currentPostComments,
        editPostComment,
        deletePostComment,
        deletePost,
        isCurrentPostLoading,
        togglePostLike,
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