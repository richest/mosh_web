import {
    MAIN_STEP_INPUT_CHANGE, VERIFY_CODE_INPUT, ABOUT_INFO_INPUT, ACCOUNT_INFO_INPUT, CHANGE_LOGIN_STEP,
    CHANGE_UPLOADIMAGE_INPUT, CHOOSE_LOCATION_INPUT , CHANGE_LOOKINGFOR_INPUT ,CHANGE_SEND_OTP_STATUS,
    CHANGE_VERIFY_OTP_TOCHECK,
    CLEAR_REGISTER_RESPONSE,
    SOCIAL_LOGIN_TYPE,
    CLEAR_SOCIAL_LOGIN_RESPONSE} from "./LoginConstants"

const changeMainStepInput = (newState) => {
    return { type: MAIN_STEP_INPUT_CHANGE, newState }
}

const changeVerifyCodeInput = (newState) => {
    return { type: VERIFY_CODE_INPUT, newState }
}

const changeLoginStep = (newState) => {
    return { type: CHANGE_LOGIN_STEP, newState }
}

const changeAboutInfoInput = (newState) => {
    return { type: ABOUT_INFO_INPUT, newState }
}

const changeAccountInfoInput = (newState) => {
    return { type: ACCOUNT_INFO_INPUT, newState }
}

const changeUploadImageInput = (newState) => {
    return { type: CHANGE_UPLOADIMAGE_INPUT, newState }
}

const changeChooseLocation = (newState) => {
    return { type: CHOOSE_LOCATION_INPUT, newState }
}

const changeLookingForInput = (newState) => {
    return{ type:CHANGE_LOOKINGFOR_INPUT , newState}
}

const changeSendOtpStatus = (newState) => {
    return{type: CHANGE_SEND_OTP_STATUS , newState}
}

const changeVerifyOtpToCheck = (newState) => {
    return{type: CHANGE_VERIFY_OTP_TOCHECK , newState}
}
const clearRegisterApiResponse = (newState) => {
    return{ type :CLEAR_REGISTER_RESPONSE , newState}
}
const clearSocialLoginResponse = (newState) => {
    return{type:CLEAR_SOCIAL_LOGIN_RESPONSE , newState}
}
const socialLoginType = (newState) => {
    return{type:SOCIAL_LOGIN_TYPE, newState}
}
export {
    changeMainStepInput, changeVerifyCodeInput, changeAboutInfoInput, changeAccountInfoInput, changeLoginStep,
    changeUploadImageInput, changeChooseLocation , changeLookingForInput , changeSendOtpStatus , changeVerifyOtpToCheck,
    clearRegisterApiResponse ,socialLoginType ,clearSocialLoginResponse
}
