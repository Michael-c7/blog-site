import React, { useEffect, useState } from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'

import { useBlogContext } from '../contexts/blog_context'

import { useParams } from 'react-router-dom';


const Category = () => {
  const { 
    paginatedBlogPosts,
    POSTS_PER_PAGE,
    currentGeneralPagePosts,
    paginationDotsLoaded,
    setPaginationDotsLoaded,
    getPostsByProperty,
  } = useBlogContext()

  const { categoryName } = useParams();

  let [currentPageNumber, setCurrentPageNumber] = React.useState(1)
  let paginationDotAmount = Math.ceil(paginatedBlogPosts.length / POSTS_PER_PAGE)
  let [currentCategory, setCurrentCategory] = useState(null)


  useEffect(() => {
    setCurrentCategory(categoryName)
  }, [])


  useEffect(() => {
    getPostsByProperty("tag", currentCategory, currentPageNumber)
  }, [currentCategory, currentPageNumber])

  useEffect(() => {
    // reset so if we go to another will still work
    if(paginationDotsLoaded) {
      setPaginationDotsLoaded(false)
    }
  }, [paginationDotsLoaded])


  return (
    <>
      <GeneralPageComponent {...{headingText:currentCategory ? currentCategory : "name unknown", paginationDotAmount, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts }}/>
    </>
  )
}

export default Category