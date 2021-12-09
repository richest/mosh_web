
import { CHANGE_BLOCKED_STATUS, CHANGE_FRDS_ACKNOWLEDGE, CHANGE_MESSAGE_DETAIL, CHANGE_SOCKET_ID, CHECK_IS_ONLINE, CLEAR_MESSAGE_DETAIL, COMPLETE_MESSAGE_LIST } from "./ChatConstants"

const changeMessageDetail = (newState) => {
    return { type: CHANGE_MESSAGE_DETAIL, newState }
}
const clearMessageDetail =( newState) => {
    return{type :CLEAR_MESSAGE_DETAIL , newState}
}
const changeSocketId = (newState) => {
    return { type: CHANGE_SOCKET_ID, newState }
}
const changeFriendAcknowdge = (newState) => {
    return { type: CHANGE_FRDS_ACKNOWLEDGE, newState }
}
const completeMessageListData = (newState) => {
    return { type: COMPLETE_MESSAGE_LIST , newState}
}
const checkIsOnline = (newState) =>{
    return{type :CHECK_IS_ONLINE , newState}
}
const changeBlockedStatus =(newState) => {
    return{type:CHANGE_BLOCKED_STATUS , newState}
}

export { changeMessageDetail, changeFriendAcknowdge, changeSocketId ,completeMessageListData ,
    clearMessageDetail ,checkIsOnline ,changeBlockedStatus }