import { CHANGE_ACTIVATE_DEACTIVATE_INPUT, CHANGE_RAZORPAY_PAYMENT_DETAIL, CHANGE_UPDATE_PROFILE_INPUT, CLEAR_DEACTIVATE_ACTIVATE_RESPONSE, CLEAR_LOGOUT_RESPONSE, CLEAR_PLAN_DETAIL_RESPONSE, CLEAR_RAZORPAY_PAYMENT_RESPONSE, CLEAR_STORE_RAZORPAY_PAYMENT_RESPONSE, CLEAR_UPDATE_PROFILE_RESPONSE, DEACTIVATE_ACTIVATE_API_FAILURE, DEACTIVATE_ACTIVATE_API_REQUEST, DEACTIVATE_ACTIVATE_API_SUCCESS, GET_PLAN_DETAIL_API_FAILURE, GET_PLAN_DETAIL_API_REQUEST, GET_PLAN_DETAIL_API_SUCCESS, LOGOUT_API_FAILURE, LOGOUT_API_REQUEST, LOGOUT_API_SUCCESS, RAZORPAY_PAYMENT_API_FAILURE, RAZORPAY_PAYMENT_API_REQUEST, RAZORPAY_PAYMENT_API_SUCCESS, STORE_RAZORPAY_PAYMENT_API_FAILURE, STORE_RAZORPAY_PAYMENT_API_REQUEST, STORE_RAZORPAY_PAYMENT_API_SUCCESS, UPDATE_PROFILE_DATA_FAILURE, UPDATE_PROFILE_DATA_REQUEST, UPDATE_PROFILE_DATA_SUCCESS } from "./ProfileConstants"

