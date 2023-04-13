import React, { useEffect } from 'react'
import GeneralHeading from '../components/GeneralHeading'

import { socialMediaNumberFormatter } from '../utility/misc'

import { getAllCategories, getAllCategoryBgColors } from "../utility/reusable"

import { 
  FaComment,
  FaHeart,
  FaEye,
  FaUserFriends,
  FaSearch,
} from "react-icons/fa"


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Bar, Pie } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

import * as ChartGeo from 'chartjs-chart-geo'
// import Chart from 'chart.js/auto';
import { Chart } from 'chart.js';
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';

// register controller in chart.js and ensure the defaults are set
// Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChoroplethController, GeoFeature, ColorScale, ProjectionScale,
);

// in pixels, 1rem = 16px
let oneRemInPixels = 16
let chartPadding = {
  left:oneRemInPixels * 2,
  right:oneRemInPixels * 2,
  bottom:oneRemInPixels * 2,
  top:oneRemInPixels * 2,
}



// views bar graph stuff(vertical bar graph)
export const viewsBarGraphOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display:false,
    },
    title: {
      display: false,
      text: 'Views over time',
    },
  },
  layout: {
    padding: {
      left:chartPadding.left,
      right:chartPadding.right,
      bottom:chartPadding.bottom,
      top:chartPadding.top,
    }
  }
};



// horizontal bar card (side to side)
export const horizontalBarGraphOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      display:false,
    },
    title: {
      display: false,
      text: 'Views by time zone',
    },
  },
  layout: {
    padding: {
      left:chartPadding.left,
      right:chartPadding.right,
      bottom:chartPadding.bottom,
      top:chartPadding.top,
    }
  }
};

// pie chart options
export const pieChartOptions = {
  layout: {
    padding: {
      left:chartPadding.left,
      right:chartPadding.right,
      bottom:chartPadding.bottom,
      top:20,
    }
  }
}


// world map options
export const worldMapOptions = {
  
}




