
import { CHANGE_MESSAGE_DETAIL, CHANGE_FRDS_ACKNOWLEDGE, CHANGE_SOCKET_ID, COMPLETE_MESSAGE_LIST, CLEAR_MESSAGE_DETAIL, CHECK_IS_ONLINE, CHANGE_BLOCKED_STATUS } from "./ChatConstants"

const initialState = {
    userDetail: {
        userMessage: "",
        is_loading: false,
        typingUser: "",
        dummyMediaRc: "",
        is_scroll: true,
        page: 1,
        page_scroll: true,
        pagination_loading: false
    },
    blockedStatus: {
        do_I_have_blocked_my_frd: false,
        do_frd_have_blocked_me: false
    },
    completeMessageList: [],
    frds_acknowledged: "",
    socket_id: "",
    is_online: "",
}

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE_DETAIL:
            return {
                ...state,
                ...{ userDetail: { ...state.userDetail, ...action.newState } }
            }
        case CHANGE_FRDS_ACKNOWLEDGE:
            return {
                ...state,
                ...action.newState
            }
        case CHANGE_SOCKET_ID:
            return {
                ...state,
                ...action.newState
            }
        case COMPLETE_MESSAGE_LIST:
            return {
                ...state,
                ...action.newState
            }
        case CLEAR_MESSAGE_DETAIL:
            let clearMessageDetail = {
                userMessage: "",
                is_loading: false,
                typingUser: "",
                dummyMediaRc: "",
                is_scroll: true,
                page: 1,
                page_scroll: true
            }
            return {
                ...state,
                ...{
                    userDetail: { ...state.userDetail, ...clearMessageDetail }
                }
            }
        case CHECK_IS_ONLINE:
            return {
                ...state,
                ...action.newState
            }
        case CHANGE_BLOCKED_STATUS:
            return {
                ...state,
                ...{ blockedStatus: { ...state.blockedStatus, ...action.newState } }
            }
        default:
            return state
    }
}