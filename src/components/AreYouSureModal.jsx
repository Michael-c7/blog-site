import React from 'react'
import useGetScrollY from "../hooks/useGetScrollY"

/**
 * 
 * @param {*} isOpen the state value
 * @param {*} setIsOpen the set state value
 * @param {*} confirmFunction the function that gets executed when you click the ok button
 * @param {*} confirmFunctionArgs argument(s) for the confirmFunction
 * @param {*} headText the main message / heading text. default is "Are you sure?" 
 * @returns 
 */
const AreYouSureModal = ({ isOpen, setIsOpen, confirmFunction, confirmFunctionArgs, headingText = "Are you Sure?" }) => {

    React.useEffect(() => {
        if(isOpen) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "initial"
        }
    },[isOpen])

    const { scrollY } = useGetScrollY()

    return (
        <>
            <div className={`absolute top-0 w-full h-full bg-[rgba(5,5,5,0.85)] ease-in-out duration-200  ${isOpen ? " opacity-100 z-50 transition block" : "opacity-0 -z-50 transition-none hidden"}`} onClick={() => setIsOpen(false)} style={{top:`${scrollY}px`}}></div>
            <div className={`min-[420px]:w-auto w-full h-auto absolute bg-white drop-shadow rounded p-6 flex flex-col justify-center items-center ${isOpen ? "opacity-100 z-50 transition block" : "opacity-0 -z-50 transition-none hidden"}`} style={{left:"50%", top:`${scrollY + (window.innerHeight / 2)}px`, transform:"translate(-50%, -50%)"}}>
                <h2 className=" min-[420px]:w-[30ch] w-auto text-center text-xl">{headingText}</h2>
                <div className="mt-4">
                    <button className="form-secondary-btn text-base max-[420px]:w-full min-[420px]:mr-2 mr-0" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className="form-primary-btn text-base max-[420px]:w-full min-[420px]:ml-2 ml-0" onClick={() => {
                        confirmFunction(confirmFunctionArgs ? confirmFunctionArgs : "")
                        setIsOpen(false)
                    }}>Ok</button>
                </div>
            </div>
        </>
    )
}

export default AreYouSureModal