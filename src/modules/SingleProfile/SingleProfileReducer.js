import { findAllInRenderedTree } from "react-dom/test-utils";
import { getCookie, setCookie } from "../../library/utilities/functions";
import { ADD_REMOVE_FAVORITE_DATA_FAILURE, ADD_REMOVE_FAVORITE_DATA_REQUEST, ADD_REMOVE_FAVORITE_DATA_SUCCESS, BLOCK_UNBLOCK_API_FAILURE, BLOCK_UNBLOCK_API_REQUEST, BLOCK_UNBLOCK_API_SUCCESS, CHANGE_REPORT_USER_INPUT, CHECK_MESSAGE_LIMIT_FAILURE, CHECK_MESSAGE_LIMIT_REQUEST, CHECK_MESSAGE_LIMIT_SUCCESS, CLEAR_ADD_REMOVE_DATA, CLEAR_BLOCK_UNBLOCK_RESPONSE, CLEAR_LIKES_LIMIT_REACH, CLEAR_MESSAGE_LIMIT_RESPONSE, CLEAR_PURR_USER_RESPONSE, CLEAR_REPORT_USER_RESPONSE, CLEAR_SINGLE_PROFILE_DATA, PUR_USER_API_FAILURE, PUR_USER_API_REQUEST, PUR_USER_API_SUCCESS, REPORT_LIST_API_FAILURE, REPORT_LIST_API_REQUEST, REPORT_LIST_API_SUCCESS, REPORT_USER_API_FAILURE, REPORT_USER_API_REQUEST, REPORT_USER_API_SUCCESS, SINGLE_PROFILE_DATA_FAILURE, SINGLE_PROFILE_DATA_REQUEST, SINGLE_PROFILE_DATA_SUCCESS } from "./SingleProfileConstant";

const initialState = {
    getSingleProfile: {
        singleProfileApiLoading: false,
        singleProfileApiStatus: "",
        singleProfileDataResponse: ""
    },
    LikesLimitReach: "0",
    addRemoveFavourite: {
        addRemoveFavouriteLoading: false,
        addRemoveFavouriteStatus: "",
        addRemoveFavouriteMessage: "",
    },
    reportUser: {
        report: "",
        reportList: []
    },
    reportUserApi: {
        reportUserLoading: false,
        reportUserStatus: "",
        reportUserMessage: "",
        reportUserError: ""
    },
    reportListApi: {
        reportListLoading: false,
        reportListStatus: ""
    },
    purrUserApi: {
        purrUserLoading: false,
        purrUserStatus: "",
        purrUserMessage: "",
        purrLimitReach: ""
    },
    blockUnblockApi: {
        blockUnblockLoading: false,
        blockUnblockStatus: "",
        blockUnblockMessage: "",
        blockUnblockSuccess: ""
    },
    checkMessageLimitApi: {
        checkMessageLimitLoading: false,
        checkMessageLimitStatus: "",
        checkMessageLimitMessage: "",
        checkMessageLimitLimitReach: "",
        checkMessageLimitSuccess: ""
    }
}

