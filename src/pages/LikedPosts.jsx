import React, { useEffect, useState } from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'


import { useBlogContext } from '../contexts/blog_context'
import { useAuthContext } from "../Auth/AuthContext"

const LikedPosts = () => {
  const { 
    getLikedPostsIds,
    currentUsersLikedPosts,
    POSTS_PER_PAGE,
    getPaginatedDataFromDB,
    currentGeneralPagePosts,
    paginationDotsLoaded,
    setPaginationDotsLoaded,
  } = useBlogContext()

  const { user } = useAuthContext()



  let [currentPageNumber, setCurrentPageNumber] = React.useState(0)
  let postAmtToGetEnd = POSTS_PER_PAGE * currentPageNumber
  let postAmtToGetStart = postAmtToGetEnd - POSTS_PER_PAGE

  let paginationDotAmount = Math.ceil(currentUsersLikedPosts.length / POSTS_PER_PAGE)
  let [currentIdsToGet, setCurrentIdsToGet] = useState([])

  let [postsData, setPostsData] = useState([])



  useEffect(() => {
    try {
      getLikedPostsIds(user?.uid)
    } catch(error) {
      console.log(error)
    }
  }, [user])


  useEffect(() => {
    setCurrentIdsToGet(currentUsersLikedPosts.slice(postAmtToGetStart, postAmtToGetEnd))
  }, [paginationDotsLoaded, currentPageNumber])


  // get the data thats return then set the local state
  useEffect(() => {
    getPaginatedDataFromDB(["posts"], currentIdsToGet)
  }, [paginationDotsLoaded,currentIdsToGet])




  useEffect(() => {
    setCurrentPageNumber(1)
  }, [])

  useEffect(() => {
    // reset so if we go to another will will still work
    if(paginationDotsLoaded) {
      setPaginationDotsLoaded(false)
    }

  }, [paginationDotsLoaded])



  
  if(currentIdsToGet.length <= 0) {
    return (
      <h1 className=' text-5xl p-4'>Loading...</h1>
    )
  }

  return (
    <>
      <GeneralPageComponent {...{headingText:"Liked posts", paginationDotAmount, postsData, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts }}/>
    </>
  )
}

export default LikedPosts