import { CHANGE_CHAT_COUNT, CHANGE_CHAT_LIST, CHANGE_CHAT_PAGE_NO, CHAT_LIST_FAILURE, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, CLEAR_CHAT_LIST_RESPONSE, COUNT_CHAT_LIST_CLICK } from "./FriendlistConstant";

const initialState = {
    page: 1,
    chatList: [],
    chatListApi: {
        chatListLoading: false,
        chatListStatus: "",
        chatListSucess: ""
    },
    chatCount: "",
    countFriendListClick: 1
}

export const FriendListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CHAT_PAGE_NO:
            return {
                ...state,
                ...action.newState
            }
        case CHAT_LIST_REQUEST:
            return {
                ...state,
                ...{ chatListApi: { ...state.chatListApi, ...{ chatListLoading: true } } }
            }
        case CHAT_LIST_SUCCESS:
            console.log(action, "action...");
            const { response: { data: { list, success } } } = action;

            let chatlistSuccess = {
                chatListLoading: false,
                chatListStatus: 200,
                chatListSucess: success
            }
            return {
                ...state,
                ...{
                    chatListApi: { ...state.chatListApi, ...chatlistSuccess },
                    chatList: !!list ? [...state.chatList, ...list] : []
                }
            }
        case CHAT_LIST_FAILURE:
            console.log(action, "action...");
            let chatListFailure = {
                chatListLoading: false,
                chatListStatus: action.status,
                chatListSucess: ""
            }
            return {
                ...state,
                ...{
                    chatListApi: { ...state.chatListApi, ...chatListFailure },
                    chatList: []
                }
            }
        case CLEAR_CHAT_LIST_RESPONSE:
            let clearResponse = {
                chatListStatus: "",
                chatListSucess: ""
            }
            return {
                ...state,
                ...{
                    chatListApi: { ...state.chatListApi, ...clearResponse },
                    chatList: []
                }
            }
        case CHANGE_CHAT_LIST:
            return {
                ...state,
                ...action.newState
            }
        case CHANGE_CHAT_COUNT:
            return {
                ...state,
                ...action.newState
            }
        case COUNT_CHAT_LIST_CLICK:
            return {
                ...state,
                ...action.newState
            }
        default:
            return state
    }
}