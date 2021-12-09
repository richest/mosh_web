import { CHANGE_FILTER_INPUT, CHANGE_FILTER_LIST, CLEAR_FILTER_INPUT, CLEAR_FILTER_LIST_AFTER_CALL_RESPONSE, CLEAR_FILTER_LIST_RESPONSE } from "./HomeConstants"

const changeFilterInputs = (newState) => {
    return{ type: CHANGE_FILTER_INPUT , newState}
}
const clearFilterInputs = (newState)=>{
    return{type:CLEAR_FILTER_INPUT ,newState}
}
const clearFilterListResponse =(newState) => {
return{type:CLEAR_FILTER_LIST_RESPONSE ,newState}
}
const changeFilterList = (newState) => {
    return{type: CHANGE_FILTER_LIST , newState}
}

const clearFilterListAfterResponse = () => {
    return{type: CLEAR_FILTER_LIST_AFTER_CALL_RESPONSE}
}

export{changeFilterInputs ,clearFilterInputs ,clearFilterListResponse ,changeFilterList, clearFilterListAfterResponse}