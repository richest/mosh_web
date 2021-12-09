import { CHANGE_PAGE_NO, CLEAR_LIKE_LIST_RESPONSE } from "./LikesConstant"

const changePageLikeNo = (newState) =>{
    return{type :CHANGE_PAGE_NO ,newState}
}
const clearLikeListResponse = (newState) => {
    return{type:CLEAR_LIKE_LIST_RESPONSE ,newState}
}
export {changePageLikeNo ,clearLikeListResponse}