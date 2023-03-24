import React from 'react'
import GeneralPageComponent from '../components/GeneralPageComponent'

const Search = () => {
  return (
    <>
      <div className='outer-width mx-auto mt-10'>
        <p className='min-[320px]:text-4xl text-2xl capitalize font-semibold text-gray-500'>results for 
          {/* the search query text goes here */}
          <span className='text-gray-900'> games</span>
        </p>
      </div>
      <GeneralPageComponent {...{isGeneralHeadingShown:false}}/>
    </>
  )
}

export default Search