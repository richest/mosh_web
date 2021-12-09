import { GET_API, POST_API } from "../../main/fetch";
import {
    GET_CITY_DATA_FAILURE, GET_CITY_DATA_REQUEST, GET_CITY_DATA_SUCCESS, GET_COUNTRIES_DATA_FAILURE,
    GET_COUNTRIES_DATA_REQUEST, GET_COUNTRIES_DATA_SUCCESS, GET_RELATIONSHIP_DATA_FAILURE, GET_RELATIONSHIP_DATA_REQUEST,
    GET_RELATIONSHIP_DATA_SUCCESS, GET_STATE_DATA_FAILURE, GET_STATE_DATA_REQUEST, GET_STATE_DATA_SUCCESS,
    SEND_OTP_DATA_FAILURE, SEND_OTP_DATA_REQUEST, SEND_OTP_DATA_SUCCESS,
    VERIFY_OTP_DATA_FAILURE, VERIFY_OTP_DATA_REQUEST, VERIFY_OTP_DATA_SUCCESS,
    REGISTER_DATA_REQUEST, REGISTER_DATA_SUCCESS, REGISTER_DATA_FAILURE, GET_LOOKINGFOR_DATA_REQUEST, GET_LOOKINGFOR_DATA_SUCCESS, GET_LOOKINGFOR_DATA_FAILURE, SOCIALLOGIN_DATA_REQUEST, SOCIALLOGIN_DATA_SUCCESS, SOCIALLOGIN_DATA_FAILURE
} from "../../modules/Login/LoginConstants";
import { GET_CITY_DATA_API, GET_COUNTRIES_DATA_API, GET_LOOKINGFOR_DATA_API, GET_RELATIONSHIP_DATA_API, GET_STATE_DATA_API, REGISTER_DATA_API, SEND_OTP_DATA_API, SOCIAL_LOGIN_DATA_API, VERIFY_OTP_DATA_API } from "../urls";

const getRelationshipDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: GET_RELATIONSHIP_DATA_API,
            types: [GET_RELATIONSHIP_DATA_REQUEST,
                GET_RELATIONSHIP_DATA_SUCCESS,
                GET_RELATIONSHIP_DATA_FAILURE],
            body,
            is_form_data: false
        }
    }
}

const getLookingForDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: GET_LOOKINGFOR_DATA_API,
            types: [GET_LOOKINGFOR_DATA_REQUEST,
                GET_LOOKINGFOR_DATA_SUCCESS,
                GET_LOOKINGFOR_DATA_FAILURE],
            body,
            is_form_data: false
        }
    }
}
const getCountriesDataApi = () => {
    return {
        [GET_API]: {
            endpoint: GET_COUNTRIES_DATA_API,
            types: [GET_COUNTRIES_DATA_REQUEST,
                GET_COUNTRIES_DATA_SUCCESS,
                GET_COUNTRIES_DATA_FAILURE]
        }
    }
}

const getStateDataApi = (id) => {
    return {
        [GET_API]: {
            endpoint: GET_STATE_DATA_API + '?country_id=' + id,
            types: [GET_STATE_DATA_REQUEST,
                GET_STATE_DATA_SUCCESS,
                GET_STATE_DATA_FAILURE]
        }
    }
}

const getCityDataApi = (id) => {
    return {
        [GET_API]: {
            endpoint: GET_CITY_DATA_API + '?state_id=' + id,
            types: [GET_CITY_DATA_REQUEST,
                GET_CITY_DATA_SUCCESS,
                GET_CITY_DATA_FAILURE]
        }
    }
}

const sendOtpDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: SEND_OTP_DATA_API,
            types: [SEND_OTP_DATA_REQUEST,
                SEND_OTP_DATA_SUCCESS,
                SEND_OTP_DATA_FAILURE],
            body,
            is_form_data: false
        }
    }
}

const verifyOtpDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: VERIFY_OTP_DATA_API,
            types: [VERIFY_OTP_DATA_REQUEST,
                VERIFY_OTP_DATA_SUCCESS,
                VERIFY_OTP_DATA_FAILURE],
            body,
            is_form_data: false
        }
    }
}

const registerDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: REGISTER_DATA_API,
            types: [REGISTER_DATA_REQUEST,
                REGISTER_DATA_SUCCESS,
                REGISTER_DATA_FAILURE],
            body,
            is_form_data: true
        }
    }
}


const socialLoginDataApi = (body) => {
    return {
        [POST_API]: {
            endpoint: SOCIAL_LOGIN_DATA_API ,
            types: [SOCIALLOGIN_DATA_REQUEST,
                SOCIALLOGIN_DATA_SUCCESS,
                SOCIALLOGIN_DATA_FAILURE],
                body
        }
    }
}

export {
    getRelationshipDataApi, getCountriesDataApi,socialLoginDataApi,
    getStateDataApi, getCityDataApi,
    sendOtpDataApi, verifyOtpDataApi,
    registerDataApi , getLookingForDataApi
}