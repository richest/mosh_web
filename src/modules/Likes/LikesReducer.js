import { CHANGE_PAGE_NO, CLEAR_LIKE_LIST_RESPONSE, GET_LIKE_LIST_FAILURE, GET_LIKE_LIST_REQUEST, GET_LIKE_LIST_SUCCESS } from "./LikesConstant"

const initialState = {
    LikeList: [],
    page: 1,
    likeListApi: {
        LikeListApiLoading: false,
        LikeListApiStatus: "",
    }

}

export const LikesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE_NO:
            return {
                ...state,
                ...action.newState
            }
        case GET_LIKE_LIST_REQUEST:
            return {
                ...state,
                ...{ likeListApi: { ...state.likeListApi, ...{ LikeListApiLoading: true } } }
            }
        case GET_LIKE_LIST_SUCCESS:
            console.log(action, "action...");
            const { response: { data: { list } } } = action;

            let likeListSuccess = {
                LikeListApiLoading: false,
                LikeListApiStatus: 200,
            }
            return {
                ...state,
                ...{
                    likeListApi: { ...state.likeListApi, ...likeListSuccess },
                    LikeList: !!list && list.length > 0 ? [...state.LikeList, ...list] : state.LikeList
                }
            }
        case GET_LIKE_LIST_FAILURE:
            console.log(action, "action...");
            // const { response: { data: { message } } } = action;
            let likeListFailure = {
                LikeListApiLoading: false,
                LikeListApiStatus: action.status,
            }
            return {
                ...state,
                ...{
                    likeListApi: { ...state.likeListApi, ...likeListFailure },
                    LikeList: []
                }
            }
        case CLEAR_LIKE_LIST_RESPONSE:
            let clearLikeList = {
                LikeListApiStatus: "",
            }
            return {
                ...state,
                ...{
                    likeListApi: { ...state.likeListApi, ...clearLikeList },
                    LikeList: [],
                    page:1
                }
            }
        default:
            return state
    }
}