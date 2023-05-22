import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { socialMediaNumberFormatter } from "../utility/misc";
import { useBlogContext } from "../contexts/blog_context";
import { getAllCategories } from "../utility/reusable";
// icons 
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterest,
    FaTumblr,
    FaRedditAlien,
    FaTwitch,
    FaYoutube,
} from "react-icons/fa";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"


import PostPreviewRow from "../components/widgets/postPreview/PostPreviewRow"
import PostPreviewTogether from "../components/widgets/postPreview/PostPreviewTogether"

// images
import foodBgImage from "../assets/images/categories/food.jpg"
import gamingBgImage from "../assets/images/categories/gaming.jpg"
import moviesBgImage from "../assets/images/categories/movies.jpg"
import scienceBgImage from "../assets/images/categories/science.jpg"



const InfoSidebar = (props) => {
    const { getPostsByIds, getMostRecentPosts, getAllCategoriesAndCategoryAmount } = useBlogContext()
    let [sliderCurrentIndex, setSliderCurrentIndex] = useState(0)
    let [sliderPostData, setSliderPostData] = useState([])
    let [recentPostsData, setRecentPostsData] = useState([])
    let [categories, setCategories] = useState([])
    let [categoriesList, setCategoryList] = useState([])

    const categoriesImageMap = {
        movies: moviesBgImage,
        science: scienceBgImage,
        food:foodBgImage,
        gaming:gamingBgImage,
    }


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
            followerText:"followers",
        },
    ]


    let infoSidebarSliderIds = [
        "672115e6-6bab-489c-b141-bfeec7dd6d7d",
        "9ca69349-a22e-41b3-aeb5-a2e44a94dbc6",
        "8ce51437-96c0-49ad-9994-23da3505bd73",
        "bdba4736-66db-4abc-b7e4-b4cf8c94a5e0",
    ]

    useEffect(() => {
        getPostsByIds(infoSidebarSliderIds).then((data) => setSliderPostData(data))
    }, [])


    const prevSlide = _ => {
        if(sliderCurrentIndex === 0) {
              setSliderCurrentIndex(sliderPostData?.length - 1)
            } else {
              setSliderCurrentIndex(sliderCurrentIndex - 1)
            }
    }

    const nextSlide = _ => {
      if(sliderCurrentIndex === sliderPostData?.length - 1) {
        setSliderCurrentIndex(sliderCurrentIndex = sliderCurrentIndex - sliderCurrentIndex)
        } else {
          setSliderCurrentIndex(sliderCurrentIndex = sliderCurrentIndex + 1)
        }
    }


    // auto slider
    useEffect(() => {
        let slideTimeChangeInMilliseconds = 7000
        let timeout = setTimeout(() => {
            if(sliderCurrentIndex === sliderPostData.length - 1) {
                setSliderCurrentIndex((currentState) => {
                    return currentState = 0
                })
            } else {
                setSliderCurrentIndex((currentState) => {
                    return currentState + 1
                })
            }
        }, slideTimeChangeInMilliseconds)
        // cleanup 
        return (() => {
            clearTimeout(timeout)
        })
    },[sliderCurrentIndex])
    

    
    // get most recent posts
    useEffect(() => {
        let amountOfPostsToGet = 3
        getMostRecentPosts(amountOfPostsToGet).then((data) => setRecentPostsData(data))
    },[])

    // get all categories and the amount of posts their are for the categories
    useEffect(() => {
        getAllCategoriesAndCategoryAmount(getAllCategories()).then((data) => setCategories(data))
    }, [])


    useEffect(() => {
        let categoriesToGet = ["food", "gaming", "movies", "science"]
        const filteredData = categories.filter(item => categoriesToGet.includes(item.category.toLowerCase()));
        
        setCategoryList(filteredData)
    }, [categories])


  return (
    <div className="mb-0 relative ">
        <div className="sticky top-0">
            {/* social media group */}
            <div className="grid grid-cols-4 grid-rows-2 gap-1">
                {socialMediaGroupList.map((el, index) => {
                    return (
                        <Link to={el.link} key={index} className=" bg-slate-50 p-3 flex text-center flex-col justify-center center">
                            <el.icon className="self-center text-xl" style={{color:el.iconColor}}/>
                            <div className="text-sm font-bold mt-1">{socialMediaNumberFormatter.format(el.followers)}</div>
                            <p className="text-xs">{el.followerText}</p>
                        </Link>
                    )
                })}
            </div>
            {/* categories group */}
            <section className="flex flex-col gap-3 my-10">
                {categoriesList.map((el, index) => {
                    return (
                        <Link to={`${el.link}`} key={index} className="bg-slate-500 p-4 rounded-xl flex justify-between bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url(${categoriesImageMap[el?.category.toLowerCase()]})`, boxShadow:"inset 0px 0px 75px 17px rgba(0,0,0,0.75)"}}>
                            <span className="text-white capitalize">{el.category}</span>
                            <span className="bg-white p-1 rounded-full w-8 flex justify-center items-center">{el.amount}</span>
                        </Link>
                    )
                })} 
            </section>
            {/* recent posts */}
            <div>
                <h2 className=" font-semibold text-3xl mb-2">Recent Posts</h2>
                <div className="flex flex-col gap-6">
                {recentPostsData.map((data, index) => {
                    return (
                        <PostPreviewRow key={index} {...{post:data, direction:"flex-row-reverse"}}/>
                        )
                    })}
                </div>
            </div>
            {/* mini slider  */}
            <div className="relative my-8 h-[375px]">
                <div className="absolute z-30 mt-5 mr-4 right-0 text-white text-xl">
                    <button onClick={() => prevSlide()} className="bg-[rgba(10,10,10,0.30)] rounded-full p-2 mx-1">
                        <RiArrowLeftSLine/>
                    </button>
                    <button onClick={() => nextSlide()} className="bg-[rgba(10,10,10,0.30)] rounded-full p-2 mx-1">
                        <RiArrowRightSLine/>
                    </button>
                </div>
                {/* slides */}
                <div className="w-full h-full relative overflow-hidden rounded-xl">
                    {/* slide */}
                    {sliderPostData.map((data, index) => {
                        let slidePosition = "mini-slider--next"

                        if (sliderCurrentIndex === index) {
                        slidePosition = "mini-slider--current";
                        }
                        if 
                        (sliderCurrentIndex === index - 1 || 
                        (index === 0 && sliderCurrentIndex === sliderPostData.length - 1)
                        ) {
                        slidePosition = "mini-slider--prev";
                        }

                        return (
                            <div key={index} className={`${slidePosition} opacity-0 transition-all duration-700 absolute w-full h-full top-0`}>
                                <PostPreviewTogether {...{post:data, position:"absolute", width:"w-full", height:"h-full"}} />
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