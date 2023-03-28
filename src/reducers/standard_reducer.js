import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  SEARCH_OVERLAY_OPEN,
  SEARCH_OVERLAY_CLOSE,
} from '../actions'

const standard_reducer = (state, action) => {

    if(action.type === SIDEBAR_OPEN) {
      document.body.style.overflowY = "hidden"
      return {...state, isSidebarOpen:true}
    }
    
    if(action.type === SIDEBAR_CLOSE) {
      document.body.style.overflowY = "initial"
      return {...state, isSidebarOpen:false}
    }
    

    if(action.type === SEARCH_OVERLAY_OPEN) {
      document.body.style.overflowY = "hidden"
      return {...state, isSidebarOverlayOpen:true}
    }

    if(action.type === SEARCH_OVERLAY_CLOSE) {
      document.body.style.overflowY = "initial"
      return {...state, isSidebarOverlayOpen:false}
    }
  
    throw new Error(`No Matching "${action.type}" - action type`)
  
    }
  
  
    export default standard_reducer