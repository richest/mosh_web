import {getCookie} from '../../utilities/functions'
import { CHANGE_IS_AUTH, CHANGE_ONLINE } from '../constants/AuthConstants'
const initialState = {
  is_auth: !!localStorage.getItem("session_id") ? true : false,
  onlines: 0
}

export const Authreducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IS_AUTH:
            console.log(action ,"auth action")
            return{
                ...state,
                ...action.newState
            }

        case CHANGE_ONLINE:
        return{
            ...state,
            ...{onlines: action.onlines}
        }
        default:
            return state
    }
}