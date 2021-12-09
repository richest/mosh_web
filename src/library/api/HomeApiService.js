import { POST_API } from "../../main/fetch"
import { GET_FILTER_DATA_FAILURE, GET_FILTER_DATA_REQUEST, GET_FILTER_DATA_SUCCESS } from "../../modules/Home/HomeConstants"
import { GET_FILTER_USER_API } from "../urls"

const getFilterDataApi = (body) => {
    return {  
        [POST_API]: {
            endpoint: GET_FILTER_USER_API,
            types: [GET_FILTER_DATA_REQUEST,
                GET_FILTER_DATA_SUCCESS,
                GET_FILTER_DATA_FAILURE],
            body
        }
    }
}
export{getFilterDataApi }