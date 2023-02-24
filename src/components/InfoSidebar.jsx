import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
// icons 
import {
    FaBeer,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterest,
    FaTumblr,
    FaRedditAlien,
    FaTwitch,
    FaYoutube,
} from 'react-icons/fa';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"


import PostPreviewRow from "../components/widgets/postPreview/PostPreviewRow"
import PostPreviewTogether from "../components/widgets/postPreview/PostPreviewTogether"

// images
import foodBgImage from "../assets/images/categories/food.jpg"
import gamingBgImage from "../assets/images/categories/gaming.jpg"
import moviesBgImage from "../assets/images/categories/movies.jpg"
import scienceBgImage from "../assets/images/categories/science.jpg"


const InfoSidebar = () => {
    let testRecentArr = Array.from({ length:3 })
    let sliderSlidesArr = Array.from({ length:4 })

    let [sliderCurrentIndex, setSliderCurrentIndex] = React.useState(0)

    const categoriesList = [
        {
            name:"food",
            amount:12,
            bgImg:foodBgImage,
            link:"/category/food"
        },
        {
            name:"gaming",
            amount:8,
            bgImg:gamingBgImage,
            link:"/category/gaming"
        },        {
            name:"Movies",
            amount:4,
            bgImg:moviesBgImage,
            link:"/category/movies"
        },        {
            name:"science",
            amount:7,
            bgImg:scienceBgImage,
            link:"/category/science"
        },
    ]

    const socialMediaGroupList = [
        {
            icon:FaFacebookF,
            iconColor:"#3B5999",
            link:"/",
            followers:24200,
            followerText:"likes",
        },
        {
            icon:FaTwitter,
            iconColor:"#1D9BF0",
            link:"/",
            followers:31500,
            followerText:"followers",
        },
        {
            icon:FaPinterest,
            iconColor:"#E60023",
            link:"/",
            followers:500,
            followerText:"followers",
        },
        {
            icon:FaInstagram,
            iconColor:"#C92E89",
            link:"/",
            followers:18765,
            followerText:"followers",
        },
        {
            icon:FaTumblr,
            iconColor:"#36465D",
            link:"/",
            followers:20500,
            followerText:"followers",
        },
        {
            icon:FaRedditAlien,
            iconColor:"#FF4500",
            link:"/",
            followers:20000,
            followerText:"members",
        },
        {
            icon:FaTwitch,
            iconColor:"#6341A4",
            link:"/",
            followers:12500,
            followerText:"followers",
        },
        {
            icon:FaYoutube,
            iconColor:"#FE2905",
            link:"/",
            followers:15000,
            followerText:"subscribers",
        },
    ]

    const socialMediaNumberFormatter = Intl.NumberFormat("en", {notation:"compact"})


    const prevSlide = _ => {
        if(sliderCurrentIndex === 0) {
              setSliderCurrentIndex(sliderSlidesArr?.length - 1)
            } else {
              setSliderCurrentIndex(sliderCurrentIndex - 1)
            }
    }

    const nextSlide = _ => {
      if(sliderCurrentIndex === sliderSlidesArr?.length - 1) {
        setSliderCurrentIndex(sliderCurrentIndex = sliderCurrentIndex - sliderCurrentIndex)
        } else {
          setSliderCurrentIndex(sliderCurrentIndex = sliderCurrentIndex + 1)
        }
    }


    // auto slider
    React.useEffect(() => {
        let timeout = setTimeout(() => {
            if(sliderCurrentIndex === sliderSlidesArr.length - 1) {
                setSliderCurrentIndex((currentState) => {
                    return currentState = 0
                })
            } else {
                setSliderCurrentIndex((currentState) => {
                    return currentState + 1
                })
            }
        }, 5000)
        // cleanup 
        return (() => {
            clearTimeout(timeout)
        })
    },[sliderCurrentIndex])
    


  return (
    <div className='mb-8 relative'>
        <div className='sticky top-0'>
            {/* social media group */}
            <div className='grid grid-cols-4 grid-rows-2 gap-1'>
                {socialMediaGroupList.map((el, index) => {
                    return (
                        <Link to={el.link} key={index} className=" bg-slate-50 p-3 flex text-center flex-col justify-center center">
                            <el.icon className='self-center text-xl' style={{color:el.iconColor}}/>
                            <div className='text-sm font-bold mt-1'>{socialMediaNumberFormatter.format(el.followers)}</div>
                            <p className='text-xs'>{el.followerText}</p>
                        </Link>
                    )
                })}
            </div>
            {/* categories group */}
            <section className='flex flex-col gap-3 my-10'>
                {categoriesList.map((el, index) => {
                    return (
                        <Link to={`${el.link}`} key={index} className='bg-slate-500 p-4 rounded-xl flex justify-between bg-no-repeat bg-center bg-cover' style={{backgroundImage:`url(${el.bgImg})`, boxShadow:"inset 0px 0px 75px 17px rgba(0,0,0,0.75)"}}>
                            <span className='text-white capitalize'>{el.name}</span>
                            <span className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>{el.amount}</span>
                        </Link>
                    )
                })} 
            </section>
            {/* recent posts */}
            <div>
                <h2 className=' font-semibold text-3xl mb-2'>Recent Posts</h2>
                <div className='flex flex-col gap-6'>
                {testRecentArr.map((el, index) => {
                    return (
                        <PostPreviewRow key={index} direction={"flex-row-reverse"}/>
                        )
                    })}
                </div>
            </div>
            {/* mini slider  */}
            <div className='relative my-8 h-[375px] '>
                <div className='absolute z-30 mt-5 mr-4 right-0 text-white text-xl'>
                    <button onClick={() => prevSlide()} className='bg-[rgba(10,10,10,0.30)] rounded-full p-2 mx-1'>
                        <RiArrowLeftSLine/>
                    </button>
                    <button onClick={() => nextSlide()} className='bg-[rgba(10,10,10,0.30)] rounded-full p-2 mx-1'>
                        <RiArrowRightSLine/>
                    </button>
                </div>
                {/* slides */}
                <div className='w-full h-full relative overflow-hidden rounded-xl'>
                    {/* slide */}
                    {sliderSlidesArr.map((el, index) => {
                        let slidePosition = 'mini-slider--next'

                        if (sliderCurrentIndex === index) {
                        slidePosition = 'mini-slider--current';
                        }
                        if 
                        (sliderCurrentIndex === index - 1 || 
                        (index === 0 && sliderCurrentIndex === sliderSlidesArr.length - 1)
                        ) {
                        slidePosition = 'mini-slider--prev';
                        }

                        return (
                            <div key={index} className={`${slidePosition} opacity-0 transition-all duration-700 absolute w-full h-full top-0`}>
                                <PostPreviewTogether {...{position:"absolute", width:"w-full", height:"h-full"}} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoSidebar