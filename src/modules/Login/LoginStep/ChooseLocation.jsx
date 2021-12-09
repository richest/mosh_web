import React, { useEffect, useRef } from 'react'
import { changeChooseLocation, changeLoginStep } from '../LoginActions'
import { useDispatch, useSelector } from 'react-redux'
import { getCityDataApi, getCountriesDataApi, getStateDataApi } from '../../../library/api/LoginApiService'
import { Button, Selects } from '../../../library/common/components'
import { handleChooseLocationValidation, addValidation } from '../validations'

const ChooseLocation = ({ step }) => {
    const dispatch = useDispatch();
    const countryEl = useRef(null);
    const stateEl = useRef(null);
    const cityEl = useRef(null);
    const countryElValidation = useRef(null);
    const stateElValidation = useRef(null);
    const cityElValidation = useRef(null)
    const chooseLocationState = useSelector(state => state.LoginReducer);
    const { chooseLocation: { country, country_list, state, state_list, city, city_list } } = chooseLocationState;
    console.log(chooseLocationState, "check");
    const handleChange = (e) => {
        const target = e.target;
        dispatch(changeChooseLocation({ [target.name]: target.value }));
    }
    useEffect(() => {
        dispatch(getCountriesDataApi())
    }, [])
    useEffect(() => {
        console.log(country)
        if (!!country) {
            dispatch(getStateDataApi(country));
        }
        else {
            dispatch(changeChooseLocation({ state_list: [] }));
            dispatch(changeChooseLocation({ city_list: [] }));
            dispatch(changeChooseLocation({ state: "" }));
            dispatch(changeChooseLocation({ city: "" }));
        }
    }, [country])

    useEffect(() => {
        if (!!state) {
            dispatch(getCityDataApi(state));
        }
        else {
            dispatch(changeChooseLocation({ city_list: [] }));
            dispatch(changeChooseLocation({ city: "" }));
        }
    }, [state])

    const handleNext = () => {
        let validation = {
            is_valid_country: { status: false, elm: countryEl, validation: countryElValidation },
            is_valid_state: { status: false, elm: stateEl, validation: stateElValidation },
            is_valid_city: { status: false, elm: cityEl, validation: cityElValidation },
        }
        validation = handleChooseLocationValidation(validation, chooseLocationState.chooseLocation)
        let { is_valid_country, is_valid_state, is_valid_city } = validation
        addValidation(validation)
        if (is_valid_country.status && is_valid_state.status && is_valid_city.status) {
            dispatch(changeLoginStep({ step: step + 1 }))
        }
    }

    return (

        <div className="signup-inner" id="login-tab-5">
            <div className="signup-header">
                <a href="javascript:void(0)" className="login-back-4 btn-back" onClick={() => dispatch(changeLoginStep({ step: step - 1 }))}><i className="fas fa-chevron-left" /></a>
                <h4 className="theme-txt upload-txt-spacer">Choose Your Location</h4>
            </div>
            <div className="form-group">
                <label for="" className="d-block text-left">Country</label>
                <Selects class="form-control bg-trsp" ref={countryEl} name="country" id="" value={country} onChange={handleChange}>
                    <option value="">Select country</option>
                    {country_list.map((country, index) => {
                        return <option value={country.id}>{country.label}</option>
                    })}
                </Selects>
                <p style={{ display: "none" }} ref={countryElValidation} className="error-message">Please select country</p>
            </div>
            <div className="form-group">
            <label for="" className="d-block text-left">States</label>
                <Selects class="form-control bg-trsp" ref={stateEl} name="state" id="" value={state} onChange={handleChange}>
                    <option value="">Select state</option>
                    {state_list.map((state, index) => {
                        return <option value={state.value}>{state.label}</option>
                    })}
                </Selects>
                <p style={{ display: "none" }} ref={stateElValidation} className="error-message">Please select state</p>
            </div>
            <div className="form-group">
                <label for="" className="d-block text-left">City</label>
                <Selects class="form-control bg-trsp" ref={cityEl} name="city" id="" value={city} onChange={handleChange}>
                    <option value="">Select city</option>
                    {city_list.map((city, index) => {
                        return <option value={state.value}>{city.label}</option>
                    })}
                </Selects>
                <p style={{ display: "none" }} ref={cityElValidation} className="error-message">Please select city</p>
            </div>
            <Button className="btn bg-grd-clr d-block mb-4 btn-countinue-5" href="javascript:void(0)" onClick={handleNext} >Next</Button>

        </div>
    )
}
export default ChooseLocation