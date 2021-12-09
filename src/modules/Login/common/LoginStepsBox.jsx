import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { LoginSlider } from '.';
import {
    MainStep, VerifyCode, AboutInfo,
    AccountInfo, UploadImage,
    ChooseLocation, LookingFor
} from '../LoginStep';

const ReturnCurrentStep = ({ step }) => {
    switch (step) {
        case 1:
            return <MainStep step={step} />
        case 2:
            return <VerifyCode step={step} />
        case 3:
            return <AboutInfo step={step} />
        case 4:
            return <AccountInfo step={step} />
        case 5:
            return <UploadImage step={step} />
        case 6:
            return <ChooseLocation step={step} />
        case 7:
            return <LookingFor step={step} />
        default:
            return <MainStep step={step} />
    }
}

const LoginStepsBox = () => {
    const loginState = useSelector(state => state.LoginReducer);
    const { step } = loginState;
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                {/* <div className="col-md-4 mx-auto">
                    <LoginSlider />
                </div> */}
                <div className="col-md-4 mx-auto">
                    <form  id="login_form" onSubmit={(e) => {  e.preventDefault()}}>
                        <div className="signup-wrapper__form">
                        <Scrollbars autoHide className="sidebar__menu-scroll">
                            <div className="signup-form text-center">
                                <ReturnCurrentStep step={step} />
                            </div>
                            </Scrollbars>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginStepsBox