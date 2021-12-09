import {
    MAIN_STEP_INPUT_CHANGE, VERIFY_CODE_INPUT, ABOUT_INFO_INPUT, ACCOUNT_INFO_INPUT, CHANGE_LOGIN_STEP,
    GET_RELATIONSHIP_DATA_REQUEST, GET_RELATIONSHIP_DATA_SUCCESS, CHANGE_UPLOADIMAGE_INPUT, CHOOSE_LOCATION_INPUT,
    GET_RELATIONSHIP_DATA_FAILURE, CHANGE_LOOKINGFOR_INPUT, GET_COUNTRIES_DATA_REQUEST, GET_COUNTRIES_DATA_SUCCESS, GET_COUNTRIES_DATA_FAILURE, GET_STATE_DATA_REQUEST, GET_STATE_DATA_SUCCESS, GET_STATE_DATA_FAILURE, GET_CITY_DATA_REQUEST, GET_CITY_DATA_SUCCESS, GET_CITY_DATA_FAILURE, SEND_OTP_DATA_REQUEST, SEND_OTP_DATA_SUCCESS, SEND_OTP_DATA_FAILURE, CHANGE_SEND_OTP_STATUS, VERIFY_OTP_DATA_REQUEST, VERIFY_OTP_DATA_SUCCESS, VERIFY_OTP_DATA_FAILURE, CHANGE_VERIFY_OTP_TOCHECK, REGISTER_DATA_REQUEST, REGISTER_DATA_SUCCESS, REGISTER_DATA_FAILURE, GET_LOOKINGFOR_DATA_REQUEST, GET_LOOKINGFOR_DATA_SUCCESS, GET_LOOKINGFOR_DATA_FAILURE, SOCIALLOGIN_DATA_REQUEST, SOCIALLOGIN_DATA_SUCCESS, SOCIALLOGIN_DATA_FAILURE, CLEAR_REGISTER_RESPONSE, SOCIAL_LOGIN_TYPE, CLEAR_SOCIAL_LOGIN_RESPONSE
} from "./LoginConstants"

