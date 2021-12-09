import { CHANGE_CHAT_COUNT, CHANGE_CHAT_LIST, CHANGE_CHAT_PAGE_NO, CLEAR_CHAT_LIST_RESPONSE, COUNT_CHAT_LIST_CLICK } from "./FriendlistConstant"

const changeChatPageNo = (newState) => {
    return { type: CHANGE_CHAT_PAGE_NO, newState }
}
const clearChatListresponse = (newState) => {
    return { type: CLEAR_CHAT_LIST_RESPONSE, newState }
}
const changeChatList = (newState) => {
    return { type: CHANGE_CHAT_LIST, newState }
}
const changeChatCount = (newState) => {
    return { type: CHANGE_CHAT_COUNT, newState }
}
const changeFriendListClick = (newState) => {
    return {type :COUNT_CHAT_LIST_CLICK , newState}
}
export { changeChatPageNo, clearChatListresponse, changeChatList, changeChatCount ,changeFriendListClick}