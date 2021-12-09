import { CHANGE_PAGE_NUMBER } from "./MessageConstant"

const initialState = {
    messagePage:1
}

export const MessageOnlineReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE_NUMBER:
            console.log(action.newState ,"action.newState")
            return {
              ...state,
              ...action.newState
            }
        default:
            return state
    }
}