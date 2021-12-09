
import React, { useEffect, useRef } from 'react'
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import { usePosition } from 'use-position';
import { updateProfileApi } from '../../../library/api/profileApiService';
import { getSingleProfileDataApi } from '../../../library/api/SingleProfileApiService';
import { Selects, Input, Toolbars, Logo, UpgradeButton } from '../../../library/common/components';
import { getCookie } from '../../../library/utilities/functions';
import { changeUpdateProfileInput, clearUpdateProfileResponse } from '../ProfileActions';
import { changeChooseLocation, clearRegisterApiResponse } from '../../Login/LoginActions';
import { getCityDataApi, getCountriesDataApi, getStateDataApi } from '../../../library/api/LoginApiService';
import { clearSingleProfileResponse } from '../../SingleProfile/SingleProfileAction';
import { HomeFilter } from '../../Home/common';

const UpdateProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const { latitude, longitude } = usePosition();
    const loginInfoState = useSelector(state => state.LoginReducer);
    const profileState = useSelector(state => state.ProfileReducer)
    const userDataState = useSelector(state => state.SingleProfileReducer)
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { accountInfo: { relationship, hobbies, interest, profession } } = loginInfoState;
    const { lookingFor: { looking } } = loginInfoState;
    const { chooseLocation: { country_list, state_list, city_list } } = loginInfoState;
    const { profileInfo: { name, dob, bio, heightFeet, heightInches, weight, my_relationship, my_interest, my_profession,
        my_hobbies, lookingFor, country, state, city, profile_photo, profile_photo_one, profile_photo_two, profile_photo_three, profile_photo_four, profile_photo_five,
        img_data, img_data_one, img_data_two, img_data_three, img_data_four, img_data_five } } = profileState
    const { updateProfileApi: { updateProfileStatus, updateProfileMessage, updateProfileSucess } } = profileState
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    const dates = moment(dob).format('DD/MM/YYYY');
    console.log(profileState, "profileState...")
    console.log(singleProfileDataResponse, "singleProfileDataResponse")
    useEffect(() => {
        if (!!updateProfileSucess) {
            addToast(updateProfileMessage, {
                appearance: 'success',
                autoDismiss: true,
            });
            dispatch(clearUpdateProfileResponse())
        }
    }, [updateProfileSucess])

    useEffect(() => {
        if (!!singleProfileDataResponse) {
            let respDate = singleProfileDataResponse.date_of_birth.split("/");
            const respDateMonth = respDate[1];
            const respDateDate = respDate[0];
            respDate = respDateMonth + "/" + respDateDate + "/" + respDate[2];

            console.log(new Date(respDate), "singleProfileDataResponse.date_of_birth..")
            let profiledata = {
                img_data: singleProfileDataResponse.profile_image,
                img_data_one: singleProfileDataResponse.images.one,
                img_data_two: singleProfileDataResponse.images.two,
                img_data_three: singleProfileDataResponse.images.three,
                img_data_four: singleProfileDataResponse.images.four,
                img_data_five: singleProfileDataResponse.images.five,
                name: singleProfileDataResponse.first_name,
                // dates :singleProfileDataResponse.date_of_birth,
                dob: new Date(respDate),
                bio: (singleProfileDataResponse.about_me != "null" ? singleProfileDataResponse.about_me : ""),
                heightFeet: !!singleProfileDataResponse.height_feet ? singleProfileDataResponse.height_feet : "",
                heightInches: singleProfileDataResponse.height_inches,
                weight: (singleProfileDataResponse.weight != "null" ? singleProfileDataResponse.weight : ""),
                my_relationship: singleProfileDataResponse.relationship_status.id,
                my_interest: singleProfileDataResponse.interest,
                my_profession: singleProfileDataResponse.profession,
                country: singleProfileDataResponse.country_id,
                state: singleProfileDataResponse.state_id,
                city: singleProfileDataResponse.city_id,
                lookingFor: singleProfileDataResponse.what_looking_for.map((data) => { return { value: data.id, label: data.name } }),
                my_hobbies: singleProfileDataResponse.hobbies.map((data) => { return { value: data.id, label: data.name } })
            }
            dispatch(changeUpdateProfileInput({ ...profileState.profileInfo, ...profiledata }));
        }
    }, [singleProfileDataResponse])
    useEffect(() => {
        dispatch(getCountriesDataApi())

    }, [])
    const handleFileChange = (e) => {
        var data = e.target.files[0];
        const fileName = data.name.split(".");
        const imageFormat = fileName[fileName.length - 1];
        if (e.target.files[0]) {
            if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
                imageFormat === "SVG" || imageFormat === "svg" || imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {
                dispatch(changeUpdateProfileInput({ [e.target.name]: e.target.files[0] }));
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    dispatch(changeUpdateProfileInput({ [e.target.id]: reader.result }));
                });
                reader.readAsDataURL(e.target.files[0]);
            }
            else {
                addToast("Only .png, .jpg, .jpeg image formats supported.", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    }
    const handleChange = (e) => {
        const target = e.target;
        dispatch(changeUpdateProfileInput({ [target.name]: target.value }));
    }

    const handleUpdate = () => {
        const hobbie = my_hobbies.map((data) => data.value);
        const looking_for = lookingFor.map((data) => data.value)
        const data = new FormData();
        data.append("session_id", "" + localStorage.getItem("session_id"));
        data.append("first_name", "" + name);
        data.append("last_name", "");
        data.append("email", "");
        data.append("about_me", "" + bio);
        data.append("phone", "");
        data.append("date_of_birth", "" + dates);
        data.append("height_inches", "" + heightInches);
        data.append("height_feet", "" + heightFeet);
        data.append("body_type", "");
        data.append("health_status", "");
        data.append("weight", "" + weight);
        data.append("relationship_status", "" + my_relationship);
        data.append("i_am", "");
        data.append("position", "");
        data.append("what_looking_for", "" + looking_for.join(","));
        data.append("latitude", "" + latitude);
        data.append("longitude", "" + longitude);
        data.append("zipcode", "");
        data.append("device_type", "" + 3);
        data.append("device_token", "" + "");
        data.append("hobbies", "" + hobbie.join(","));
        data.append("country_id", "" + country);
        data.append("state_id", "" + state);
        data.append("city_id", "" + city);
        data.append("interest", "" + my_interest);
        data.append("profession", "" + my_profession);
        data.append("profile_image", profile_photo);
        data.append("pic[1]", profile_photo_one);
        data.append("pic[2]", profile_photo_two);
        data.append("pic[3]", profile_photo_three);
        data.append("pic[4]", profile_photo_four);
        data.append("pic[5]", profile_photo_five);
        dispatch(updateProfileApi(data))
    }
    useEffect(() => {
        console.log(country)
        if (!!country) {
            dispatch(getStateDataApi(country));
        }
        else {
            dispatch(changeChooseLocation({ state_list: [] }));
            dispatch(changeChooseLocation({ city_list: [] }));
            dispatch(changeUpdateProfileInput({ state: "" }));
            dispatch(changeUpdateProfileInput({ city: "" }));
        }
    }, [country])

    useEffect(() => {
        if (!!state) {
            dispatch(getCityDataApi(state));
        }
        else {
            dispatch(changeChooseLocation({ city_list: [] }));
            dispatch(changeUpdateProfileInput({ city: "" }));
        }
    }, [state])

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                        <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                            <Logo />
                        </div>
                        <HomeFilter />
                    </div>
                    <div className="col-lg-9 p-3 rt-col">
                        <div className="tab-top d-flex flex-wrap-wrap ">
                            {
                                ((singleProfileDataResponse.is_subscribed == 0 && !singleProfileApiLoading) || IsSubscription == 0) &&
                                <div className={(singleProfileDataResponse.is_subscribed == 0 || IsSubscription == 0) ? "ml-auto mr-5" : "feature-menu "}>
                                    <UpgradeButton />
                                </div>
                            }
                            <Toolbars />
                        </div>
            <div className="edit-profile-modal__inner pb-5 col-md-8">
                <div className="d-flex align-items-center mb-4">
                    <a href="javascript:void(0)" className="login-back-2 btn-back mr-3" onClick={() => history.goBack()} ><i className="fas fa-chevron-left" /></a>
                    <h4 className="theme-txt text-center">Update Profile</h4>
                </div>

                <div className="edit-profile-form">
                    <div className="row grid-gallery">
                        <div className="col-md-8">
                            <div className="grid__blk grid-lg">
                                <input type="file" id="img_data" name="profile_photo" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                <img src={img_data} /></div>

                        </div>

                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="grid__blk grid-sm">
                                        <input type="file" id="img_data_one" name="profile_photo_one" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                        <img src={img_data_one} />
                                        <p>1</p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="grid__blk grid-sm mb-0">
                                        <input type="file" id="img_data_two" name="profile_photo_two" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                        <img src={img_data_two} />
                                        <p>2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row grid-gallery mt-3 mb-5">
                        <div className="col-md-4">
                            <div className="grid__blk">
                                <input type="file" id="img_data_three" name="profile_photo_three" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                <img src={img_data_three} />
                                <p>3</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="grid__blk">
                                <input type="file" id="img_data_four" name="profile_photo_four" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                <img src={img_data_four} />
                                <p>4</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="grid__blk">
                                <input type="file" id="img_data_five" name="profile_photo_five" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" onChange={handleFileChange} />
                                <img src={img_data_five} />
                                <p>5</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="form-group">
                    <label className="d-block">Full Name</label>
                    <Input class="form-control bg-trsp" name="name" value={name} onChange={handleChange} type="text" />
                </div>
                <div className="form-group dob-field">
                    <label className="d-block">Birthday</label>
                    <DatePicker className="bg-trsp" clearIcon id="dateob" name="dob" value={dob} selected={dob} onChange={date => dispatch(changeUpdateProfileInput({ dob: date }))} format="dd/MM/yyyy" dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" />
                </div>
                <div className="form-group">
                    <label className="d-block">Bio</label>
                    <Input class="form-control bg-trsp" name="bio" value={bio} onChange={handleChange} type="text" />
                </div>
                <div className="form-group">
                    <label for="">Height</label>
                    <Input class="form-control bg-trsp mb-3" name="heightFeet" onChange={handleChange} value={heightFeet} type="text" />
                    <Input class="form-control bg-trsp" name="heightInches" onChange={handleChange} type="text" value={heightInches} />
                </div>
                <div className="form-group">
                    <label for="">Weight</label>
                    <Input class="form-control bg-trsp" name="weight" type="text" value={weight} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label for="">Relationship status</label>

                    <Selects class="form-control bg-trsp" name="my_relationship" id="" value={my_relationship} onChange={handleChange} >
                        <option value="">Select</option>
                        {relationship.map((relationships, index) => {
                            return <option value={relationships.id}>{relationships.name}</option>
                        })}
                    </Selects>
                </div>
                <div className="form-group">
                    <label for="">Looking For</label>
                    <Select
                        value={lookingFor}
                        options={looking.map((data) => { return { value: data.id, label: data.name } })}
                        isMulti={true}
                        onChange={(data) => dispatch(changeUpdateProfileInput({ lookingFor: data }))}
                    />
                </div>
                <div className="form-group">
                    <label for="">Hobbies</label>
                    <Select
                        value={my_hobbies}
                        options={hobbies.map((data) => { return { value: data.id, label: data.name } })}
                        isMulti={true}
                        onChange={(data) => dispatch(changeUpdateProfileInput({ my_hobbies: data }))}
                    />
                </div>
                <div className="form-group">
                    <label for="">Interest in</label>
                    <Selects class="form-control bg-trsp" name="my_interest" value={my_interest} onChange={handleChange} >
                        <option value="">Select</option>
                        {interest.map((data) => {
                            return <option value={data.id}>{data.name}</option>
                        })}
                    </Selects>
                </div>
                <div className="form-group">
                    <label for="">Profession</label>
                    <Selects class="form-control bg-trsp" name="my_profession" value={my_profession} onChange={handleChange} >
                        <option value="">Select</option>
                        {profession.map((data) => {
                            return <option value={data.id}>{data.name}</option>
                        })}
                    </Selects>
                </div>
                <div className="form-group">
                    <label for="">Country</label>
                    <Selects class="form-control bg-trsp" name="country" id="" value={country} onChange={handleChange}>
                        <option value="">Select country</option>
                        {country_list.map((country, index) => {
                            return <option value={country.id}>{country.label}</option>
                        })}
                    </Selects>
                </div>
                <div className="form-group">
                    <label for="">States</label>
                    <Selects class="form-control bg-trsp" name="state" id="" value={state} onChange={handleChange}>
                        <option value="">Select state</option>
                        {state_list.map((state, index) => {
                            return <option value={state.value}>{state.label}</option>
                        })}
                    </Selects>
                </div>
                <div className="form-group">
                    <label for="">City</label>
                    <Selects class="form-control bg-trsp" name="city" id="" value={city} onChange={handleChange}>
                        <option value="">Select city</option>
                        {city_list.map((city, index) => {
                            return <option value={state.value}>{city.label}</option>
                        })}
                    </Selects>
                </div>
                <a className="btn bg-grd-clr d-block btn-countinue-3" onClick={handleUpdate} id="edit-second-step" href="javascript:void(0)">Save</a>
            </div>
                </div>
            </div>
  
        </div>
        </div>
    )
}
export default UpdateProfile