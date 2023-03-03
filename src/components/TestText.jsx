import React from 'react'

/*
Just a bunch of lorem ipsum to test various functionality,
delete after app is done
*/

/**
 * 
 * @param {number} param0 - the amount of paragraphs of text, default is 10
 * @returns 
 */
const TestText = ({amount}) => {
  let textAmount = Array.from({ length:amount ? amount : 10 })

  return (
    <div className='w-full mx-auto'>
        {textAmount.map((_, index) => {
          return <span key={index}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt blanditiis reiciendis dolore sunt, eum ducimus doloribus consequuntur earum tempore ea? Dolorum magni quae maxime, saepe nostrum facilis impedit debitis dignissimos!</span>
        })}
    </div>
  )
}

export default TestText