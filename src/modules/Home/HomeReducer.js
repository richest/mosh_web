import { CHANGE_FILTER_INPUT, CHANGE_FILTER_LIST, CLEAR_FILTER_LIST_AFTER_CALL_RESPONSE, CLEAR_FILTER_API_RESPONSE, CLEAR_FILTER_INPUT, CLEAR_FILTER_LIST_RESPONSE, GET_FILTER_DATA_FAILURE, GET_FILTER_DATA_REQUEST, GET_FILTER_DATA_SUCCESS } from "./HomeConstants"

const initialState = {
    filterInputInfo: {
        page: 0,
        age: [18, 100],
        distance: 20,
        relationshipStatus: "",
        lookingFor: [],
        interests: ""
    },
    filterList: [],
    filterApi: {
        getFilterApiLoading: false,
        getFilterApiStatus: "",
        getFilterApiSucess: "",
        getFilterResonse: ""
    }
}

export const Homereducer = (state = initialState, action) => {
    const pathname = window.location.pathname
    console.log(pathname, "pathname...")
    switch (action.type) {
        case CHANGE_FILTER_INPUT:
            return {
                ...state,
                ...{ filterInputInfo: { ...state.filterInputInfo, ...action.newState } }
            }
        case GET_FILTER_DATA_REQUEST:
            return {
                ...state,
                ...{ filterApi: { ...state.filterApi, ...{ getFilterApiLoading: true } } }
            }
        case GET_FILTER_DATA_SUCCESS:
            console.log(action, "action...");
            const { response: { data } } = action;

            let filterSuccess = {
                getFilterApiLoading: false,
                getFilterApiStatus: 200,
                getFilterApiSucess: data.success,
                getFilterResonse: !!data.userData ? data.userData : []
            }
            return {
                ...state,
                ...{
                    filterApi: { ...state.filterApi, ...filterSuccess },
                    filterList: !!data.userData ? (pathname == "/home" ? data.userData : [...state.filterList, ...data.userData]) : []
                }
            }


        case GET_FILTER_DATA_FAILURE:
            console.log(action, "action...");
            // const { response: { data: { message } } } = action;
            let filterFailure = {
                getFilterApiLoading: false,
                getFilterApiStatus: action.status,
                getFilterApiSucess: "",
                getFilterResonse: ""
            }
            return {
                ...state,
                ...{
                    filterApi: { ...state.filterApi, ...filterFailure },
                    filterList: []
                }
            }
        case CLEAR_FILTER_INPUT:
            let clearInputFiled = {
                age: [18, 100],
                distance: 20,
                relationshipStatus: "",
                lookingFor: [],
                interests: ""
            }
            return {
                ...state,
                ...{
                    filterInputInfo: { ...state.filterInputInfo, ...clearInputFiled },
                }
            }
        case CLEAR_FILTER_LIST_RESPONSE:
            let clearResponse = {
                getFilterApiStatus: "",
                getFilterApiSucess: "",
                getFilterResonse: ""
            }
            return {
                ...state,
                ...{
                    filterApi: { ...state.filterApi, ...clearResponse },
                    filterList: []
                }
            }

            case CLEAR_FILTER_LIST_AFTER_CALL_RESPONSE:
            let clearAfterCallResponse = {
                getFilterApiStatus: "",
                getFilterApiSucess: "",
                getFilterResonse: ""
            }
            return {
                ...state,
                ...{
                    filterApi: { ...state.filterApi, ...clearAfterCallResponse }
                }
            }
        case CHANGE_FILTER_LIST:
            return {
              ...state ,
              ...action.newState
            }
        default:
            return state
    }
}