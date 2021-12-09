import { POST_API } from "../../main/fetch"
import { GET_LIKE_LIST_FAILURE, GET_LIKE_LIST_REQUEST, GET_LIKE_LIST_SUCCESS } from "../../modules/Likes/LikesConstant"
import { MY_LIKE_LIST_API } from "../urls"

const getLikesDataApi = (body) => {
    return {  
        [POST_API]: {
            endpoint: MY_LIKE_LIST_API,
            types: [GET_LIKE_LIST_REQUEST,
                GET_LIKE_LIST_SUCCESS,
                GET_LIKE_LIST_FAILURE],
            body
        }
    }
}
export {getLikesDataApi}