import { POST_API } from "../../main/fetch"
import { CHAT_LIST_FAILURE, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS } from "../../modules/Chat/FriendlistConstant"
import { CHAT_LIST_API } from "../urls"

const chatListDataApi = (body) => {
    return {  
        [POST_API]: {
            endpoint: CHAT_LIST_API,
            types: [CHAT_LIST_REQUEST,
                CHAT_LIST_SUCCESS,
                CHAT_LIST_FAILURE],
            body
        }
    }
}
export {chatListDataApi}