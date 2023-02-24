import React, { useState, useEffect, useRef } from 'react'


// components
import HeroSlider from '../components/HeroSlider'
import EditorsChoice from '../components/EditorsChoice'
import TopOfTheWeek from '../components/TopOfTheWeek'
import MoreArticles from '../components/MoreArticles'


const Home = () => {
  return (
    <div className='outer-width mx-auto'>
      <HeroSlider/>
      <EditorsChoice/>
      <TopOfTheWeek/>
      <MoreArticles/>
    </div>
  )
}

export default Home