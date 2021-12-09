import React, { useState } from 'react'
import { Typography, Slider, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { Selects } from '../../../library/common/components';
import { changeFilterInputs, clearFilterInputs } from '../HomeActions';
import { getFilterDataApi } from '../../../library/api/HomeApiService';
import { getCookie } from '../../../library/utilities/functions';
import { Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
// import { withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
  root: {
    color: '#707070',
    height: 5,
    padding: 0,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    backgroundColor: '#f4c862',
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const HomeFilter = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation();
  const FliterFields = useSelector(state => state.LoginReducer);
  const FilterState = useSelector(state => state.Homereducer);
  const authState = useSelector(state => state.Authreducer);
  const [filterModel, setFilterModel] = useState(false)
  const { accountInfo: { relationship, interest } } = FliterFields;
  const { lookingFor: { looking } } = FliterFields;
  const { filterInputInfo: { page, age, distance, relationshipStatus, lookingFor, interests } } = FilterState;
  console.log(FilterState, "FilterState")

  const handleChange = (e) => {
    const target = e.target;
    dispatch(changeFilterInputs({ [target.name]: target.value }));
  }
  const handleChangeDistance = (event, newValue) => {
    dispatch(changeFilterInputs({ distance: newValue }));
  };
  const handleChangeAge = (event, newValue) => {
    dispatch(changeFilterInputs({ age: newValue }));
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setFilterModel(false)
    const looking = lookingFor.map((data) => data.value)
    const bodyparameter = {
      session_id: localStorage.getItem("session_id"),
      page: 1,
      limit: "",
      agefrom: age[0],
      ageto: age[1],
      lookingfor: looking.join(","),
      relationship_status: relationshipStatus,
      interest: interests,
      radius: distance,
      is_online: ""
    }
    dispatch(getFilterDataApi(bodyparameter))
  }
  const handleReset = () => {
    dispatch(clearFilterInputs())
  }
  return (
    <>
      <div className="filter-tab">
        <div className="filter-tab__filters">
          <ul>
            {pathname=="/home"?<li><a href="javascript:void(0)" onClick={() => setFilterModel(true)}><i class="fas fa-sliders-h"></i> <h5>Matches</h5> </a></li>:""}
            <li><a href="javascript:void(0)" onClick={() => history.push("/message-online")}><i class="far fa-user"></i> <h5>New and Online <span className="online-user">{authState.onlines}</span></h5></a></li>
            <li><a href="javascript:void(0)" onClick={() => history.push("/likes")}><i class="far fa-heart"></i> <h5>Likes You</h5></a></li>
            {pathname=="/home"?<li><a href="javascript:void(0)" onClick={() => setFilterModel(true)}><i class="fas fa-search"></i> <h5>Search</h5></a></li>:""}
            <li><a href="javascript:void(0)" onClick={() => history.push("/chat")}><i class="far fa-comment-alt"></i> <h5>Messages</h5></a></li>
          </ul>

        </div>
      </div>

      <Modal className="vip-modal" show={filterModel} onHide={() => setFilterModel(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
        <div className="vip-modal__inner">
          <h4 className="theme-txt text-center mb-4 ">Match Preferences</h4>
          <form >
            <div className="age-group ft-block">
              <div className="tab-title">
                <h5>Age</h5>
              </div>
              <Typography id="age" className="two-range"  >
                {`${age[0]} - ${age[1]}`}
              </Typography>
              <PrettoSlider value={age} min={18} max={100} onChange={handleChangeAge} valueLabelDisplay="auto"
                aria-labelledby="range-slider" />

            </div>
            <div className="distance-group ft-block">
              <div className="tab-title">
                <h5>Distance</h5>
              </div>
              <div className="range-slider">
                <Typography id="distance" className="two-range"  >
                  {`${distance} KM`}
                </Typography>
                <PrettoSlider value={distance} max={200} onChange={handleChangeDistance} valueLabelDisplay="auto"
                  aria-labelledby="range-slider" aria-labelledby="continuous-slider" />
              </div>
            </div>
            <div className="form-group">
              <label for="">Relationship status</label>
              <Selects class="form-control bg-trsp" name="relationshipStatus" id="" value={relationshipStatus} onChange={handleChange}>
                <option value="">Select</option>
                {relationship.map((relationships, index) => {
                  return <option value={relationships.id}>{relationships.name}</option>
                })}
              </Selects>
            </div>
            <div className="form-group">
              <label for="">Looking for</label>
              <Select
                value={lookingFor}
                options={looking.map((data) => { return { value: data.id, label: data.name } })}
                isMulti={true}
                onChange={(data) => dispatch(changeFilterInputs({ lookingFor: data }))}
              />
            </div>
            <div className="form-group">
              <label for="">Interest in</label>
              <Selects class="form-control bg-trsp" name="interests" id="" value={interests} onChange={handleChange} >
                <option value="">Select</option>
                {interest.map((data) => {
                  return <option value={data.id}>{data.name}</option>
                })}
              </Selects>
            </div>
            <div className="btns-group d-flex justify-content-between flex-wrap my-5">
              <button className="btn bg-grd-clr" onClick={handleFilter} type="submit">Done</button>
              <button className="btn bg-grd-clr" onClick={handleReset} type="reset">Reset</button>
            </div>
          </form>

        </div>
        <a href="javascript:void(0)" className="modal-close" onClick={() => setFilterModel(false)}><img src="/webapp/images/btn_close.png" /></a>
      </Modal>
    </>
  )
}
export default HomeFilter