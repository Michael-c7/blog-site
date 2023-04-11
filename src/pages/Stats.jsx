import React from 'react'
import GeneralHeading from '../components/GeneralHeading'

import { socialMediaNumberFormatter } from '../utility/misc'

import { 
  FaComment,
  FaHeart,
  FaEye,
  FaUserFriends,
} from "react-icons/fa"


const Stats = () => {

  let [dataSelectTime, setDataSelectTime] = React.useState("all-time")

  return (
    <div className="bg-gray-200">
      <GeneralHeading/>
      <div className="outer-width mx-auto">
        {/* select time*/}
        <div className={`flex gap-8 relative pb-0 pt-12 px-2 min-[425px]:flex-row flex-col`}>
          <button className={`${dataSelectTime === "last-24-hours" ? "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => setDataSelectTime("last-24-hours")}>Last 24 hours</button>
          <button className={`${dataSelectTime === "last-month" ?    "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => setDataSelectTime("last-month")}>Last Month</button>
          <button className={`${dataSelectTime === "last-year" ?     "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => setDataSelectTime("last-year")}>Last Year</button>
          <button className={`${dataSelectTime === "all-time" ?      "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => setDataSelectTime("all-time")}>All Time</button>
        </div>
        {/* All time data */}
        <ul className="flex lg:gap-12 gap-2 py-12 flex-1 md:flex-row flex-col">
          {/* total views, total likes, total comments, 
          total interactions(views, likes,comments all together) */}
          <li className="bg-white flex gap-4 items-center p-4 flex-1">
            <div className="bg-gray-100 rounded-full w-12 h-12 text-2xl flex justify-center items-center">
              <FaEye/>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm font-semibold">Total Views</p>
              <h2 className="text-4xl font-bold">300k</h2>
            </div>
          </li>
          <li className="bg-white flex gap-4 items-center p-4 flex-1">
            <div className="bg-gray-100 rounded-full w-12 h-12 text-2xl flex justify-center items-center">
              <FaHeart/>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm font-semibold">Total Likes</p>
              <h2 className="text-4xl font-bold">200k</h2>
            </div>
          </li>
          <li className="bg-white flex gap-4 items-center p-4 flex-1">
            <div className="bg-gray-100 rounded-full w-12 h-12 text-2xl flex justify-center items-center">
              <FaComment/>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm font-semibold">Total Comments</p>
              <h2 className="text-4xl font-bold">100k</h2>
            </div>
          </li>
          <li className="bg-white flex gap-4 items-center p-4 flex-1">
            <div className="bg-gray-100 rounded-full w-12 h-12 text-2xl flex justify-center items-center">
              <FaUserFriends/>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm font-semibold">Total Interactions</p>
              <h2 className="text-4xl font-bold">400k</h2>
            </div>
          </li>
        </ul>
        <div className="py-12">
          {/* bar chart of view by time period, (24hr, month,year,all time)*/}
          <div>

          </div>
          {/* map of the world w/ where views are from like in example but w/ views */}
          <div>
            
          </div>
        </div>
        <div>
          {/* horizontal bar of time zones (top 5 / 10) */}

          {/* pie chart that show amt of view,comment,comments
          by category select to show what yo want
          eg: select views in dropdown to get info on
          your post based on views by category */}
        </div>

        <div>
          {/* searchable table w/ all posts that can be filter by most view,category,ect... */}
        </div>
      </div>
    </div>
  )
}

export default Stats