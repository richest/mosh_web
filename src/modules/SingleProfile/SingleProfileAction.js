import { CHANGE_REPORT_USER_INPUT, CLEAR_ADD_REMOVE_DATA, CLEAR_BLOCK_UNBLOCK_RESPONSE, CLEAR_LIKES_LIMIT_REACH, CLEAR_MESSAGE_LIMIT_RESPONSE, CLEAR_PURR_USER_RESPONSE, CLEAR_REPORT_USER_RESPONSE, CLEAR_SINGLE_PROFILE_DATA } from "./SingleProfileConstant"

const clearSingleProfileResponse = (newState) => {
    return{type :CLEAR_SINGLE_PROFILE_DATA , newState}
}
const clearAddRemoveResponse = (newState) => {
    return {type :CLEAR_ADD_REMOVE_DATA ,newState}
}
const changeReportUserInput = (newState) => {
    return {type :CHANGE_REPORT_USER_INPUT ,newState}
}
const clearReportUserResponse = (newState) => {
return { type: CLEAR_REPORT_USER_RESPONSE ,newState}
}
const clearPurrUserResponse = (newState) => {
    return {type :CLEAR_PURR_USER_RESPONSE , newState}
}
const clearBlockUnblockResponse = (newState) => {
    return{ type :CLEAR_BLOCK_UNBLOCK_RESPONSE ,newState}
}
const clearMessageLimitResonse =(newState) => {
    return{type:CLEAR_MESSAGE_LIMIT_RESPONSE , newState}
}
const clearLikeLimitReach =(newState) => {
    return{type: CLEAR_LIKES_LIMIT_REACH , newState}
}

export{clearSingleProfileResponse ,clearAddRemoveResponse ,changeReportUserInput, clearReportUserResponse,clearPurrUserResponse,
    clearBlockUnblockResponse ,clearMessageLimitResonse,clearLikeLimitReach
}