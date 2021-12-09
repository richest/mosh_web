import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '../../../library/common/components';
import { changeAboutInfoInput, changeLoginStep } from '../LoginActions';
import { handleAboutInfoValidation, addValidation } from '../validations'

const AboutInfo = ({ step }) => {
    const dispatch = useDispatch();
    const firstNameEl = useRef(null);
    const lastNameEl = useRef(null);
    const emailEl = useRef(null);
    const agreeEl = useRef(null);
    const confirmEl = useRef(null);
    const firstNameElValidation = useRef(null);
    const lastNameElValidation = useRef(null);
    const emailElValidation = useRef(null);
    const agreeElValidation = useRef(null);
    const confirmElValidation = useRef(null);
    const aboutInfoState = useSelector(state => state.LoginReducer);
    const { aboutInfo: { f_name, l_name, email, agree, confirm } ,socialType } = aboutInfoState;
    console.log(aboutInfoState.aboutInfo, "check");

    const handleNextClick = () => {
        let validation = {
            is_valid_firstName: { status: false, elm: firstNameEl, validation: firstNameElValidation },
            is_valid_last: { status: false, elm: lastNameEl, validation: lastNameElValidation },
            is_valid_email: { status: false , elm: emailEl, validation: emailElValidation },
            is_valid_agree: { status: false, elm: agreeEl, validation: agreeElValidation },
            is_valid_confirm: { status: false, elm: confirmEl, validation: confirmElValidation },
        }
        console.log(validation, "elm")
        validation = handleAboutInfoValidation(validation, aboutInfoState.aboutInfo)
        if (socialType !== 2) {
            validation.is_valid_email.status = true
        }

        let { is_valid_firstName, is_valid_last, is_valid_email, is_valid_agree, is_valid_confirm } = validation;
    
        
        addValidation(validation)

        if (is_valid_firstName.status &&
            is_valid_last.status &&
            is_valid_email.status &&
            is_valid_agree.status &&
            is_valid_confirm.status) {
            dispatch(changeLoginStep({ step: step + 1 }))
        }

    }

    const handleChange = (e) => {
        const target = e.target;
        dispatch(changeAboutInfoInput({ [target.name]: target.value }));
    }
    const handleChecked = (e) => {
        const target = e.target;
        dispatch(changeAboutInfoInput({ [target.name]: target.checked }));
    }
    return (
        <div className="signup-inner" id="login-tab-3" >
            <div className="another_test">
                <div className="signup-header mb-5">
                    <Button
                        href="javascript:void(0)"
                        className="login-back-2 btn-back"
                        onClick={() => dispatch(changeLoginStep({ step: step - 1 }))} >
                        <i className="fas fa-chevron-left" />
                    </Button>
                    <h4 className="theme-txt">Sign in to continue!!</h4>
                </div>
                <div className="form-group">
                    <Input class="form-control bg-trsp" ref={firstNameEl} name="f_name" value={f_name} onChange={handleChange} id="first_name" type="text" placeholder="First Name" />
                    <p style={{ display: "none" }} ref={firstNameElValidation} className="error-message">Please enter first name</p>
                </div>
                <div className="form-group">
                    <Input class="form-control bg-trsp" ref={lastNameEl} name="l_name" value={l_name} onChange={handleChange} type="text" placeholder="Last Name" />
                    <p style={{ display: "none" }} ref={lastNameElValidation} className="error-message">Please enter last name</p>
                </div>
                {socialType == 2 &&
                <div className="form-group">
   
                    <Input class="form-control bg-trsp" ref={emailEl} name="email" value={email} onChange={handleChange} type="text" placeholder="Email Address" />
                    <p style={{ display: "none" }} ref={emailElValidation} className="error-message">Please enter email address</p>
               
            
                </div>}
                <div className="accept-field d-flex  align-items-center form-group">
                    <Input type="checkbox" ref={agreeEl} name="agree" id="accept-field" checked={agree} onChange={handleChecked} />
                    <label htmlFor="accept-field" />
                    <span> I agree to the Mosh Terms of use & Privacy Policy.</span>
                </div>
                <p style={{ display: "none" }} ref={agreeElValidation} className="error-message">Please accept terms and condition</p>
                <div className="accept-field d-flex  align-items-center form-group">
                    <Input type="checkbox" ref={confirmEl} name="confirm" id="age-field" checked={confirm} onChange={handleChecked} />
                    <label htmlFor="age-field" />
                    <span> I confirm I am 18 years old.</span>
                </div>
                <p style={{ display: "none" }} ref={confirmElValidation} className="error-message">Please confirm you are 18+ </p>
                <Button className="btn bg-grd-clr d-block mb-4 btn-countinue-3" href="javascript:void(0)" onClick={handleNextClick}>Next</Button>
            </div>
        </div>
    )
}
export default AboutInfo;