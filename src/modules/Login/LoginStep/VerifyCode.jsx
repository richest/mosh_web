import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { verifyOtpDataApi } from '../../../library/api/LoginApiService';
import { changeIsAuth } from '../../../library/common/actions/AuthActions';
import { Button } from '../../../library/common/components';
import { SOCKET } from '../../../library/urls';
import { getCookie, setCookie } from '../../../library/utilities/functions';
import { changeSocketId } from '../../Chat/ChatAction';
import { changeVerifyCodeInput, changeLoginStep, changeVerifyOtpToCheck } from '../LoginActions';
import { addValidation } from '../validations';

let moshOnlineUsers;
const VerifyCode = ({ step }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [otpErr, setOtpErr] = useState({});
    const { addToast } = useToasts();
    const verifyCodeState = useSelector(state => state.LoginReducer);
    const { verifyCode: { code }  } = verifyCodeState;
    const { main: { contact, cntCode } } = verifyCodeState;
 
    console.log(verifyCodeState, "verifyOtpToCheck check");
    const authState = useSelector(state => state.Authreducer);
    console.log(authState.is_auth, "auth State")

    useEffect(() => {
        if (verifyCodeState.verifyOtpToCheck ===true) {
            if(!!verifyCodeState.verifyOtpUserData){
                localStorage.setItem("session_id" , verifyCodeState.verifyOtpUserData.session_id);
              setCookie("user_id" , verifyCodeState.verifyOtpUserData.id,1);
              setCookie("profile" , JSON.stringify(verifyCodeState.verifyOtpUserData),1);
              dispatch(changeIsAuth({is_auth: true}))
                history.push("/home")
                dispatch(changeSocketId({ socket_id: SOCKET.id }))
                setCookie("socket_id", SOCKET.id, 1);
                SOCKET.emit('establish_socket_connection', { "u_id": getCookie("user_id"), socket_id: SOCKET.id });
                SOCKET.connect()
                moshOnlineUsers = window.setInterval(() => {
                    console.log("sckhgdjgv")
                    SOCKET.emit('get_online_users_in_mosh', { socket_id: SOCKET.id });
                }, 1000)
            }
            else{
            dispatch(changeLoginStep({ step: step + 1 }))
            dispatch(changeVerifyOtpToCheck({ verifyOtpToCheck: "" }));
            }
        }
        else if(verifyCodeState.verifyOtpToCheck ===false) {
            addToast(verifyCodeState.verifyOtpApiMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
             dispatch(changeVerifyOtpToCheck({ verifyOtpToCheck: "" }));
        }
    }, [verifyCodeState.verifyOtpToCheck])
    const changeOtp = (value) => {
        console.log(value, "otp value")
        dispatch(changeVerifyCodeInput({ "code": value }));
    }
    const otpvalidation = () => {
        const otpErr = {};
        let Valid = true;
        if (code.split("").length < 4) {
            otpErr.otpShort = "Please enter valid otp"
            Valid = false;
        }
        setOtpErr(otpErr);
        return Valid;
    }
    const verifyHandle = () => {
        const validation = otpvalidation();
        if (validation) {
            const bodyParams = {
                country_code: cntCode,
                phone: contact,
                otp: code,
                device_type: 3,
                device_token: ""
            }
            dispatch(verifyOtpDataApi(bodyParams))
        }
    }
    const handleback =() => {
       dispatch(changeLoginStep({ step: step - 1 }));
       dispatch(changeVerifyCodeInput({ code: "" }))
    }

    return (
        <div className="signup-inner" id="login-tab-2">
            <div className="cont_screen">
                <div className="signup-header">
                    <a href="javascript:void(0)" className="login-back-1 btn-back" onClick={handleback}><i className="fas fa-chevron-left" /></a>
                    <h4 className="theme-txt">Enter Code</h4>
                    <p>Enter 4 digit verification code you<br /> received on  {'+' + cntCode + ' ' + contact} </p>
                </div>
                <div className="form-group otp-field">
                    <OtpInput value={code} onChange={(value) => changeOtp(value)} shouldAutoFocus numInputs={4} isInputNum />
                </div>
                {Object.keys(otpErr).map((key) => {
                    return <div style={{ color: "red" }}>{otpErr[key]}</div>
                })}
                <Button className="btn bg-grd-clr d-block mb-2 btn-countinue-2" href="javascript:void(0)" onClick={verifyHandle}>Verify</Button>
                {/* <Button className="btn btn-trsp d-block" href="javascript:void(0)" onClick={handleResend}>Resend</Button> */}
            </div>
        </div>
    )
}
export default VerifyCode