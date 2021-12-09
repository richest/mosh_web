import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MoshRoutes } from './main/routes';
import {  useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLookingForDataApi, getRelationshipDataApi } from './library/api/LoginApiService';
import { SOCKET } from './library/urls';
import { changeSocketId } from './modules/Chat/ChatAction';
import { getCookie, setCookie } from './library/utilities/functions';
import { clearSingleProfileResponse } from './modules/SingleProfile/SingleProfileAction';
import { getSingleProfileDataApi } from './library/api/SingleProfileApiService';
import { getPlanDetailApi } from './library/api/profileApiService';
import { clearStoreRazorpayResponse } from './modules/Profile/ProfileActions';
import { changeOnline } from './library/common/actions/AuthActions';

let moshOnlineUsers;

function App() {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const authState = useSelector(state => state.Authreducer);
    const chatState = useSelector(state => state.ChatReducer);
    const profileState = useSelector(state => state.ProfileReducer);
    const userDataState = useSelector(state => state.SingleProfileReducer);
    const { storeRazorpayApi: { storeRazorpayStatus, storeRazorpayError } } = profileState;
    const { getSingleProfile: { singleProfileDataResponse } } = userDataState

    useEffect(() => {
        if (!!authState.is_auth) {
            if (window.location.pathname.match("/message-box")) {
                window.location.href = "/webapp/chat"
            }
            if(!window.location.pathname.match("/single-profile") &&
            !window.location.pathname.match("/message-box") && !window.location.pathname.match("/profile")){
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                user_id: getCookie("user_id")
            }
            dispatch(getSingleProfileDataApi(bodyParameter))
        }
            const bodyParameters = {
                session_id: localStorage.getItem("session_id"),
            }
            dispatch(getPlanDetailApi(bodyParameters))
            SOCKET.connect()
            SOCKET.on('connect', function (socket) {
                dispatch(changeSocketId({ socket_id: SOCKET.id }))
                setCookie("socket_id", SOCKET.id, 1);
                SOCKET.emit('establish_socket_connection', { "u_id": getCookie("user_id"), socket_id: SOCKET.id });
                moshOnlineUsers = window.setInterval(() => {
                    console.log("sckhgdjgv")
                    SOCKET.emit('get_online_users_in_mosh', { socket_id: SOCKET.id });
                }, 1000)
            });
        }
        else {
            dispatch(changeOnline(0))
            clearInterval(moshOnlineUsers);
        }
    }, [authState.is_auth])

    useEffect(() => {
        if(storeRazorpayStatus==200 && !storeRazorpayError){
            addToast("your plan activated sucessfully", {
                appearance: 'success',
                autoDismiss: true,
            });
            dispatch(clearStoreRazorpayResponse())
        }

    },[storeRazorpayStatus])

    useEffect(() => {
        SOCKET.off('get_online_users_in_mosh').on('get_online_users_in_mosh', function (data) {
            if (data.socket_id == getCookie("socket_id")) {
                dispatch(changeOnline(data.online))
                console.log(data.online, "onlibne....")
            }
          });

        const body = {};
        dispatch(getRelationshipDataApi(body));
        const bodyparam = { code: 5 }
        dispatch(getLookingForDataApi(bodyparam));
        return () => {
            dispatch(clearSingleProfileResponse())
        }
    }, [])

    useEffect(() => {
        if (!!chatState.socket_id) {
            SOCKET.emit('establish_socket_connection', { "u_id": getCookie("user_id"), socket_id: chatState.socket_id });
        }
    }, [chatState.socket_id])

    return (
    
            <Router basename={'/webapp'}>
                <Switch>
                    <MoshRoutes is_auth={authState.is_auth} />
                </Switch>
            </Router>
    
    )
}

export default App;
