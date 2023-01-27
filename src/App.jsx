import { useState } from 'react'

import { useStandardContext } from './contexts/standard_context'
import { useBlogContext } from './contexts/blog_context'

function App() {
  const { testFunc2 } = useStandardContext()
  const { testFunc3 } = useBlogContext()

  testFunc2()
  testFunc3()

  return (
    <div className='text-2xl font-bold underline'>
      <h2 className="m-4">before auth</h2>
    </div>
  )
}

export default App
