import io from 'socket.io-client'
// const API_BASE_URL = 'https://moshmatch.com/moshclone/moshapp/api';
const API_BASE_URL = 'https://moshmatch.com/apprich/api';

const SOCKET = io('https://moshmatch.com:444/', {

});
// ---------------------- login API's start ----------------------------------//

const getApiUrl = (endpoint) => API_BASE_URL + endpoint;
const GET_RELATIONSHIP_DATA_API = getApiUrl("/relationship");
const GET_LOOKINGFOR_DATA_API = getApiUrl("/getEthnicitiesLookingFor");

const GET_COUNTRIES_DATA_API = getApiUrl("/countryList");
const GET_STATE_DATA_API = getApiUrl("/statesList");
const GET_CITY_DATA_API = getApiUrl("/citiesList");
const SEND_OTP_DATA_API = getApiUrl("/sendOtp");
const VERIFY_OTP_DATA_API = getApiUrl("/verifyOtp");
const SOCIAL_LOGIN_DATA_API = getApiUrl("/socialLogin");
const REGISTER_DATA_API = getApiUrl("/register");
const GET_SINGLE_PROFILE_API = getApiUrl("/getSingleUserDetail");
const GET_FILTER_USER_API = getApiUrl("/getUsers");
const MY_LIKE_LIST_API = getApiUrl("/myFavList");
const ADD_REMOVE_FAVORITE_API = getApiUrl("/addRemoveFav");
const REPORT_USER_API = getApiUrl("/reportUser");
const REPORT_LIST_API = getApiUrl("/ReportList");
const PUR_USER_API = getApiUrl("/addPurr");
const BLOCK_UNBLOCK_API = getApiUrl("/blockUnblock");
const UPDATE_PROFILE_API = getApiUrl("/updateProfile");
const GET_PLAN_DETAIL_API = getApiUrl("/premiumPlansList");
const LOGOUT_API = getApiUrl("/logout");
const DEACTIVATE_ACTIVATE_API = getApiUrl("/activateInactivate");
const CHAT_LIST_API = getApiUrl("/ChatList");
const RAZORPAY_PAYMENT_API = getApiUrl("/razorpayPayment")
const STORE_RAZORPAY_PAYMENT_API = getApiUrl("/storePayment")
const CHECK_MESSAGE_LIMIT_API = getApiUrl("/updateMessageLimit")

// ---------------------- login API's end ----------------------------------//
export {
    GET_RELATIONSHIP_DATA_API, GET_COUNTRIES_DATA_API, GET_STATE_DATA_API, MY_LIKE_LIST_API, REPORT_USER_API,
    GET_CITY_DATA_API, SEND_OTP_DATA_API, VERIFY_OTP_DATA_API, SOCIAL_LOGIN_DATA_API, ADD_REMOVE_FAVORITE_API,
    REGISTER_DATA_API, GET_LOOKINGFOR_DATA_API, GET_SINGLE_PROFILE_API, GET_FILTER_USER_API, REPORT_LIST_API,
    PUR_USER_API,BLOCK_UNBLOCK_API,UPDATE_PROFILE_API,GET_PLAN_DETAIL_API ,LOGOUT_API ,DEACTIVATE_ACTIVATE_API,
    CHAT_LIST_API, SOCKET ,RAZORPAY_PAYMENT_API ,STORE_RAZORPAY_PAYMENT_API ,CHECK_MESSAGE_LIMIT_API
}
