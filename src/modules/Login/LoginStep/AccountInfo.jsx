import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import { Button, Input, Selects } from '../../../library/common/components';
import { changeAccountInfoInput, changeLoginStep } from '../LoginActions';
import { getLookingForDataApi, getRelationshipDataApi } from '../../../library/api/LoginApiService';
import { addValidation, handleAccountInfoValidation } from '../validations';

const AccountInfo = ({ step }) => {
    const dispatch = useDispatch();
    const heightEl = useRef(null);
    const weightEl = useRef(null);
    const relationshipEl = useRef(null);
    const genderEl = useRef(null);
    const interestEl = useRef(null);
    const educationEl = useRef(null);
    const professionEl = useRef(null);
    const heightElValidation = useRef(null);
    const weightElValidation = useRef(null);
    const relationshipElValidation = useRef(null);
    const genderElValidation = useRef(null);
    const interestElValidation = useRef(null);
    const educationElValidation = useRef(null);
    const professionElValidation = useRef(null);
    const [hobbiesErr, setHobbieErr] = useState({});
    const [bodyTypeErr, setBodyTypeErr] = useState({});
    const [dobErr, setDobErr] = useState({});
    const accountInfoState = useSelector(state => state.LoginReducer);
    const { accountInfo: { dob, heightFeet, heightInches, weight, my_relationship, relationship, my_gender, gender,
        body_type, my_body_type, my_hobbies, hobbies, interest, my_interest, my_education, education,
        profession, my_profession } } = accountInfoState;
    console.log(accountInfoState, " check account hoobies");


    // useEffect(() => {
    //     const body = {};
    //     dispatch(getRelationshipDataApi(body));
    //     const bodyparam={code : 5}
    //     dispatch(getLookingForDataApi(bodyparam))
    // }, [])
    const handleChange = (e) => {
        const target = e.target;
        dispatch(changeAccountInfoInput({ [target.name]: target.value }));
    }

    const Accountvalidation = () => {
        const hobbiesErr = {};
        const bodyTypeErr = {};
        const dobErr = {};
        let Valid = true;
        if (my_body_type.length == "") {
            bodyTypeErr.bodyTypeShort = "Please select body types";
            Valid = false;
        }

        if (my_hobbies.length == "") {
            hobbiesErr.hobbiesShort = "Please select hobbies"
            Valid = false;
        }

        if (dob == null) {
            dobErr.dobShort = "date of birth is empty"
            Valid = false;
        }
        setHobbieErr(hobbiesErr);
        setBodyTypeErr(bodyTypeErr);
        setDobErr(dobErr);
        return Valid;
    }

    const handleNext = () => {
        const Valid = Accountvalidation();
        let validation = {
            is_valid_heightFeet: { status: false, elm: heightEl, validation: heightElValidation },
            is_valid_weight: { status: false, elm: weightEl, validation: weightElValidation },
            is_valid_relationship: { status: false, elm: relationshipEl, validation: relationshipElValidation },
            is_valid_gender: { status: false, elm: genderEl, validation: genderElValidation },
            is_valid_interest: { status: false, elm: interestEl, validation: interestElValidation },
            is_valid_education: { status: false, elm: educationEl, validation: educationElValidation },
            is_valid_profession: { status: false, elm: professionEl, validation: professionElValidation }
        }
        console.log(validation, "elm")
        validation = handleAccountInfoValidation(validation, accountInfoState.accountInfo)
        let { is_valid_heightFeet, is_valid_weight, is_valid_relationship, is_valid_gender,
            is_valid_interest, is_valid_education, is_valid_profession } = validation
        addValidation(validation)
        if (is_valid_heightFeet.status &&
            is_valid_weight.status &&
            is_valid_relationship.status &&
            is_valid_gender.status &&
            is_valid_interest.status &&
            is_valid_education.status &&
            is_valid_profession.status &&
            Valid
        ) {
            dispatch(changeLoginStep({ step: step + 1 }))
        }

    }
    return (
        <div className="signup-inner" id="login-tab-4">
            <div className="another_test">
                <div className="signup-header mb-5">
                    <a href="javascript:void(0)" className="login-back-2 btn-back" onClick={() => dispatch(changeLoginStep({ step: step - 1 }))} ><i className="fas fa-chevron-left" /></a>
                    <h4 className="theme-txt">Account Information</h4>
                </div>
                <div className="form-group">
                    <DatePicker className="bg-trsp" clearIcon id="dateob" name="dob" format="dd/MM/yyyy" dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" value={dob} selected={dob} onChange={date => dispatch(changeAccountInfoInput({ dob: date }))} />
                    {Object.keys(dobErr).map((key) => {
                        return <div style={{ color: "red" }}>{dobErr[key]}</div>
                    })}
                </div>
                <div className="form-group">
                    <label for="" className="d-block text-left">Height</label>
                    <Input class="form-control bg-trsp" ref={heightEl} name="heightFeet" maxlength="2" min="1" value={heightFeet} onChange={handleChange} id="height" type="number" placeholder="Feet" />
                    </div>
                    <div className="form-group">
                    <Input class="form-control bg-trsp" name="heightInches" maxlength="2" min="1" value={heightInches} onChange={handleChange} id="height" type="number" placeholder="Inches" />
                    </div>
                    <p style={{ display: "none" }} ref={heightElValidation} className="error-message">Please enter height</p>
                
                <div className="form-group">
                    <Input class="form-control bg-trsp" ref={weightEl} name="weight" maxlength="4" min="1" value={weight} onChange={handleChange} type="number" placeholder="Weight(kg)" />
                    <p style={{ display: "none" }} ref={weightElValidation} className="error-message">Please enter weight</p>
                </div>
                <h6 className="theme-txt text-left">Other Information</h6>
                <div className="form-group">
                    <label for="" className="d-block text-left">Relationship status</label>
                    <Selects class="form-control bg-trsp" ref={relationshipEl} name="my_relationship" id="" value={my_relationship} onChange={handleChange}>
                        <option value="">Select</option>
                        {relationship.map((relationships, index) => {
                            return <option value={relationships.id}>{relationships.name}</option>
                        })}
                    </Selects>
                    <p style={{ display: "none" }} ref={relationshipElValidation} className="error-message">Please select relationship</p>
                </div>
                <div className="choose-gender d-flex my-4 position-relative">
                   
                    <div className="gender-selection w-100">
                        {gender.map((data) => {
                            return <>  <div className="form-group"><Input className="d-none" type="radio" ref={genderEl} id={data.name} name="gender" value={data.id} checked={my_gender == data.id ? "checked" : ""} onChange={e => dispatch(changeAccountInfoInput({ my_gender: e.target.value }))} placeholder={data.name} />
                                <label className="d-block w-100" htmlFor={data.name}>{data.name}</label></div></>
                        })}
                        </div>
                    
                </div>
                <p style={{ display: "none" }} ref={genderElValidation} className="error-message">Please select gender</p>
                <div className="form-group">
                    <label for="" className="d-block text-left">Body Type</label>
                    <Select
                        value={my_body_type}
                        options={body_type.map((data) => { return { value: data.id, label: data.name } })}
                        isMulti={true}
                        onChange={(data) => dispatch(changeAccountInfoInput({ my_body_type: data }))} />
                    {Object.keys(bodyTypeErr).map((key) => {
                        return <div style={{ color: "red" }}>{bodyTypeErr[key]}</div>
                    })}
                </div>
                <div className="form-group">
                <label for="" className="d-block text-left">Hobbies</label>
                    <Select
                        value={my_hobbies}
                        options={hobbies.map((data) => { return { value: data.id, label: data.name } })}
                        isMulti={true}
                        className="basic-multi-select"
                        onChange={(data) => dispatch(changeAccountInfoInput({ my_hobbies: data }))} />
                    {Object.keys(hobbiesErr).map((key) => {
                        return <div style={{ color: "red" }}>{hobbiesErr[key]}</div>
                    })}
                </div>

                <div className="form-group">
                <label for="" className="d-block text-left">Interest in</label>
                    <Selects class="form-control bg-trsp" ref={interestEl} name="my_interest" id="" value={my_interest} onChange={handleChange}>
                        <option value="">Select</option>
                        {interest.map((data) => {
                            return <option value={data.id}>{data.name}</option>
                        })}
                    </Selects>
                    <p style={{ display: "none" }} ref={interestElValidation} className="error-message">Please select interest</p>
                </div>
                <div className="form-group">
                <label for="" className="d-block text-left">Education</label>
                    <Selects class="form-control bg-trsp" ref={educationEl} name="my_education" id="" value={my_education} onChange={handleChange}>
                        <option value="">Select</option>
                        {education.map((data) => {
                            return <option value={data.id}>{data.name}</option>
                        })}
                    </Selects>
                    <p style={{ display: "none" }} ref={educationElValidation} className="error-message">Please select education</p>
                </div>
                <div className="form-group">
                <label for="" className="d-block text-left">Profession</label>
                    <Selects class="form-control bg-trsp" ref={professionEl} name="my_profession" id="" value={my_profession} onChange={handleChange}>
                        <option value="">Select</option>
                        {profession.map((data) => {
                            return <option value={data.id}>{data.name}</option>
                        })}
                    </Selects>
                    <p style={{ display: "none" }} ref={professionElValidation} className="error-message">Please select profession</p>
                </div>
                <Button className="btn bg-grd-clr d-block mb-4 btn-countinue-3" href="javascript:void(0)" onClick={handleNext}>Next</Button>
            </div>
        </div>
    )
}
export default AccountInfo