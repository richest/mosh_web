import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import { useToasts } from 'react-toast-notifications';
import { Input, Button, Spinner } from '../../../library/common/components/index'
import { getCookie, getCountries, setCookie } from '../../../library/utilities/functions'
import { changeLoginStep, changeMainStepInput, changeSendOtpStatus, clearSocialLoginResponse, socialLoginType } from '../LoginActions'
import MainStepContinueWith from './MainStepContinueWith';
import { handleMainValidation, addValidation } from '../validations';
import { sendOtpDataApi } from '../../../library/api/LoginApiService'
import { changeIsAuth } from '../../../library/common/actions/AuthActions';
import { useHistory } from 'react-router';
import { SOCKET } from '../../../library/urls';
import { changeSocketId } from '../../Chat/ChatAction';

let moshOnlineUsers;
const MainStep = ({ step }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const contactEl = useRef(null);
    const { addToast } = useToasts();
    const contactElValidation = useRef(null);
    const loginState = useSelector(state => state.LoginReducer);
    const { main: { contact, cntCode, cntCodeName } } = loginState;
    const { socialLoginApi: { socialLoginDataResponse, socialLoginMessage, socialLoginApiStatus,socialLoginIsOlder, socialLoginApiSucess } } = loginState;
    console.log(loginState, "check")

    useEffect(() => {
        if (!!loginState.sendOtpApiStatus) {
            dispatch(changeLoginStep({ step: step + 1 }))
        }
    }, [loginState.sendOtpApiStatus])

    useEffect(() => {
        if(socialLoginApiStatus==200 && !!socialLoginApiSucess){
        if (!!socialLoginIsOlder) {
            localStorage.setItem("session_id", socialLoginDataResponse.session_id)
            setCookie("user_id", socialLoginDataResponse.id, 1);
            setCookie("profile", JSON.stringify(socialLoginDataResponse), 1);
            dispatch(changeIsAuth({ is_auth: true }))
            history.push("/home")
            console.log(SOCKET, "Socket auth")
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
            dispatch(changeLoginStep({ step: 3 }))
            
        }
    }
        if (!socialLoginApiSucess && !!socialLoginApiStatus) {
            addToast(socialLoginMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
            dispatch(clearSocialLoginResponse());
        }
    }, [socialLoginDataResponse])
    // var data = {
    //     email: !!userInfo.email ? userInfo.email:“”,
    //     login_social_id: userInfo.id,
    //     type: “” + type,
    //     device_type: Platform.OS === ‘ios’ ? ‘2’ : ‘1’,
    //     device_token: this.props.fcmToken != “” ? this.props.fcmToken : token,
    //     name: userInfo.name,
    //   }
    const handleChange = (e) => {
        const target = e.target;
        dispatch(changeMainStepInput({ [target.name]: target.value.replace(/\D/g, "") }));
    }

    const sendHandle = (e) => {
        dispatch(socialLoginType({ socialType: 2}))
        let validation = {
            is_valid_phone: { status: false, elm: contactEl, validation: contactElValidation }
        }
        validation = handleMainValidation(validation, loginState.main)
        let { is_valid_phone } = validation
        addValidation(validation);
        if (is_valid_phone.status) {
            const bodyparams = {
                phone: contact,
                country_code: '+' + cntCode,
            }
            dispatch(sendOtpDataApi(bodyparams))
        }
    }
    useEffect(() => {
        function countryDropdown(seletor) {
            var Selected = $(seletor);
            var Drop = $(seletor + '-drop');
            var DropItem = Drop.find('li');

            Selected.click(function () {
                Selected.toggleClass('open');
                Drop.toggle();
            });

            Drop.find('li').click(function () {
                Selected.removeClass('open');
                Drop.hide();

                var item = $(this);
                Selected.html(item.html());
            });

            DropItem.each(function () {
                var code = $(this).attr('data-code');

                if (code != undefined) {
                    var countryCode = code.toLowerCase();
                    $(this).find('i').addClass('flagstrap-' + countryCode);
                }
            });
        }

        countryDropdown('#country');
        return () => {
            dispatch(changeSendOtpStatus({ sendOtpApiStatus: "" }))
            dispatch(clearSocialLoginResponse());
        }
    }, [])
    return (
        <div className="signup-inner" id="login-tab-1">
            <div className="signup-header">
                <h4 className="theme-txt">Glad to see you!</h4>
                <p>Hello there, sign in to continue!</p>
            </div>
            <div className="form-group">
                <div className="country text-left">
                    <div id="country" className="select" ><img src={"https://flagcdn.com/16x12/" + cntCodeName.toLowerCase() + ".png"} />+{cntCode}</div>
                    {/* <div id="country-drop" className="dropdown"> */}
                        {/* <ul>
                            {getCountries().map((country, index) => (
                                <li onClick={e => handleChange(e)} data-code={country.code.toLowerCase()} data-name={country.label} data-cid={country.phone}><img src={"https://flagcdn.com/16x12/" + country.code.toLowerCase() + ".png"} />+{country.phone}</li>
                            ))}
                        </ul> */}
                       
                    {/* </div> */}
                </div>
                <Input
                    ref={contactEl}
                    class="form-control"
                    name="contact"
                    id="phone_number"
                    maxlength="19"
                    type="text"
                    placeholder="Enter Phone Number"
                    value={contact}
                    onChange={handleChange}
                />
                <p style={{ display: "none" }} ref={contactElValidation} className="error-message">Please enter phone number</p>
            </div>
            <p>You'll receive a verification code</p>
            <Button
                className={!!loginState.sendOtpApiLoading ? "btn bg-grd-clr d-block mb-4 btn-countinue-1 disabled" : "btn bg-grd-clr d-block mb-4 btn-countinue-1"}
                type="button"
                href="javascript:void(0)"
                onClick={sendHandle} >
                Continue
            </Button>
            <Spinner loading={loginState.sendOtpApiLoading} />
            <MainStepContinueWith
                Button={Button}
                dispatch={dispatch}
            />
        </div>
    )
}
export default MainStep