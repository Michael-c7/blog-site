import React, { useState, useEffect, useRef } from 'react'


// components
import HeroSlider from '../components/HeroSlider'
import EditorsChoice from '../components/EditorsChoice'
import TopOfTheWeek from '../components/TopOfTheWeek'

const Home = () => {
  return (
    <div className='outer-width mx-auto'>
      <HeroSlider/>
      <EditorsChoice/>
      <TopOfTheWeek/>
    </div>
  )
}

export default Home