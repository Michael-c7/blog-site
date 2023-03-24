import React from "react"
import GeneralHeading from "./GeneralHeading"
import InfoSidebar from "./InfoSidebar"
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"

import GeneralPageCard from "./GeneralPageCard"


const GeneralPageComponent = ({headingText, isGeneralHeadingShown = true}) => {
    // have ten articles / PostPreviewCol per page
    let testArr = Array.from({ length:10 })
    let testBtnAmt = Array.from({ length:8 })

    let [showPageButtons, setShowPageButtons] = React.useState(true)
    let [currentPageNumber, setCurrentPageNumber] = React.useState(0)
    

    return (
        <div>
            {isGeneralHeadingShown ? <GeneralHeading text={headingText}/> : ""}
            <div className="outer-width mx-auto">
                <div className="relative min-[990px]:grid min-[990px]:grid-cols-3 min-[990px]:my-12 my-6 gap-12 flex flex-col">
                    <div className="col-span-2 relative ">
                        <div className="grid min-[900px]:grid-cols-2 gap-8 gap-y-16">
                            {testArr.map((el, index) => {
                                return (
                                    <GeneralPageCard key={index}/>
                                )
                            })}
                        </div>
                        {showPageButtons ? (
                            <div className="flex flex-wrap mt-12">
                                {testBtnAmt.map((el, index) => {
                                    return (
                                        <button key={index} className={`text-white mx-1 first-of-type:ml-0 last-of-type:mr-0 py-2 px-4 rounded-full transition-colors hover:bg-orange-600 ${currentPageNumber === index ? "bg-orange-600" : "bg-black"}`}>{index + 1}</button>
                                    )
                                })}
                            </div>
                        ) : ""}
                    </div>
                    <InfoSidebar/>
                </div>
            </div>
        </div>
    )
}

export default GeneralPageComponent