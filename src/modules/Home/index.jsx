import React from 'react';
import { useEffect } from 'react';
import $ from 'jquery'
import { Logo, Toolbars, UpgradeButton } from '../../library/common/components';
import { HomeFilter, HomeCard } from './common';
import { changeFilterInputs, clearFilterInputs, clearFilterListResponse } from './HomeActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getCookie } from '../../library/utilities/functions';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { pathname } = useLocation();
  const userDataState = useSelector(state => state.SingleProfileReducer)
  const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
  const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
  console.log(userDataState, "HomeData")
  useEffect(() => {
    $(".show-filter").click(function () {
      $(".option-bar").toggleClass("filter-active");
    });
    return () => {
      dispatch(clearFilterInputs())
      dispatch(clearFilterListResponse());
      dispatch(changeFilterInputs({ page: 0 }));

    }
  }, [])
  return (
    <div className="home-inner">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-3 option-bar p-3 vh-100">
            <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
              <Logo />
              {/* <a href="javascript:void(0)">
                  <img src="/webapp/images/glitters.png" alt="Glitters" />
                </a> */}
              <a className="show-filter" href="javascript:void(0)"><img src="/webapp/images/Filter.png" alt="filter" /></a>
              {/* <span className="chat-point position-relative"> */}
              <a href="javascript:void(0)" onClick={() => history.push("/message-online")} className="message-icon">
                <i class="far fa-comment-alt"></i>
                {/* <i className="fas fa-comment" /> */}
              </a>
              {/* </span> */}
            </div>
            <HomeFilter />
          </div>
          <div className="col-lg-9 main-bar p-3" style={{ marginLeft: '25%' }}>
            
            <div className="tab-top d-flex flex-wrap mobile-menu">
              {/* <div className="live-icon">
                  <img src="/webapp/images/live.png" alt="Live" />
                </div> */}
              {
                ((singleProfileDataResponse.is_subscribed == 0 && !singleProfileApiLoading) || IsSubscription==0) &&
                <div className={(singleProfileDataResponse.is_subscribed == 0  || IsSubscription==0) ? "ml-auto mr-5" : "feature-menu "}>
                  <UpgradeButton />
                </div>
              }
              <Toolbars />
            </div>
            <div className="profile-swipe-wrapper">
              <HomeCard />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Home;