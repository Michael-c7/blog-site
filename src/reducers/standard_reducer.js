import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
} from '../actions'

const standard_reducer = (state, action) => {

    if(action.type === SIDEBAR_OPEN) {
      let siteWrapper = document.querySelector(".site-wrapper")
      siteWrapper.style.overflowY = "hidden"
      return {...state, isSidebarOpen:true}
    }
    
    if(action.type === SIDEBAR_CLOSE) {
      let siteWrapper = document.querySelector(".site-wrapper") 
      siteWrapper.style.overflowY = "initial"
      return {...state, isSidebarOpen:false}
    }
  
    throw new Error(`No Matching "${action.type}" - action type`)
  
    }
  
  
    export default standard_reducer