const initialState = {
    main: {
        contact: "",
        cntCode: 91,
        cntCodeName: "IN",
        loginSocialId:""
    },
    verifyCode: {
        code: ""
    },
    aboutInfo: {
        f_name: "",
        l_name: "",
        email: "",
        agree: false,
        confirm: false
    },
    accountInfo: {
        dob: null,
        heightFeet: "",
        heightInches: "",
        weight: "",
        relationship: [],
        my_relationship: "",
        gender: [],
        my_gender: "",
        body_type: [],
        my_body_type: [],
        hobbies: [],
        my_hobbies: [],
        interest: [],
        my_interest: "",
        education: [],
        my_education: "",
        profession: [],
        my_profession: "",
    },
    uploadImage: {
        img_data: "",
        picture: ""
    },
    chooseLocation: {
        country_list: [],
        city_list: [],
        state_list: [],
        country: "",
        state: "",
        city: ""
    },
    lookingFor: {
        looking: [],
        my_looking: []
    },
    step: 1,

    relationshipApiLoading: false,
    relationshipApiStatus: null,
    relationshipApiErrorMessage: "",

    lookingForApiLoading: false,
    lookingForApiStatus: null,
    lookingForApiErrorMessage: "",

    countrieApiLoading: false,
    countrieApiStatus: null,
    countrieApiErrorMessage: "",

    stateApiLoading: false,
    stateApiStatus: null,
    stateApiErrorMessage: "",

    cityApiLoading: false,
    cityApiStatus: null,
    cityApiErrorMessage: "",

    sendOtpApiLoading: false,
    sendOtpApiStatus: null,
    sendOtpApiErrorMessage: "",

    verifyOtpApiLoading: false,
    verifyOtpApiStatus: null,
    verifyOtpApiMessage: "",
    verifyOtpToCheck: "",
    verifyOtpUserData: "",

    registerApi: {
        registerApiLoading: false,
        registerApiStatus: null,
        registerMessage: "",
        registerApiSucess: "",
        registerDataResponse: ""
    },
    socialLoginApi: {
        socialLoginApiLoading: false,
        socialLoginApiStatus: "",
        socialLoginMessage: "",
        socialLoginApiSucess: "",
        socialLoginDataResponse: "",
        socialLoginIsOlder :""
    },

    socialType: ""

}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAIN_STEP_INPUT_CHANGE:
            return {
                ...state,
                ...{ main: { ...state.main, ...action.newState } }
            }
        case VERIFY_CODE_INPUT:
            return {
                ...state,
                ...{ verifyCode: { ...state.verifyCode, ...action.newState } }
            }
        case ABOUT_INFO_INPUT:
            return {
                ...state,
                ...{ aboutInfo: { ...state.aboutInfo, ...action.newState } }
            }
        case ACCOUNT_INFO_INPUT:
            return {
                ...state,
                ...{ accountInfo: { ...state.accountInfo, ...action.newState } }
            }
        case CHANGE_LOGIN_STEP:
            return {
                ...state,
                ...action.newState
            }
        case CHANGE_UPLOADIMAGE_INPUT:
            return {
                ...state,
                ...{ uploadImage: { ...state.uploadImage, ...action.newState } }
            }
        case GET_RELATIONSHIP_DATA_REQUEST:
            return {
                ...state,
                ...{ relationshipApiLoading: true }
            }
        case CHOOSE_LOCATION_INPUT:
            return {
                ...state,
                ...{ chooseLocation: { ...state.chooseLocation, ...action.newState } }
            }
        case CHANGE_LOOKINGFOR_INPUT:
            return {
                ...state,
                ...{ lookingFor: { ...state.lookingFor, ...action.newState } }
            }
        case GET_RELATIONSHIP_DATA_SUCCESS:
            console.log(action, "action...")
            const { response: { data: { Relationship } } } = action;
            let newStateSuccess = {
                relationship: !!Relationship ? Relationship.relation_ship : [],
                interest: !!Relationship ? Relationship.interestIn : [],
                profession: !!Relationship ? Relationship.profession : [],
                gender: !!Relationship ? Relationship.gender : [],
                body_type: !!Relationship ? Relationship.bodyType : [],
                education: !!Relationship ? Relationship.education : []
            }
            console.log(newStateSuccess, "newState...")
            return {
                ...state,
                ...{
                    relationshipApiLoading: false,
                    relationshipApiStatus: 200,
                    relationshipApiErrorMessage: "",
                    accountInfo: { ...state.accountInfo, ...newStateSuccess },
                    lookingFor: { ...state.lookingFor, ...(!!Relationship ? { looking: Relationship.lookingfors } : { looking: [] }) }
                }
            }
        case GET_RELATIONSHIP_DATA_FAILURE:
            const { response: { data: { message } } } = action;
            let newStateFailure = {
                relationship: [],
                interest: [],
                profession: [],
                gender: [],
                body_type: [],
                education: []
            }
            return {
                ...state,
                ...{
                    relationshipApiLoading: false,
                    relationshipApiStatus: action.status,
                    relationshipApiErrorMessage: message,
                    accountInfo: { ...state.accountInfo, ...newStateFailure },
                    lookingFor: { ...state.lookingFor, ...{ looking: [] } }
                }
            }
        case GET_COUNTRIES_DATA_REQUEST:
            return {
                ...state,
                ...{ countrieApiLoading: true }
            }
        case GET_COUNTRIES_DATA_SUCCESS:
            console.log(action, "action...")
            const { response: { data: { countriesList } } } = action;
            return {
                ...state,
                ...{
                    countrieApiLoading: false,
                    countrieApiStatus: 200,
                    countrieApiErrorMessage: "",
                    chooseLocation: { ...state.chooseLocation, ...(!!countriesList ? { country_list: countriesList } : { country_list: [] }) }
                }
            }
        case GET_COUNTRIES_DATA_FAILURE:
            const apiFailMessage = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    countrieApiLoading: false,
                    countrieApiStatus: action.status,
                    countrieApiErrorMessage: apiFailMessage,
                    chooseLocation: { ...state.chooseLocation, ...{ country_list: [] } }
                }
            }
        case GET_STATE_DATA_REQUEST:
            return {
                ...state,
                ...{ stateApiLoading: true }
            }
        case GET_STATE_DATA_SUCCESS:
            console.log(action, "action...")
            const { response: { data: { states } } } = action;
            return {
                ...state,
                ...{
                    stateApiLoading: false,
                    stateApiStatus: 200,
                    stateApiErrorMessage: "",
                    chooseLocation: { ...state.chooseLocation, ...(!!states ? { state_list: states } : { state_list: [] }) }
                }
            }
        case GET_STATE_DATA_FAILURE:
            const stateFailMessage = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    stateApiLoading: false,
                    stateApiStatus: action.status,
                    stateApiErrorMessage: stateFailMessage,
                    chooseLocation: { ...state.chooseLocation, ...{ state_list: [] } }
                }
            }
        case GET_CITY_DATA_REQUEST:
            return {
                ...state,
                ...{ cityApiLoading: true }
            }
        case GET_CITY_DATA_SUCCESS:
            console.log(action, "action...")
            const { response: { data: { cities } } } = action;
            return {
                ...state,
                ...{
                    cityApiLoading: false,
                    cityApiStatus: 200,
                    cityApiErrorMessage: "",
                    chooseLocation: { ...state.chooseLocation, ...(!!cities ? { city_list: cities } : { city_list: [] }) }
                }
            }
        case GET_CITY_DATA_FAILURE:
            const cityFailMessage = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    cityApiLoading: false,
                    cityApiStatus: action.status,
                    cityApiErrorMessage: cityFailMessage,
                    chooseLocation: { ...state.chooseLocation, ...{ city_list: [] } }
                }
            }
        case SEND_OTP_DATA_REQUEST:
            return {
                ...state,
                ...{ sendOtpApiLoading: true }
            }
        case SEND_OTP_DATA_SUCCESS:
            console.log(action, "action...")
            return {
                ...state,
                ...{
                    sendOtpApiLoading: false,
                    sendOtpApiStatus: 200,
                    sendOtpApiErrorMessage: "",

                }
            }
        case SEND_OTP_DATA_FAILURE:
            const sendOtpError = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    sendOtpApiLoading: false,
                    sendOtpApiStatus: action.status,
                    sendOtpApiErrorMessage: sendOtpError,
                }
            }
        case CHANGE_SEND_OTP_STATUS:
            console.log(state, "send otp action")
            return {
                ...state,
                ...action.newState
            }
        case VERIFY_OTP_DATA_REQUEST:
            return {
                ...state,
                ...{ verifyOtpApiLoading: true }
            }
        case VERIFY_OTP_DATA_SUCCESS:
            console.log(action, "action...")
            const { response: { data: { to_check, userData } } } = action;
            return {
                ...state,
                ...{
                    verifyOtpApiLoading: false,
                    verifyOtpApiStatus: 200,
                    verifyOtpApiMessage: action.response.data.message,
                    verifyOtpToCheck: to_check,
                    verifyOtpUserData: userData
                }
            }
        case VERIFY_OTP_DATA_FAILURE:
            // const verifyOtpError = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    verifyOtpApiLoading: false,
                    verifyOtpApiStatus: action.status,
                    verifyOtpApiMessage: action.response.message,
                    verifyOtpToCheck: "",
                    verifyOtpUserData: ""
                }
            }
        case CHANGE_VERIFY_OTP_TOCHECK:
            return {
                ...state,
                ...action.newState
            }
        case REGISTER_DATA_REQUEST:
            return {
                ...state,
                ...{ registerApi: { ...state.registerApi, ...{ registerApiLoading: true } } }
            }
        case REGISTER_DATA_SUCCESS:
            console.log(action, "action...");
            const { response } = action;

            let registerStateSuccess = {
                registerApiLoading: false,
                registerApiStatus: 200,
                registerMessage: response.data.message,
                registerDataResponse: !!response.data.profile ? response.data.profile : "",
                registerApiSucess: response.data.success
            }
            return {
                ...state,
                ...{
                    registerApi: { ...state.registerApi, ...registerStateSuccess }
                }
            }
        case REGISTER_DATA_FAILURE:
            console.log(action, "action...");
            // const { response: { data: { message } } } = action;
            let registerStateFailure = {
                registerApiLoading: false,
                registerApiStatus: action.status,
                registerMessage: action.response.message,
                registerDataResponse: "",
                registerApiSucess: false
            }
            return {
                ...state,
                ...{
                    registerApi: { ...state.registerApi, ...registerStateFailure }
                }
            }
        case CLEAR_REGISTER_RESPONSE:
            let registerResponseClear = {
                registerApiStatus: "",
                registerMessage: "",
                registerDataResponse: "",
                registerApiSucess: ""
            }
            return {
                ...state,
                ...{
                    registerApi: { ...state.registerApi, ...registerResponseClear }
                }
            }
        case GET_LOOKINGFOR_DATA_REQUEST:
            return {
                ...state,
                ...{ verifyOtpApiLoading: true }
            }
        case GET_LOOKINGFOR_DATA_SUCCESS:
            console.log(action, "action...");
            const { response: { data: { hobbies } } } = action;
            return {
                ...state,
                ...{
                    lookingForApiLoading: false,
                    lookingForApiStatus: 200,
                    lookingForApiErrorMessage: "",
                    accountInfo: { ...state.accountInfo, ...(!!hobbies ? { hobbies: hobbies } : { hobbies: [] }) }
                }
            }
        case GET_LOOKINGFOR_DATA_FAILURE:
            // const lookingForError = { response: { data: { message } } } = action;
            return {
                ...state,
                ...{
                    lookingForApiLoading: false,
                    lookingForApiStatus: action.status,
                    lookingForApiErrorMessage: action.response.message,
                    accountInfo: { ...state.accountInfo, ...{ hobbies: [] } }
                }
            }
        case SOCIALLOGIN_DATA_REQUEST:
            return {
                ...state,
                ...{ socialLoginApi: { ...state.socialLoginApi, ...{ socialLoginApiLoading: true } } }
            }
        case SOCIALLOGIN_DATA_SUCCESS:
            console.log(action, "action...");
            const { response: { data } } = action;
            let socialLoginState = {
                socialLoginApiLoading: false,
                socialLoginApiStatus: data.status,
                socialLoginMessage: data.message,
                socialLoginApiSucess: data.success,
                socialLoginDataResponse: data.profile,
                socialLoginIsOlder:data.is_older
            }
            return {
                ...state,
                ...{
                    socialLoginApi: { ...state.socialLoginApi, ...socialLoginState }
                }
            }
        case SOCIALLOGIN_DATA_FAILURE:
            console.log(action, "action...");
            let socialLoginFailure = {
                socialLoginApiLoading: false,
                socialLoginApiStatus: action.status,
                socialLoginMessage: action.response.message,
                socialLoginApiSucess: false,
                socialLoginDataResponse: "",
                socialLoginIsOlder:""
            }
            return {
                ...state,
                ...{
                    socialLoginApi: { ...state.socialLoginApi, ...socialLoginFailure }
                }
            }
            case CLEAR_SOCIAL_LOGIN_RESPONSE :
                let clearResponse ={
                    socialLoginApiStatus: "",
                    socialLoginMessage: "",
                    socialLoginApiSucess: "",
                    socialLoginDataResponse: "",
                    socialLoginIsOlder:""
                }
                return{
                    ...state,
                    ...{
                        socialLoginApi: { ...state.socialLoginApi, ...clearResponse }
                    }
                }
        case SOCIAL_LOGIN_TYPE:
            return {
                ...state,
                ...action.newState
            }
        default:
            return state
    }
}
