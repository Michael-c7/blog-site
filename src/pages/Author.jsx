import React, { useEffect, useState } from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'

import { useBlogContext } from '../contexts/blog_context'

const Author = () => {
  const { 
    paginatedBlogPosts,
    POSTS_PER_PAGE,
    currentGeneralPagePosts,
    paginationDotsLoaded,
    setPaginationDotsLoaded,
    getPostsByProperty,
    currentDisplayName,
  } = useBlogContext()

  
  let [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  let paginationDotAmount = Math.ceil(paginatedBlogPosts.length / POSTS_PER_PAGE)


  useEffect(() => {
    getPostsByProperty("username", "scifacts", currentPageNumber)
  }, [currentPageNumber])

  useEffect(() => {
    // reset so if we go to another will still work
    if(paginationDotsLoaded) {
      setPaginationDotsLoaded(false)
    }
  }, [paginationDotsLoaded])

  return (
    <>
      <GeneralPageComponent {...{headingText:currentDisplayName ? currentDisplayName : "name unknown", paginationDotAmount, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts }}/>
    </>
  )
}

export default Author