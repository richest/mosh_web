import { CHANGE_IS_AUTH, CHANGE_ONLINE } from "../constants/AuthConstants"

const changeIsAuth = (newState) => {
    return { type: CHANGE_IS_AUTH, newState }
}

const changeOnline = (onlines) => {
    return { type: CHANGE_ONLINE, onlines }
}
export {
    changeIsAuth,
    changeOnline  
}