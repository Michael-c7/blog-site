import React from "react"
import GeneralHeading from "./GeneralHeading"
import InfoSidebar from "./InfoSidebar"
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol"

import GeneralPageCard from "./GeneralPageCard"


const GeneralPageComponent = ({headingText, isGeneralHeadingShown = true, paginationDotAmount, currentPageNumber, setCurrentPageNumber, currentGeneralPagePosts,}) => {
    // have ten articles / PostPreviewCol per page
    let testArr = Array.from({ length:10 })
    let paginationBtnAmt = Array.from({ length:paginationDotAmount })

    return (
        <div>
            {isGeneralHeadingShown ? <GeneralHeading text={headingText}/> : ""}
            <div className="outer-width mx-auto">
                <div className="relative min-[990px]:grid min-[990px]:grid-cols-3 min-[990px]:my-12 my-6 gap-12 flex flex-col">
                    <div className="col-span-2 relative ">
                        <div className="grid min-[900px]:grid-cols-2 gap-8 gap-y-16">
                            {currentGeneralPagePosts?.map((el, index) => {
                                return (
                                    <GeneralPageCard key={index} {...{...el}}/>
                                )
                            })}
                        </div>
                        {paginationDotAmount > 1 ? (
                            <div className="flex flex-wrap mt-12">
                                {paginationBtnAmt.map((_, index) => {
                                    return (
                                        <button onClick={() => {
                                            setCurrentPageNumber(index + 1)
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'instant',
                                              });
                                        }} key={index} className={`text-white mx-1 first-of-type:ml-0 last-of-type:mr-0 py-2 px-4 rounded-full transition-colors hover:bg-orange-600 ${currentPageNumber === index + 1 ? "bg-orange-600" : "bg-black"}`}>{index + 1}</button>
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