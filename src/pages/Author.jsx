import React, { useEffect, useState } from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'

import { useBlogContext } from '../contexts/blog_context'
import { useParams } from 'react-router-dom'

const Author = () => {
  const { 
    paginatedBlogPosts,
    POSTS_PER_PAGE,
    currentGeneralPagePosts,
    paginationDotsLoaded,
    setPaginationDotsLoaded,
    getPostsByProperty,
  } = useBlogContext()

  let { authorId } = useParams()
  
  let [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  let paginationDotAmount = Math.ceil(paginatedBlogPosts.length / POSTS_PER_PAGE)
  let [authorDisplayName, setAuthorDisplayName] = useState("")


  // get the posts
  useEffect(() => {  
    getPostsByProperty("username", authorId, currentPageNumber)
  }, [currentPageNumber])


  // get the displayname
  useEffect(() => {
    setAuthorDisplayName(currentGeneralPagePosts[0]?.displayName)
  }, [currentGeneralPagePosts])

  // reset so if we go to another page will still work
  useEffect(() => {
    if(paginationDotsLoaded) {
      setPaginationDotsLoaded(false)
    }
  }, [paginationDotsLoaded])


  return (
    <>
      <GeneralPageComponent {...{headingText:authorDisplayName ? authorDisplayName : "name unknown", paginationDotAmount, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts }}/>
    </>
  )
}

export default Author