const Stats = () => {
  // utils vars
  let timeArr = ["12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm"]
  let daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let yearsArr = [new Date().getFullYear() - 4, new Date().getFullYear() - 3, new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()]

  let timeZoneArr = ['Asia/Tokyo', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Dubai',  'Europe/London', 'Europe/Paris', 'Europe/Moscow',  'America/New_York', 'America/Chicago', 'America/Los_Angeles',  'Australia/Sydney', 'Australia/Adelaide', 'Australia/Perth',]

  let categoryArr = getAllCategories()
  let categoryBgColorsArr = getAllCategoryBgColors()



  // state
  let [dataSelectTime, setDataSelectTime] = React.useState("last-year") 
  let [dataTimeLabels, setDataTimeLabels] = React.useState(monthsArr)
  let [isWorldMapLoaded, setWorldMapLoaded] = React.useState(false)
  let [worldMapData, setWorldMapData] = React.useState("")


  // views bar graph
  const viewBarGraphData = {
  labels:dataTimeLabels,
  datasets: [
    {
      label: 'Views bar graph',
      data: dataTimeLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(32, 162, 235, 0.5)',
    },
  ],
};


// horizontal bar graph
const horizontalBarGraphData = {
  labels:timeZoneArr,
  datasets: [
    {
      label: 'Dataset 1',
      
      data: timeZoneArr.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// pie chart
const pieChartData = {
  labels: categoryArr,
  datasets: [
    {
      label: '# of Votes',
      data: categoryArr.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor:[
        "rgb(32,191,107)",
        "rgb(235,59,90)",
        "rgb(55,66,250)",
        "rgb(165,94,234)",
        "rgb(249,127,81)",
      ],

      borderColor:[
        "rgb(32,191,107)",
        "rgb(235,59,90)",
        "rgb(55,66,250)",
        "rgb(165,94,234)",
        "rgb(249,127,81)",
      ],
      borderWidth: 1,
    },
  ],
};


// 




// Fetch data and create chart using useEffect hook
useEffect(() => {
  let isCanceled = false; // variable to keep track of whether component is unmounted before chart is created
  setWorldMapLoaded(false); // set state variable to false before fetching data

  // Fetch geographical data
  fetch('https://cdn.jsdelivr.net/npm/world-atlas/countries-50m.json')
    .then((r) => r.json())
    .then((data) => {
      const countries = ChartGeo.topojson.feature(data, data.objects.countries).features; // process data to get country features

      if (!isCanceled) {
        // Create chart using Chart.js library
        const myChart = new Chart(document.getElementById('canvas-world-map').getContext('2d'), {
          type: 'choropleth',
          data: {
            labels: countries.map((d) => d.properties.name),
            datasets: [
              {
                label: 'Countries',
                data: countries.map((d) => ({
                  feature: d,
                  value: faker.datatype.number({ min: 0, max: 1000 }), // set random value for each country
                })),
              },
            ],
          },
          options: {
            showOutline: true,
            showGraticule: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              projection: {
                axis: 'x',
                projection: 'equalEarth',
              },
            },
          },
        });
      }
    })
    .catch((error) => {
      if(!isCanceled) {
        console.error(error); // log error to console
      }
    });

  setWorldMapLoaded(true); // set state variable to true after chart is created

  return () => {
    isCanceled = true; // cleanup function to set isCanceled to true when component is unmounted
  };
}, []);




  // a temp var for the actual users name
  let tempUsername = "username here"

  return (
    <div className="bg-gray-200">
      <GeneralHeading text={`${tempUsername ? tempUsername : "unknown"}'s Stats`}/>
      <div className="outer-width mx-auto">
        {/* select time*/}
        <div className={`flex gap-8 relative pb-0 pt-12 px-2 min-[425px]:flex-row flex-col`}>
          <button className={`${dataSelectTime === "last-24-hours" ? "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => {
            setDataSelectTime("last-24-hours") 
            setDataTimeLabels(timeArr)
            }}>Last 24 hours</button>
          <button className={`${dataSelectTime === "last-week" ? "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => {
            setDataSelectTime("last-week")
            setDataTimeLabels(daysArr)
          }}>Last Week</button>
          <button className={`${dataSelectTime === "last-year" ? "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => {
            setDataSelectTime("last-year")
            setDataTimeLabels(monthsArr)
          }}>Last Year</button>
          <button className={`${dataSelectTime === "all-time" ? "relative before:content-[''] before:absolute before:bg-blue-600 before:h-[3px] min-[425px]:before:left-[-0.5rem] before:left-[0rem] before:bottom-[-0.25rem] min-[425px]:before:w-[calc(100%_+_1rem)] before:w-full text-blue-600" : "text-gray-700"}`} onClick={() => {
            setDataSelectTime("all-time")
            setDataTimeLabels(yearsArr)
          }}>All Time</button>
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

        <div className="bg-white p-4">
          <h2 className="text-3xl font-semibold pb-8 pt-6 px-4">Views by Country</h2>
          {isWorldMapLoaded ? <canvas id="canvas-world-map"></canvas> : <h2 className="text-center text-4xl">Loading...</h2>}
        </div>

        <div className="py-12 flex gap-14">
          <div className="flex-1 flex flex-col gap-y-8">
            <div className="bg-white h-1/2">
              <h2 className="text-xl font-semibold p-4">Views over time</h2>
              <Bar options={viewsBarGraphOptions} data={viewBarGraphData}/>
            </div>
            <div className="bg-white h-1/2">
              <header className="text-xl font-semibold p-4">
                <h2 className="text-xl font-semibold">Views by time zone</h2>
              </header>
              <Bar options={horizontalBarGraphOptions} data={horizontalBarGraphData} />
            </div>
          </div>
          <div className="flex-1 bg-white ">
            <div className="flex justify-between p-4">
              <h2 className=" text-xl font-semibold">Breakdown by Category</h2>
              <select className=" border-[1px] border-black">
                <option value="views">Views</option>
                <option value="likes">Likes</option>
                <option value="comments">Comments</option>
              </select>
            </div>
            <Pie options={pieChartOptions} data={pieChartData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats