import React from "react"

import { ImClock } from "react-icons/im"

import testImg1 from "../assets/images/testImg1.jpg"
import testImg2 from "../assets/images/testImg2.jpg"
import testImg3 from "../assets/images/testImg3.jpg"
import testImg4 from "../assets/images/testImg4.jpg"

import testAuthorImg from "../assets/images/testAuthorImg1.jpg"

// components
import Tag from "../components/widgets/Tag"
import { Link } from "react-router-dom"


const HeroSlider = () => {
    let [currentSlideId, setCurrentSlideId] = React.useState(0)

    let [titleCharacterLimit, setTitleCharacterLimit] = React.useState(60)
    let [titleBtnCharacterLimit, setTitleBtnCharacterLimit] = React.useState(20)

    const [slides, setSlides] = React.useState([
        {
            id:0,
            img:testImg1,
            title:"test title 1",
            authorImg:testAuthorImg,
            authorName:"bob Smith",
            date:"Dec 23, 2016",
            category:"science",
            authorId:12374,
        },
        {
            id:1,
            img:testImg2,
            title:"test title 2",
            authorImg:testAuthorImg,
            authorName:"bill johnson",
            date:"Mar 13, 2012",
            category:"gaming",
            authorId:12354,
        },
        {
            id:2,
            img:testImg3,
            title:"test title 32423432424",
            authorImg:testAuthorImg,
            authorName:"Fatima Ali",
            date:"Feb 23, 1923",
            category:"food",
            authorId:123,
        },
        {
            id:3,
            img:testImg4,
            title:"This is the best test title to ever exist in the world",
            authorImg:testAuthorImg,
            authorName:"John johnson",
            date:"Dec 10, 2012",
            category:"movie",
            authorId:1234,
        },
    ])



    // auto slider
    React.useEffect(() => {
        let slideTimeChangeInMilliseconds = 5000
        let timeout = setTimeout(() => {
            if(currentSlideId === slides.length - 1) {
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
    },[currentSlideId])


    return (
        <article className="h-[550px] my-12 rounded-lg relative">
            {/* the slides */}
            <ul className="slides">
                {slides.map((el) => {
                    return (
                        <li key={el.id} className={`${currentSlideId === el.id ? "hero-slider-transition--current" : ""}  hero-slider-transition--start absolute rounded-lg w-full h-full text-white`}>
                            <Link to="/link goes here" className="top-0  absolute w-full h-full rounded-xl">
                                <img src={el.img} alt="alt text here" className="top-0 left-0 absolute w-full h-full rounded-xl object-cover" />
                            </Link>
                            <div className="absolute min-[425px]:mx-16 mx-0 min-[425px]:w-auto w-full" style={{transform:"translateY(-50%)", top:"50%"}}>
                                <div className="w-full flex min-[425px]:justify-start justify-center z-40">
                                    <Tag {...{bgColor:"rgb(224,141,25)", text:"tag test", link:`/category/${el.category}`}}/>
                                </div>
                                <h2 className="font-semibold min-[425px]:text-4xl text-3xl uppercase my-5 w-full min-[425px]:text-left text-center">
                                 <Link to={`/article link goes here}`}>
                                    {el.title.length <= titleCharacterLimit ? `${el.title}` : `${el.title.slice(0, titleCharacterLimit)}...`}
                                 </Link>
                                </h2>
                                <div className="flex min-[425px]:flex-row flex-col items-center text-sm">
                                    <Link to={`/author/${el.authorId}`} className="flex flex-row items-center min-[425px]:mb-0 mb-2">
                                        <img src={el.authorImg} alt="author image" className="w-6 h-6 rounded-full object-cover"/>
                                        <h2 className="min-[425px]:ml-2 ml-1 mr-3">{el.authorName}</h2>
                                     </Link>
                                    <span className="flex flex-row items-center">
                                        <ImClock className="mr-1"/>
                                        <p>{el.date}</p>
                                     </span>
                                 </div>
                            </div>

                        </li>
                    )
                })}
            </ul>
            {/* the slide buttons */}
            <ul className="absolute bottom-0 px-8 mb-8 w-full justify-between md:grid grid-rows-1 hidden z-10 grid-cols-4 gap-4">
            {slides.map((el) => {
                return (
                    <li key={el.id} onClick={() => setCurrentSlideId(el.id)} className="text-white flex items-center">
                        <button className="flex items-center">
                            <img src={el.img} alt={el.title} className="w-14 h-14 rounded-full mr-2 object-cover"/>
                            <h2 className={` ${currentSlideId === el.id ? "text-white" : "text-neutral-300"} font-semibold uppercase text-sm text-left`}>{el.title.length <= titleBtnCharacterLimit ? `${el.title}` : `${el.title.slice(0,titleBtnCharacterLimit)}...`}</h2>
                        </button>
                    </li>
                )
            })}
            </ul>
        </article>
    )
}

export default HeroSlider