import { CHANGE_ACTIVATE_DEACTIVATE_INPUT, CHANGE_RAZORPAY_PAYMENT_DETAIL, CHANGE_UPDATE_PROFILE_INPUT, CLEAR_DEACTIVATE_ACTIVATE_RESPONSE, CLEAR_LOGOUT_RESPONSE, CLEAR_PLAN_DETAIL_RESPONSE, CLEAR_RAZORPAY_PAYMENT_RESPONSE, CLEAR_STORE_RAZORPAY_PAYMENT_RESPONSE, CLEAR_UPDATE_PROFILE_RESPONSE } from "./ProfileConstants"

 const changeUpdateProfileInput = (newState) => {
     return{ type: CHANGE_UPDATE_PROFILE_INPUT , newState}
 }
 const clearUpdateProfileResponse =(newState) => {
     return{type:CLEAR_UPDATE_PROFILE_RESPONSE ,newState}
 }
 const clearPlanListResponse =(newState) => {
     return{ type:CLEAR_PLAN_DETAIL_RESPONSE , newState}
 }
 const clearlogoutResponse =(newState) => {
     return {type:CLEAR_LOGOUT_RESPONSE ,newState}
 }
 const changeActivateDeactivate =(newState)=> {
     return{ type:CHANGE_ACTIVATE_DEACTIVATE_INPUT, newState}
 }
 const clearActivateDeactivate =(newState)=> {
    return{ type:CLEAR_DEACTIVATE_ACTIVATE_RESPONSE, newState}
}
const changeRazorPayDetail = (newState) => {
    return{type:CHANGE_RAZORPAY_PAYMENT_DETAIL , newState}
}
const clearRazorPayResponse = (newState) => {
    return{type:CLEAR_RAZORPAY_PAYMENT_RESPONSE , newState}
}
const clearStoreRazorpayResponse =(newState) => {
    return {type:CLEAR_STORE_RAZORPAY_PAYMENT_RESPONSE , newState}
}
 export {changeUpdateProfileInput ,clearUpdateProfileResponse ,clearPlanListResponse,clearlogoutResponse,
    changeActivateDeactivate ,clearActivateDeactivate ,changeRazorPayDetail ,clearRazorPayResponse,
    clearStoreRazorpayResponse}