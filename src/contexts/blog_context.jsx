import React, { useContext, useEffect, useState, useReducer } from 'react'
import reducer from '../reducers/blog_reducer'

// import {} from '../actions'
import { useAuthContext } from "../Auth/AuthContext"

const initialState = {
}

import { AppAuth, db } from "../Auth/firebase"

import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, query, where,orderBy, limit, } from "firebase/firestore"; 
import { useNavigate, redirect, Navigate, } from "react-router-dom";

import { getDateFromTime } from "../utility/misc"

const BlogContext = React.createContext()


export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { user } = useAuthContext()

  // error handling
  const [isError, setIsError] = useState(false)
  const [ErrorMsg, setErrorMsg] = useState("")

  // current post data
  const [currentPost, setCurrentPost] = useState({})
  const [currentUserName, setCurrentUsername] = useState("")
  const [currentDisplayName, setCurrentDisplayName] = useState("")
  const [currentPostComments, setCurrentPostComments] = useState([])
  const [isCurrentPostLoading, setIsCurrentPostLoading] = useState(true)

  const [paginatedBlogPosts, setPaginatedBlogPosts] = useState([])


  // post view data
  const [currentPostViews, setCurrentPostViews] = useState(0)
  const [postIdExistsInViewsDatabase, setPostIdExistsInViewsDatabase] = useState(true)
  const [oldPostMetaData, setOldPostMeteData] = useState([])


  // for pagination
  const POSTS_PER_PAGE = 10; // Number of documents / blog posts per page
  let [currentGeneralPagePosts, setCurrentGeneralPagePosts] = useState([])

  let [paginationDotsLoaded, setPaginationDotsLoaded] = useState(false)

  let [currentSearchTerm, setCurrentSearchTerm] = useState("")



  const createPost = async (postData) => {
    // Add a new document in collection "posts"
    await setDoc(doc(db, "posts", postData.postId), postData);
  }

  const getUserInfoFromUid = async (userUid) => {
      // get username and display name
      const docRef1 = doc(db, "users", userUid);
      const docSnap1 = await getDoc(docRef1);
      // console.log(docSnap1.data().username)
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
      setIsCurrentPostLoading(false)
    }
    setCurrentPost(completeData)
    setIsCurrentPostLoading(false)
  }


  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    // delete the views and view metadata associated w/ the post
    deletePostViewData(postId)
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
      // no previous data to add to, so just create new doc of an array w/ the object data and post it
      let comments = JSON.stringify([commentData])
      await setDoc(doc(db, "postComments", postId), {comments});
    }
  }

  const getPostComments = async (postId) => {
    const docRef = doc(db, "postComments", postId);
    const docSnap = await getDoc(docRef);
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



  const togglePostLike = async (postId, likeData, userUid, likedPostsData) => {  
    /* in the posts collection, all the user who've liked this post */
    const docRef = doc(db, "posts", postId);
    setDoc(docRef, { likes: likeData }, { merge: true });
    /*array of all the posts that liked */
    // const docRef1 = doc(db, "likedPosts", user.uid);
    // setDoc(docRef1, { likes: [...oldPostIdsArr, postId] });



    // get all the old likedPosts for this user then do -->  [...oldPostIdsArr, postId]
    const docRef1 = doc(db, "likedPosts", userUid);
    setDoc(docRef1, { likes: likedPostsData }, { merge: true });
  }





  const getPostViewData = async (postId) => {
    const docRef = doc(db, "postViewData", postId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      setCurrentPostViews(docSnap.data().viewCount)
      // set the old meta data, so i can merge it w/ the new meta data later
      setOldPostMeteData(docSnap.data().viewMetaData)

      setPostIdExistsInViewsDatabase(true)
    } else {
      setCurrentPostViews(0)
      setPostIdExistsInViewsDatabase(false)
      // data doesn't exists
    }
  }


  const addPostViewData = async (postId, postAuthorUserUid, viewCount, viewMetaData) => {
      setPostIdExistsInViewsDatabase(true)

      await setDoc(doc(db, "postViewData", postId), {
        postAuthorUserUid,
        viewCount,
        viewMetaData:[...oldPostMetaData, JSON.stringify(viewMetaData)],
      }, { merge: true });
    
  }


  // when you delete a post should delete the postViewData associated w/ it
  const deletePostViewData = async (postId) => {
    await deleteDoc(doc(db, "postViewData", postId));
  }

/**
 * 
 * @param {Array} databasePath eg: ["posts"] or ["likedPosts", user.uid]
 * @param {Array} dataToGet array of document id's to get
 */
  const getPaginatedDataFromDB = async (databasePath, dataToGet) => {
    const docsSnapshot = await getDocs(query(collection(db, ...databasePath), where('__name__', 'in', dataToGet)));
    const matchingDocs = docsSnapshot.docs;
    
    setCurrentGeneralPagePosts(matchingDocs.map((el) => el.data()))
    // console.log(matchingDocs) // an array of DocumentSnapshot objects representing the requested documents
  } 


  /**
   * 
   * @param {Array} databasePath eg: ["posts"] or ["likedPosts", user.uid]
   * @param {Array} UidPropertyPath thh Property path for the array of uids to get eg: in this the propertyPath would just the "likes" --> docSnap.data().likes for the argument should be like eg: [john, userData, likes]
   */
  const getPostsFromUids = async (databasePath, UidsPropertyPath) => {
    const docRef = doc(db, ...databasePath);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      let uidsForPosts = UidsPropertyPath.reduce((acc, curr) => acc[curr], docSnap.data());
      setPaginatedBlogPosts(uidsForPosts)
      /* This is here so i can load the first set
      of blog posts when the pagination dots are loaded */
      setPaginationDotsLoaded(true)
    }
  }




  const getPostsByProperty = async (propertyName, propertyValue, pageNumber) => {
    const postsRef = collection(db, "posts");

    // get the posts
    const queryRef = query(
      postsRef,
      where(propertyName, "==", propertyValue),
      orderBy("createdAt"),
      limit(POSTS_PER_PAGE * pageNumber)
    );
    
    const querySnapshot = await getDocs(queryRef);
    /*The querySnapshot is all the previous and current data
      then the slice removes the previous data so we're left w/ the current data.
      This will not scale well however cant find a better solution native to firebase*/
    const posts = querySnapshot.docs.map((doc) => doc.data()).slice(pageNumber <= 1 ? 0 : (POSTS_PER_PAGE * pageNumber) - POSTS_PER_PAGE, POSTS_PER_PAGE * pageNumber);
    setCurrentGeneralPagePosts(posts);
    console.log(posts)
    
    // get the amount of posts for the pagination posts
    const totalQueryRef = query(postsRef, where(propertyName, "==", propertyValue));
    const totalPosts = (await getDocs(totalQueryRef)).size;
    // set the total posts
    setPaginatedBlogPosts(Array.from({length: totalPosts}))
    setPaginationDotsLoaded(true)
  }





  const getSearchPosts = async (searchTerm, currentPageNumber) => {
    /* can't find good in-the box solution for this w/ firebase for i think i will...
        1. get all post title and put them in an array,
        2. split all the posts titles and split them into words eg: searchTerm.split(" ")
        3. return in limits of 10 posts, very similar to how i did /likePosts 
    */
   
  
    // get all posts, (Yikes)
    const postsRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postsRef);


    const titles = [];
  
    // get the all the titles and postId's from the posts
    querySnapshot.forEach((doc) => {
      const title = doc.data().title;
      const postId = doc.data().postId;
      titles.push({title, postId});
    });



