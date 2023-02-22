import React from 'react'
import Author from './Author'
import Date from './Date'



const AuthorAndDate = (props) => {

  return (
    <div className='flex flex-row flex-wrap items-center min-[425px]:mb-0 mb-2'>
        <Author {...{...props}}/>
        <Date {...{...props}}/>
    </div>
  )
}

export default AuthorAndDate