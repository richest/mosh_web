import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePosition } from 'use-position';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Button, Input, Spinner } from '../../../library/common/components';
import { changeLoginStep, changeLookingForInput, clearRegisterApiResponse } from '../LoginActions';
import { handleLookingForValidation, addValidation } from '../validations';
import { registerDataApi } from '../../../library/api/LoginApiService';
import { getCookie, setCookie } from '../../../library/utilities/functions';
import { changeIsAuth } from '../../../library/common/actions/AuthActions';
import { changeSocketId } from '../../Chat/ChatAction';
import { SOCKET } from '../../../library/urls';

const override = css`   
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 51%;
    right: 44%;
`;
let selectedCheck = [], moshOnlineUsers;
const LookingFor = ({ step }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { addToast } = useToasts();
    const lokkingForElValidation = useRef(null);
    const lookingForState = useSelector(state => state.LoginReducer);
    const { latitude, longitude } = usePosition();
    const { main: { contact, cntCode, cntCodeName ,loginSocialId } ,socialType} = lookingForState;
    const { aboutInfo: { f_name, l_name, email, agree, confirm } } = lookingForState;
    const { accountInfo: { dob, heightFeet, heightInches, weight, my_relationship, my_gender, my_body_type,
        my_hobbies, my_interest, my_education, my_profession } } = lookingForState;
    const { chooseLocation: { country, state, city } } = lookingForState;
    const { uploadImage: { img_data, picture } } = lookingForState;
    const { lookingFor: { looking, my_looking } } = lookingForState;
    const { registerApi: { registerDataResponse, registerApiLoading, registerApiSucess, registerMessage } } = lookingForState;
    console.log(lookingForState, "check");
    const dates = moment(dob).format('DD/MM/YYYY');

    // useEffect(()=>{
    //     if(!!registerDataResponse){
    //         setCookie("session_id" ,registerDataResponse.session_id)
    //         dispatch(changeIsAuth({is_auth: true}))
    //             history.push("/home")
    //     }

    // },[registerDataResponse])
    useEffect(() => {
        if (registerApiSucess === true) {
            if (!!registerDataResponse) {
                localStorage.setItem("session_id", registerDataResponse.session_id);
                setCookie("user_id", registerDataResponse.id, 1);
                setCookie("profile", JSON.stringify(registerDataResponse), 1);
                dispatch(changeIsAuth({ is_auth: true }))
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
        }
        else if (registerApiSucess === false) {
            addToast(registerMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
            dispatch(clearRegisterApiResponse());
        }
    }, [registerApiSucess])
    const ExploreNow = () => {
        let validation = {
            is_valid_lookingfor: { status: false, validation: lokkingForElValidation }
        }
        validation = handleLookingForValidation(validation, my_looking)
        let { is_valid_lookingfor: { status } } = validation;
        addValidation(validation);
        if (status) {
            const hobbie = my_hobbies.map((data) => data.value)
            const bodyTypes = my_body_type.map((data) => data.value)
            const bodyParameters = new FormData();
            bodyParameters.append("first_name", "" + f_name);
            bodyParameters.append("last_name", l_name);
            bodyParameters.append("email", "" + email);
            bodyParameters.append("password", "" + "");
            bodyParameters.append("about_me", "" + "");
            bodyParameters.append("phone", "" + contact);
            bodyParameters.append("date_of_birth", "" + dates);
            bodyParameters.append("height_inches", "" + heightInches);
            bodyParameters.append("height_feet", "" + heightFeet);
            bodyParameters.append("body_type", "" + bodyTypes.join(","));
            bodyParameters.append("weight", "" + weight);
            bodyParameters.append("relationship_status", "" + my_relationship);
            bodyParameters.append("i_am", "" + my_gender);
            bodyParameters.append("what_looking_for", "" + my_looking.join(","));
            bodyParameters.append("latitude", "" + latitude);
            bodyParameters.append("longitude", "" + longitude);
            bodyParameters.append("zipcode", "" + "");
            bodyParameters.append("device_type", "" + 3);
            bodyParameters.append("device_token", "" + "");
            bodyParameters.append("profile_image", picture);
            bodyParameters.append("country_id", "" + country);
            bodyParameters.append("state_id", "" + state);
            bodyParameters.append("city_id", "" + city);
            bodyParameters.append("education", "" + my_education);
            bodyParameters.append("pin", "" + "");
            bodyParameters.append("hobbies", "" + hobbie.join(","));
            bodyParameters.append("interest", "" + my_interest);
            bodyParameters.append("profession", "" + my_profession);
            bodyParameters.append("signup_with", "" + socialType)
            bodyParameters.append("login_social_id", "" + loginSocialId)
            dispatch(registerDataApi(bodyParameters));
        }
    }

    const handleCheck = (e) => {
        const target = e.target;
        var value = target.value;
        target.checked = target.checked
        if (target.checked) {
            let selectedArray = selectedCheck;
            selectedArray.push(value);
        } else {
            let selectedArray = selectedCheck;
            var index = selectedArray.indexOf(value);
            console.log(index, "index")
            selectedArray.splice(index, 1);
        }
        console.log(selectedCheck, "selectedArray")
        dispatch(changeLookingForInput({ my_looking: selectedCheck }));
    }

    useEffect(() => {
        for (let key in looking) {
            CheckedItem(looking[key].id)
        }
    }, [])
    const CheckedItem = (id) => {
        let checkId = false;
        const elm = document.getElementById("looking_for" + id);
        for (let i in my_looking) {
            if (my_looking[i] == id) {
                checkId = true
            }
        }
        if (!!elm) {
            elm.checked = checkId;
        }
    }

    return (
        <div className="signup-inner" id="login-tab-5">
            <div className="signup-header">
                <a href="javascript:void(0)" className="login-back-4 btn-back" onClick={() => dispatch(changeLoginStep({ step: step - 1 }))}><i className="fas fa-chevron-left" /></a>
                <h4 className="theme-txt upload-txt-spacer">What are you looking for</h4>
            </div>
            <div className="choose-lookingFor">
                <div className="form-group">
                    {looking.map((item, i) => (
                        <div className="input-label">
                             <label for={"looking_for" + item.id}>{item.name}</label>
                            <Input type="checkbox" className="lookingFor" id={"looking_for" + item.id}
                                onClick={handleCheck} name={"looking"} value={item.id} />
                           
                        </div>
                    ))}
                </div>
                <p style={{ display: "none" }} ref={lokkingForElValidation} className="error-message">Please select atleast one</p>
            </div>
            <Button className="btn bg-grd-clr d-block mb-4 btn-countinue-5" href="javascript:void(0)" onClick={ExploreNow} >Continue</Button>
            <ClipLoader color={"#fff"} loading={!!registerApiLoading ? true : false} css={override} />

        </div>
    )
}
export default LookingFor