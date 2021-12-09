import { POST_API } from "../../main/fetch"
import { ADD_REMOVE_FAVORITE_DATA_FAILURE, ADD_REMOVE_FAVORITE_DATA_REQUEST, ADD_REMOVE_FAVORITE_DATA_SUCCESS, BLOCK_UNBLOCK_API_FAILURE, BLOCK_UNBLOCK_API_REQUEST, BLOCK_UNBLOCK_API_SUCCESS, CHECK_MESSAGE_LIMIT_FAILURE, CHECK_MESSAGE_LIMIT_REQUEST, CHECK_MESSAGE_LIMIT_SUCCESS, PUR_USER_API_FAILURE, PUR_USER_API_REQUEST, PUR_USER_API_SUCCESS, REPORT_LIST_API_FAILURE, REPORT_LIST_API_REQUEST, REPORT_LIST_API_SUCCESS, REPORT_USER_API_FAILURE, REPORT_USER_API_REQUEST, REPORT_USER_API_SUCCESS, SINGLE_PROFILE_DATA_FAILURE, SINGLE_PROFILE_DATA_REQUEST, SINGLE_PROFILE_DATA_SUCCESS } from "../../modules/SingleProfile/SingleProfileConstant"
import { ADD_REMOVE_FAVORITE_API, BLOCK_UNBLOCK_API, CHECK_MESSAGE_LIMIT_API, GET_SINGLE_PROFILE_API, PUR_USER_API, REPORT_LIST_API, REPORT_USER_API } from "../urls"

const getSingleProfileDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: GET_SINGLE_PROFILE_API,
            types: [SINGLE_PROFILE_DATA_REQUEST,
                SINGLE_PROFILE_DATA_SUCCESS,
                SINGLE_PROFILE_DATA_FAILURE],
            body
        }
    }
}

const addRemoveFavouriteDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: ADD_REMOVE_FAVORITE_API,
            types: [ADD_REMOVE_FAVORITE_DATA_REQUEST,
                ADD_REMOVE_FAVORITE_DATA_SUCCESS,
                ADD_REMOVE_FAVORITE_DATA_FAILURE],
            body
        }
    }
}

const reportUserDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: REPORT_USER_API,
            types: [REPORT_USER_API_REQUEST,
                REPORT_USER_API_SUCCESS,
                REPORT_USER_API_FAILURE],
            body
        }
    }
}
const reportListDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: REPORT_LIST_API,
            types: [REPORT_LIST_API_REQUEST,
                REPORT_LIST_API_SUCCESS,
                REPORT_LIST_API_FAILURE],
            body
        }
    }
}
const purrDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: PUR_USER_API,
            types: [PUR_USER_API_REQUEST,
                PUR_USER_API_SUCCESS,
                PUR_USER_API_FAILURE],
            body
        }
    }
}
const blockUnblockDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: BLOCK_UNBLOCK_API,
            types: [BLOCK_UNBLOCK_API_REQUEST,
                BLOCK_UNBLOCK_API_SUCCESS,
                BLOCK_UNBLOCK_API_FAILURE],
            body
        }
    }
}
const checkMessageLimit = (body) => {
    return{
        [POST_API]: {
            endpoint: CHECK_MESSAGE_LIMIT_API,
            types: [CHECK_MESSAGE_LIMIT_REQUEST,
                CHECK_MESSAGE_LIMIT_SUCCESS,
                CHECK_MESSAGE_LIMIT_FAILURE],
            body
        }
    }
}
export { getSingleProfileDataApi, addRemoveFavouriteDataApi, reportUserDataApi, reportListDataApi, purrDataApi,
    blockUnblockDataApi ,checkMessageLimit }