export const SingleProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SINGLE_PROFILE_DATA_REQUEST:
            return {
                ...state,
                ...{ getSingleProfile: { ...state.getSingleProfile, ...{ singleProfileApiLoading: true } } }
            }
        case SINGLE_PROFILE_DATA_SUCCESS:
            const { response: { data: { userData } } } = action;

            let singleprofileSuccess = {
                singleProfileApiLoading: false,
                singleProfileApiStatus: 200,
                singleProfileDataResponse: !!userData ? userData : ""
            }
           
            if(getCookie("user_id")== userData.id ){
                setCookie("is_subscribed" ,userData.is_subscribed)     
              }
            return {
                ...state,
                ...{
                    getSingleProfile: { ...state.getSingleProfile, ...singleprofileSuccess }
                }
            }
        case SINGLE_PROFILE_DATA_FAILURE:
            let singleprofileFailure = {
                singleProfileApiLoading: false,
                singleProfileApiStatus: action.response.status,
                singleProfileDataResponse: ""
            }
            return {
                ...state,
                ...{
                    getSingleProfile: { ...state.getSingleProfile, ...singleprofileFailure }
                }
            }
        case CLEAR_SINGLE_PROFILE_DATA:
            let clearSingleprofile = {
                singleProfileApiLoading: false,
                singleProfileApiStatus: "",
                singleProfileDataResponse:""
            }
            return {
                ...state,
                ...{
                    getSingleProfile: { ...state.getSingleProfile, ...clearSingleprofile }
                }
            }
        case ADD_REMOVE_FAVORITE_DATA_REQUEST:
            return {
                ...state,
                ...{ addRemoveFavourite: { ...state.addRemoveFavourite, ...{ addRemoveFavouriteLoading: true } } }
            }
        case ADD_REMOVE_FAVORITE_DATA_SUCCESS:
            const { response: { data: { message, limit_reach } } } = action;

            let addRemoveSuccess = {
                addRemoveFavouriteLoading: false,
                addRemoveFavouriteStatus: 200,
                addRemoveFavouriteMessage: message,
            }
            return {
                ...state,
                ...{
                    addRemoveFavourite: { ...state.addRemoveFavourite, ...addRemoveSuccess },
                    LikesLimitReach:!!limit_reach ? limit_reach : ""
                }
            }
        case ADD_REMOVE_FAVORITE_DATA_FAILURE:
            let addRemoveFailure = {
                addRemoveFavouriteLoading: false,
                addRemoveFavouriteStatus: action.response.status,
                addRemoveFavouriteMessage: action.response.data.message,
            }
            return {
                ...state,
                ...{
                    addRemoveFavourite: { ...state.addRemoveFavourite, ...addRemoveFailure },
                    LikesLimitReach:!!limit_reach ? limit_reach : ""
                }
            }
        case CLEAR_ADD_REMOVE_DATA:
            let clearAddRemove = {
                addRemoveFavouriteStatus: "",
                addRemoveFavouriteMessage: "",
            }
            return {
                ...state,
                ...{
                    addRemoveFavourite: { ...state.addRemoveFavourite, ...clearAddRemove }
                }
            }
        case REPORT_LIST_API_REQUEST:
            return {
                ...state,
                ...{ reportListApi: { ...state.reportListApi, ...{ reportListLoading: true } } }
            }
        case REPORT_LIST_API_SUCCESS:
            console.log(action, "action...");
            const { response: { data: { ReportReason } } } = action;

            let reportListSuccess = {
                reportListLoading: false,
                reportListStatus: 200,
            }
            return {
                ...state,
                ...{
                    reportListApi: { ...state.reportListApi, ...reportListSuccess },
                    reportUser: { ...state.reportUser, ...(!!ReportReason ? { reportList: ReportReason } : { reportList: [] }) }
                }
            }
        case REPORT_LIST_API_FAILURE:
            let reportListFailure = {
                reportListLoading: false,
                reportListStatus: action.response.status,
            }
            return {
                ...state,
                ...{
                    reportListApi: { ...state.reportListApi, ...reportListFailure },
                    reportUser: { ...state.reportUser, ...{ reportList: [] } }
                }
            }
        case CHANGE_REPORT_USER_INPUT:
            return {
                ...state,
                ...{ reportUser: { ...state.reportUser, ...action.newState } }
            }
        case REPORT_USER_API_REQUEST:
            return {
                ...state,
                ...{ reportUserApi: { ...state.reportUserApi, ...{ reportUserLoading: true } } }
            }
        case REPORT_USER_API_SUCCESS:
            const { response: { data } } = action;

            let reportUserSuccess = {
                reportUserLoading: false,
                reportUserStatus: 200,
                reportUserMessage: data.message,
                reportUserError: data.error
            }
            return {
                ...state,
                ...{
                    reportUserApi: { ...state.reportUserApi, ...reportUserSuccess }
                }
            }
        case REPORT_USER_API_FAILURE:
            let reportUserFailure = {
                reportUserLoading: false,
                reportUserStatus: action.response.status,
                reportUserMessage: "",
                reportUserError: action.response.error
            }
            return {
                ...state,
                ...{
                    reportUserApi: { ...state.reportUserApi, ...reportUserFailure }
                }
            }
        case CLEAR_REPORT_USER_RESPONSE:
            let clearReportUser = {
                reportUserLoading: false,
                reportUserStatus: "",
                reportUserMessage: "",
                reportUserError: ""
            }
            return {
                ...state,
                ...{
                    reportUserApi: { ...state.reportUserApi, ...clearReportUser }
                }
            }
        case PUR_USER_API_REQUEST:
            return {
                ...state,
                ...{ purrUserApi: { ...state.purrUserApi, ...{ purrUserLoading: true } } }
            }
        case PUR_USER_API_SUCCESS:
            const { response } = action;

            let purrUserSuccess = {
                purrUserLoading: false,
                purrUserStatus: 200,
                purrUserMessage: response.data.message,
                purrLimitReach: !!response.data.limit_reach ? response.data.limit_reach : ""
            }
            return {
                ...state,
                ...{
                    purrUserApi: { ...state.purrUserApi, ...purrUserSuccess }
                }
            }
        case PUR_USER_API_FAILURE:
            let purrUserFailure = {
                purrUserLoading: false,
                purrUserStatus: action.response.status,
                purrUserMessage: "",
                purrLimitReach: ""
            }
            return {
                ...state,
                ...{
                    purrUserApi: { ...state.purrUserApi, ...purrUserFailure }
                }
            }
        case CLEAR_PURR_USER_RESPONSE:
            let clearPurrUser = {
                purrUserStatus: "",
                purrUserMessage: "",
                purrLimitReach: ""
            }
            return {
                ...state,
                ...{
                    purrUserApi: { ...state.purrUserApi, ...clearPurrUser }
                }
            }
        case BLOCK_UNBLOCK_API_REQUEST:
            return {
                ...state,
                ...{ blockUnblockApi: { ...state.blockUnblockApi, ...{ blockUnblockLoading: true } } }
            }
        case BLOCK_UNBLOCK_API_SUCCESS:

            let blockUnblockSuccess = {
                blockUnblockLoading: false,
                blockUnblockStatus: 200,
                blockUnblockMessage: action.response.data.message,
                blockUnblockSuccess: action.response.data.success
            }
            return {
                ...state,
                ...{
                    blockUnblockApi: { ...state.blockUnblockApi, ...blockUnblockSuccess }
                }
            }
        case BLOCK_UNBLOCK_API_FAILURE:
            let blockUnblockFailure = {
                blockUnblockLoading: false,
                blockUnblockStatus: action.response.status,
                blockUnblockMessage: "",
                blockUnblockSuccess:""
            }
            return {
                ...state,
                ...{
                    blockUnblockApi: { ...state.blockUnblockApi, ...blockUnblockFailure }
                }
            }
        case CLEAR_BLOCK_UNBLOCK_RESPONSE:
            let clearBlockUnblock = {
                blockUnblockStatus: "",
                blockUnblockMessage: "",
                blockUnblockSuccess:""
            }
            return {
                ...state,
                ...{
                    blockUnblockApi: { ...state.blockUnblockApi, ...clearBlockUnblock }
                }
            }
        case CHECK_MESSAGE_LIMIT_REQUEST:
            return {
                ...state,
                ...{ checkMessageLimitApi: { ...state.checkMessageLimitApi, ...{ checkMessageLimitLoading: true } } }
            }
        case CHECK_MESSAGE_LIMIT_SUCCESS:
            console.log(action, "action...");
            let checkLimitSuccess = {
                checkMessageLimitLoading: false,
                checkMessageLimitStatus: 200,
                checkMessageLimitSuccess:action.response.data.success,
                checkMessageLimitMessage: action.response.data.message,
                checkMessageLimitLimitReach: !!action.response.data.is_reached ? action.response.data.is_reached : ""
            }
            return {
                ...state,
                ...{
                    checkMessageLimitApi: { ...state.checkMessageLimitApi, ...checkLimitSuccess }
                }
            }
        case CHECK_MESSAGE_LIMIT_FAILURE:
            console.log(action, "action...");
            let checkLimitFailure = {
                checkMessageLimitLoading: false,
                checkMessageLimitStatus: action.response.status,
                checkMessageLimitMessage: "",
                checkMessageLimitLimitReach: "",
                checkMessageLimitSuccess:""
            }
            return {
                ...state,
                ...{
                    checkMessageLimitApi: { ...state.checkMessageLimitApi, ...checkLimitFailure }
                }
            }
        case CLEAR_MESSAGE_LIMIT_RESPONSE:
            let clearLimitMessage = {
                checkMessageLimitLoading: false,
                checkMessageLimitStatus: "",
                checkMessageLimitMessage: "",
                checkMessageLimitLimitReach: "",
                checkMessageLimitSuccess:""
            }
            return {
                ...state,
                ...{
                    checkMessageLimitApi: { ...state.checkMessageLimitApi, ...clearLimitMessage }
                }
            }
            case CLEAR_LIKES_LIMIT_REACH :
                return{
                    ...state,
                    ...{
                        LikesLimitReach: "0"
                    }
                }
        default:
            return state
    }
}