import React, { useState, useEffect } from "react"

// components
import Tag from "../components/widgets/Tag"
import { Link } from "react-router-dom"
import { useBlogContext } from "../contexts/blog_context"
import AuthorAndDate from "./widgets/AuthorAndDate"
import { getDateFromTime } from "../utility/misc"

const HeroSlider = () => {
    const { getPostsByIds } = useBlogContext()

    let [currentSlideId, setCurrentSlideId] = useState(0)

    let [titleCharacterLimit, setTitleCharacterLimit] = useState(60)
    let [titleBtnCharacterLimit, setTitleBtnCharacterLimit] = useState(20)

    let [slideData, setSlideData] = useState([])


    let heroSliderPostIds = [
        "81022d3c-e3eb-43d1-be69-92531e740d21",
        "69a67a09-816c-47c4-9092-f33c55d17d5b",
        "cbd55a63-118b-4970-b582-33b5a71aec9b",
        "3dcf0ef3-cba6-40a1-a19e-0e24108217d7",
    ]

    // auto slider
    useEffect(() => {
        let slideTimeChangeInMilliseconds = 5000
        let timeout = setTimeout(() => {
            if(currentSlideId === slideData.length - 1) {
                setCurrentSlideId((currentState) => {
                    return currentState = 0
                })
            } else {
                setCurrentSlideId((currentState) => {
                    return currentState + 1
                })
            }
        }, slideTimeChangeInMilliseconds)
        // cleanup 
        return (() => {
            clearTimeout(timeout)
        })
    }, [currentSlideId])


    // get the post data for the slides
    useEffect(() => {
        getPostsByIds(heroSliderPostIds).then((el) => setSlideData(el))
    }, [])



    return (
        <article className="h-[600px] my-12 rounded-lg relative">
            {/* slides */}
            <ul>
                {slideData.map((el, index) => {
                    return (
                        <li key={el?.postId} className={`${currentSlideId === index ? "hero-slider-transition--current" : ""}  hero-slider-transition--start absolute rounded-lg w-full h-full text-white`}>
                            <Link to={`/post/${el?.postId}`} className="top-0 absolute w-full h-full rounded-xl">
                                <img src={el?.image} alt={el?.altText} className="top-0 left-0 absolute w-full h-full rounded-xl object-cover" />
                             </Link>
                             <div className="absolute min-[425px]:mx-16 mx-0 min-[425px]:w-auto w-full top-1/2 -translate-y-1/2">
                                 <div className="w-full flex min-[425px]:justify-start justify-center z-40">
                                     <Tag {...{bgColor:`--category--${el.tag}`, text:`${el.tag}`, link:`/category/${el.tag}`}}/>
                                 </div>
                                 <h2 className="font-semibold min-[425px]:text-4xl text-3xl uppercase my-5 w-full min-[425px]:text-left text-center">
                                  <Link to={`/post/${el?.postId}`}>
                                     {el.title.length <= titleCharacterLimit ? `${el.title}` : `${el.title.slice(0, titleCharacterLimit)}...`}
                                  </Link>
                                 </h2>
                                 <AuthorAndDate {...{authorLink:`/author/${el.username}`, authorName:el.displayName, textColor:"#fff", date:getDateFromTime(el.createdAt?.nanoseconds, el.createdAt?.seconds)}}/>
                             </div>
                        </li>
                    )
                })}
            </ul>
            {/* slide buttons */}
            <ul className="absolute bottom-0 px-8 mb-8 w-full justify-between md:grid grid-rows-1 hidden z-10 grid-cols-4 gap-4">
                {slideData.map((el, index) => {
                    return (
                        <li key={el.postId} onClick={() => setCurrentSlideId(index)} className="text-white flex items-center">
                            <button className="flex items-center">
                                <img src={el.image} alt={el.title} className="w-14 h-14 rounded-full mr-2 object-cover"/>
                                <h2 className={` ${currentSlideId === index ? "text-white" : "text-neutral-300"} font-semibold uppercase text-sm text-left`}>{el.title.length <= titleBtnCharacterLimit ? `${el.title}` : `${el.title.slice(0,titleBtnCharacterLimit)}...`}</h2>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </article>
    )
}

export default HeroSlider