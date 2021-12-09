import { POST_API } from "../../main/fetch"
import { DEACTIVATE_ACTIVATE_API_FAILURE, DEACTIVATE_ACTIVATE_API_REQUEST, DEACTIVATE_ACTIVATE_API_SUCCESS, GET_PLAN_DETAIL_API_FAILURE, GET_PLAN_DETAIL_API_REQUEST, GET_PLAN_DETAIL_API_SUCCESS, LOGOUT_API_FAILURE, LOGOUT_API_REQUEST, LOGOUT_API_SUCCESS, RAZORPAY_PAYMENT_API_FAILURE, RAZORPAY_PAYMENT_API_REQUEST, RAZORPAY_PAYMENT_API_SUCCESS, STORE_RAZORPAY_PAYMENT_API_FAILURE, STORE_RAZORPAY_PAYMENT_API_REQUEST, STORE_RAZORPAY_PAYMENT_API_SUCCESS, UPDATE_PROFILE_DATA_FAILURE, UPDATE_PROFILE_DATA_REQUEST, UPDATE_PROFILE_DATA_SUCCESS } from "../../modules/Profile/ProfileConstants"
import { DEACTIVATE_ACTIVATE_API, GET_PLAN_DETAIL_API, LOGOUT_API, RAZORPAY_PAYMENT_API, STORE_RAZORPAY_PAYMENT_API, UPDATE_PROFILE_API } from "../urls"

const updateProfileApi = (body) => {
    return {
        [POST_API]: {
            endpoint: UPDATE_PROFILE_API,
            types: [UPDATE_PROFILE_DATA_REQUEST,
                UPDATE_PROFILE_DATA_SUCCESS,
                UPDATE_PROFILE_DATA_FAILURE],
            body,
            is_form_data: true
        }
    }
}
const getPlanDetailApi = (body) => {
    return {
        [POST_API]: {
            endpoint: GET_PLAN_DETAIL_API,
            types: [GET_PLAN_DETAIL_API_REQUEST,
                GET_PLAN_DETAIL_API_SUCCESS,
                GET_PLAN_DETAIL_API_FAILURE],
            body
        }
    }
}
const LogoutApi = (body) => {
    return {
        [POST_API]: {
            endpoint: LOGOUT_API,
            types: [LOGOUT_API_REQUEST,
                LOGOUT_API_SUCCESS,
                LOGOUT_API_FAILURE],
            body
        }
    }
}
const activatedeactivateApi = (body) => {
    return {
        [POST_API]: {
            endpoint: DEACTIVATE_ACTIVATE_API,
            types: [DEACTIVATE_ACTIVATE_API_REQUEST,
                DEACTIVATE_ACTIVATE_API_SUCCESS,
                DEACTIVATE_ACTIVATE_API_FAILURE],
            body
        }
    }
}
const razorpayPaymentApi = (body) => {
    return {
        [POST_API]: {
            endpoint: RAZORPAY_PAYMENT_API,
            types: [RAZORPAY_PAYMENT_API_REQUEST,
                RAZORPAY_PAYMENT_API_SUCCESS,
                RAZORPAY_PAYMENT_API_FAILURE],
            body
        }
    }
}
const storeRazorpayPaymentApi = (body) => {
    return {
        [POST_API]: {
            endpoint: STORE_RAZORPAY_PAYMENT_API,
            types: [STORE_RAZORPAY_PAYMENT_API_REQUEST,
                STORE_RAZORPAY_PAYMENT_API_SUCCESS,
                STORE_RAZORPAY_PAYMENT_API_FAILURE],
            body
        }
    }
}
export{updateProfileApi ,getPlanDetailApi ,LogoutApi,activatedeactivateApi ,razorpayPaymentApi ,storeRazorpayPaymentApi}