const initialState = {
    profileInfo: {
        profile_photo: "",
        profile_photo_one: "",
        profile_photo_two: "",
        profile_photo_three: "",
        profile_photo_four: "",
        profile_photo_five: "",
        img_data: "",
        img_data_one: "",
        img_data_two: "",
        img_data_three: "",
        img_data_four: "",
        img_data_five: "",
        name: "",
        dob: "",
        bio: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        my_relationship: "",
        my_interest: "",
        my_profession: "",
        lookingFor: [],
        my_hobbies: [],
        country: "",
        state: "",
        city: ""
    },
    accountDeativated: true,
    updateProfileApi: {
        updateProfileLoading: false,
        updateProfileStatus: "",
        updateProfileMessage: "",
        updateProfileSucess: ""
    },
    getPlanListApi: {
        PlanListLoading: false,
        PlanListStatus: "",
        PlanListMessage: "",
        PlanList: [],
        planDetail: "",
        planInfo:[]
    },

    logoutApi: {
        logoutLoading: false,
        logoutStatus: "",
        logoutMessage: "",
        logoutSuccess: ""
    },
    deactivateActivateApi: {
        activateLoading: false,
        activateStatus: ""
    },
    razorpayDetail: {
        order_id: "",
        amount: "",
        subscription_id: "",
        plan_id :""
    },
    razorpayApi: {
        razorpayLoading: false,
        razorpayStatus: "",
        razorpayError: ""
    },
    storeRazorpayApi :{
        storeRazorpayLoading: false,
        storeRazorpayStatus: "",
        storeRazorpayError: ""  ,
        storeRazorpayMessage:"" 
    }
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_UPDATE_PROFILE_INPUT:
            return {
                ...state,
                ...{ profileInfo: { ...state.profileInfo, ...action.newState } }
            }
        case UPDATE_PROFILE_DATA_REQUEST:
            return {
                ...state,
                ...{ updateProfileApi: { ...state.updateProfileApi, ...{ updateProfileLoading: true } } }
            }
        case UPDATE_PROFILE_DATA_SUCCESS:
            const { response: { data: { success, message } } } = action;

            let updateProfileSuccess = {
                updateProfileLoading: false,
                updateProfileStatus: 200,
                updateProfileMessage: message,
                updateProfileSucess: success
            }
            return {
                ...state,
                ...{
                    updateProfileApi: { ...state.updateProfileApi, ...updateProfileSuccess }
                }
            }
        case UPDATE_PROFILE_DATA_FAILURE:
            let updateProfileFailure = {
                updateProfileLoading: false,
                updateProfileStatus: action.response.status,
                updateProfileMessage: action.response.message,
                updateProfileSucess: ""
            }
            return {
                ...state,
                ...{
                    updateProfileApi: { ...state.updateProfileApi, ...updateProfileFailure }
                }
            }
        case CLEAR_UPDATE_PROFILE_RESPONSE:
            let clearApiResponse = {
                updateProfileStatus: "",
                updateProfileMessage: "",
                updateProfileSucess: ""
            }
            return {
                ...state,
                ...{
                    updateProfileApi: { ...state.updateProfileApi, ...clearApiResponse }
                }
            }
        case GET_PLAN_DETAIL_API_REQUEST:
            return {
                ...state,
                ...{ getPlanListApi: { ...state.getPlanListApi, ...{ PlanListLoading: true } } }
            }
        case GET_PLAN_DETAIL_API_SUCCESS:
            const { response: { data: { plan_list, plan_detail ,plan_info } } } = action;
            let planListSuccess = {
                PlanListLoading: false,
                PlanListStatus: 200,
                PlanListMessage: action.response.data.message,
                PlanList: !!plan_list? plan_list :[],
                planDetail: !!plan_detail ? plan_detail: "",
                planInfo :!!plan_info ? plan_info: []
            }
            return {
                ...state,
                ...{
                    getPlanListApi: { ...state.getPlanListApi, ...planListSuccess }
                }
            }
        case GET_PLAN_DETAIL_API_FAILURE:
            let planListFailure = {
                PlanListLoading: false,
                PlanListStatus: action.response.status,
                PlanListMessage: "",
                PlanList: [],
                planDetail: "",
                planInfo:[]
            }
            return {
                ...state,
                ...{
                    getPlanListApi: { ...state.getPlanListApi, ...planListFailure }
                }
            }
        case CLEAR_PLAN_DETAIL_RESPONSE:
            let clearPlanResponse = {
                PlanListStatus: "",
                PlanListMessage: "",
                planDetail: ""
                
            }
            return {
                ...state,
                ...{
                    getPlanListApi: { ...state.getPlanListApi, ...clearPlanResponse }
                }
            }
        case LOGOUT_API_REQUEST:
            return {
                ...state,
                ...{ logoutApi: { ...state.logoutApi, ...{ logoutLoading: true } } }
            }
        case LOGOUT_API_SUCCESS:
            let logoutApiSuccess = {
                logoutLoading: false,
                logoutStatus: 200,
                logoutMessage: action.response.data.message,
                logoutSuccess: action.response.data.success
            }
            return {
                ...state,
                ...{
                    logoutApi: { ...state.logoutApi, ...logoutApiSuccess }
                }
            }
        case LOGOUT_API_FAILURE:
            let logoutFailure = {
                logoutLoading: false,
                logoutStatus: action.response.status,
                logoutMessage: "",
                logoutSuccess: ""

            }
            return {
                ...state,
                ...{
                    logoutApi: { ...state.logoutApi, ...logoutFailure }
                }
            }
        case CLEAR_LOGOUT_RESPONSE:
            let logoutResponse = {
                logoutStatus: "",
                logoutMessage: "",
                logoutSuccess: ""
            }
            return {
                ...state,
                ...{
                    logoutApi: { ...state.logoutApi, ...logoutResponse }
                }
            }
        case CHANGE_ACTIVATE_DEACTIVATE_INPUT:
            return {
                ...state,
                ...action.newState
            }
        case DEACTIVATE_ACTIVATE_API_REQUEST:
            return {
                ...state,
                ...{ deactivateActivateApi: { ...state.deactivateActivateApi, ...{ activateLoading: true } } }
            }
        case DEACTIVATE_ACTIVATE_API_SUCCESS:
            let activateSuccess = {
                activateLoading: false,
                activateStatus: 200,
            }
            return {
                ...state,
                ...{
                    deactivateActivateApi: { ...state.deactivateActivateApi, ...activateSuccess },
                    accountDeativated: action.response.data.is_active == 2 ? true : false
                }
            }
        case DEACTIVATE_ACTIVATE_API_FAILURE:
            let activateFailure = {
                logoutLoading: false,
                activateStatus: action.response.status,

            }
            return {
                ...state,
                ...{
                    deactivateActivateApi: { ...state.deactivateActivateApi, ...activateFailure }
                }
            }
        case CLEAR_DEACTIVATE_ACTIVATE_RESPONSE:
            let clearActivateResponse = {
                activateStatus: ""
            }
            return {
                ...state,
                ...{
                    deactivateActivateApi: { ...state.deactivateActivateApi, ...clearActivateResponse },
                    accountDeativated: false
                }
            }
        case CHANGE_RAZORPAY_PAYMENT_DETAIL:
            return {
                ...state,
                ...{ razorpayDetail: { ...state.razorpayDetail, ...action.newState } }
            }
        case RAZORPAY_PAYMENT_API_REQUEST:
            return {
                ...state,
                ...{ razorpayApi: { ...state.razorpayApi, ...{ razorpayLoading: true } } }
            }
        case RAZORPAY_PAYMENT_API_SUCCESS:
            let razorpaySuccess = {
                razorpayLoading: false,
                razorpayStatus: 200,
                razorpayError: action.response.data.error
            }
            let rayzerDetails = {
                amount: !!action.response.data.data ?action.response.data.data.amount : "",
                subscription_id: !!action.response.data.data.subscription_id ?action.response.data.data.subscription_id:"",
                order_id:!!action.response.data.data.order_id ?action.response.data.data.order_id:""
            }
            return {
                ...state,
                ...{
                    razorpayApi: { ...state.razorpayApi, ...razorpaySuccess },
                    razorpayDetail: { ...state.razorpayDetail, ...rayzerDetails }
                }
            }
        case RAZORPAY_PAYMENT_API_FAILURE:
            let razorpayFailure = {
                razorpayLoading: false,
                razorpayStatus: 200,
                razorpayError: action.response.status
            }
            let failRazorDetail = {
                amount: "",
                subscription_id: ""
            }
            return {
                ...state,
                ...{
                    razorpayApi: { ...state.razorpayApi, ...razorpayFailure },
                    razorpayDetail: { ...state.razorpayDetail, ...failRazorDetail }
                }
            }
        case CLEAR_RAZORPAY_PAYMENT_RESPONSE:
            let razorpayClear = {
                razorpayStatus: "",
                razorpayError: ""
            }
            return {
                ...state,
                ...{
                    razorpayApi: { ...state.razorpayApi, ...razorpayClear },
                }
            }
            case STORE_RAZORPAY_PAYMENT_API_REQUEST:
                return {
                    ...state,
                    ...{ storeRazorpayApi: { ...state.storeRazorpayApi, ...{ storeRazorpayLoading: true } } }
                }
            case STORE_RAZORPAY_PAYMENT_API_SUCCESS:
                let storerazorpaySuccess = {
                    storeRazorpayLoading: false,
                    storeRazorpayStatus: action.response.data.status_code,
                    storeRazorpayError: action.response.data.error,
                    storeRazorpayMessage:action.response.data.message
                }
                return {
                    ...state,
                    ...{
                        storeRazorpayApi: { ...state.storeRazorpayApi, ...storerazorpaySuccess }
                    }
                }
            case STORE_RAZORPAY_PAYMENT_API_FAILURE:
                let storeRazorpayFailure = {
                    storeRazorpayLoading: false,
                    storeRazorpayError: "",
                    storeRazorpayStatus: action.response.status,
                    storeRazorpayMessage:""
                }
                return {
                    ...state,
                    ...{
                        storeRazorpayApi: { ...state.storeRazorpayApi, ...storeRazorpayFailure }
                    }
                }
            case CLEAR_STORE_RAZORPAY_PAYMENT_RESPONSE:
                let clearRazorpay = {
                    storeRazorpayStatus: "",
                    storeRazorpayError: "",
                    storeRazorpayMessage:""
                }
                return {
                    ...state,
                    ...{
                        storeRazorpayApi: { ...state.storeRazorpayApi, ...clearRazorpay },
                    }
                }
        default:
            return state
    }
}