// BUG IS HERE I THINK
    /* Compare the words in the titles array
    and the words in the searchTerm */
    const result = [];
    for (let i = 0; i < titles.length; i++) {
      const titleWords = titles[i].title.toLowerCase().split(" ");
      for (let j = 0; j < searchTerm.length; j++) {
        if (titleWords.includes(searchTerm[j].toLowerCase())) {
          result.push(titles[i]);
          break;
        }
      }
    }

    console.log(titles)


    // now set the pagination ect...
    // let postAmtToGetEnd = POSTS_PER_PAGE * currentPageNumber
    // let postAmtToGetStart = postAmtToGetEnd - POSTS_PER_PAGE
    // let resultsPaginated = result.slice(postAmtToGetStart, postAmtToGetEnd)
    // setPaginatedBlogPosts(result)
    // setPaginationDotsLoaded(true)
    

    // get post data from the postIds in the current page
    // let postObjects  = []

    // for (const post of resultsPaginated) {
    //   if (post.postId) {
    //     const postRef = doc(db, 'posts', post.postId);
    //     const postDoc = await getDoc(postRef);
    //     const postObject = postDoc.data();
    //     postObjects.push(postObject);
    //   }
    // }

    // setCurrentGeneralPagePosts(postObjects)
  }

  
  
  /**
   * 
   * @param {Array} postIdsArr - an array of the post ids you to use to get the associated post data 
   */
  const getPostsByIds = async (postIdsArr)  => {
    const postsData = []

    for (const postId of postIdsArr) {
      const postRef = doc(collection(db, 'posts'), postId);
      const postSnapshot = await getDoc(postRef);

      if(postSnapshot.exists()) {
        const postData = postSnapshot.data();
        postsData.push(postData);
      }
    }

    return postsData
  }


  // recent posts, so get most recent posts
    // this will be in footer & infosidebar

  // top of the week, get most viewed posts by within a certain date,
  // or could change it to be all time highest viewed post


  return (
    <BlogContext.Provider
      value={{
        ...state,
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
        currentPostViews,
        postIdExistsInViewsDatabase,
        getPostViewData,
        addPostViewData,
        deletePostViewData,

        getPostsFromUids,
        paginatedBlogPosts,
        POSTS_PER_PAGE,
        getPaginatedDataFromDB,
        currentGeneralPagePosts,

        paginationDotsLoaded,
        setPaginationDotsLoaded,

        getPostsByProperty,

        currentSearchTerm,
        setCurrentSearchTerm,
        getSearchPosts,

        getPostsByIds,
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