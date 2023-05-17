import React, { useEffect, useState } from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'

import { useBlogContext } from '../contexts/blog_context'

const Search = () => {
  const { 
    paginatedBlogPosts,
    POSTS_PER_PAGE,
    currentGeneralPagePosts,
    paginationDotsLoaded,
    setPaginationDotsLoaded,
    getPostsByProperty,
    currentSearchTerm,
    getSearchPosts,
  } = useBlogContext()

  let [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  let paginationDotAmount = Math.ceil(paginatedBlogPosts.length / POSTS_PER_PAGE)

  // the history and evolution of Biryani
  useEffect(() => {
    if(currentSearchTerm) {
      getSearchPosts(currentSearchTerm, currentPageNumber)
    }
  }, [currentSearchTerm, currentPageNumber])

  useEffect(() => {
    // reset so if we go to another will still work
    if(paginationDotsLoaded) {
      setPaginationDotsLoaded(false)
    }
  }, [paginationDotsLoaded])

  return (
    <>
      <div className='outer-width mx-auto mt-10'>
        <p className='min-[320px]:text-4xl text-2xl capitalize font-semibold text-gray-500'>results for 
          {/* the search query text goes here */}
          <span className='text-gray-900'> {currentSearchTerm}</span>
        </p>
      </div>
      <GeneralPageComponent {...{isGeneralHeadingShown:false, paginationDotAmount, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts }}/>
    </>
  )
}

export default Search