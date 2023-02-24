import React from 'react'

import testImg from "../../../assets/images/testImg1.jpg"
import { FaComment } from "react-icons/fa"
import { Link } from 'react-router-dom'

// components
import Tag from '../Tag'
import Date from '../Date'

const PostPreviewRowBig = (props) => {
  /* The articleTextCutoff number is based on how good
  this amount of characters looks in the layout & the effects the layout */
  const [articleTextCutoff, setArticleTextCutoff] = React.useState(160)
  let testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <section className={`flex ${props.direction ? props.direction : "flex-row"} gap-6`}>
        <Link to="/link to post" className=''>
            <img src={testImg} alt="alt text here" className='w-full rounded-lg'/>
        </Link>
        <div>
            <header className='flex items-center'>
                <Tag {...{bgColor:"#ccc", link:"/tag link here", text:"text here"}}/>
                <div className='mx-2'>
                    <Date/>
                </div>
                <div className='relative flex items-center text-gray-500'>
                    <div className='relative'>
                        <FaComment className='text-xs mr-1'/>
                    </div>
                    <div className='relative top-[-1px]'>0</div>
                </div>
            </header>
            <Link to="/link to post here">
                <h2 className='text-2xl font-medium my-2'>article title  goes here</h2>
            </Link>
            <p>{testText.length > articleTextCutoff ? `${testText.slice(0, articleTextCutoff)}...` : testText}</p>
        </div>
    </section>
  )
}

export default PostPreviewRowBig