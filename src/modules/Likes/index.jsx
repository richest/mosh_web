import react from 'react'
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery'
import { useHistory } from 'react-router';
import { getLikesDataApi } from '../../library/api/LikesApiServices';
import { Toolbars, UpgradeButton } from '../../library/common/components';
import { Logo } from '../../library/common/components';
import { addDefaultSrc, getCookie, returnDefaultImage } from '../../library/utilities/functions';
import { changePageLikeNo, clearLikeListResponse } from './LikesActions';
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { useState } from 'react';
import { HomeFilter } from '../Home/common';

const override = css`
text-align: center;
width: 40px;
height:40px
position: absolute;
left: 0;
right: 0;
margin: 0 auto;
top: 50%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
transform: translateY(-50%);

`;
let new_page = 1
const Likes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("")
  const LikeState = useSelector(state => state.LikesReducer);
  const userDataState = useSelector(state => state.SingleProfileReducer)
  const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
  const { likeListApi: { LikeListApiLoading, LikeListApiStatus } } = LikeState;
  const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
  new_page = LikeState.page;
  console.log(LikeState, "LikeState...");
  console.log(LikeState.page, "LikeState page...");
  useEffect(() => {
    dispatch(clearLikeListResponse());
    $(".show-filter").click(function () {
      $(".option-bar").toggleClass("filter-active");
    });
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 1) {
        if (window.location.pathname == "/webapp/likes") {
        dispatch(changePageLikeNo({ page: new_page + 1 }))
        }
      }
    });
    return () => {
      // dispatch(clearLikeListResponse());
    }
  }, [])

  useEffect(() => {
    if (LikeState.page !== null && LikeState.page !== undefined) {
      const bodyParameter = {
        session_id: localStorage.getItem("session_id"),
        page: LikeState.page
      }
      dispatch(getLikesDataApi(bodyParameter))
    }
  }, [LikeState.page])
  const handleClick = (userId) => {
    if (!!userId) {
      history.push(`/single-profile/${userId}`)
    }
  }

  return (
    <div className="home-inner">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
        <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                    <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                        <Logo />
                        <a className="show-filter" href="javascript:void(0)"><img src="/webapp/images/Filter.png" alt="filter" /></a>
                        {/* <span className="chat-point">
              <a href="javascript:void(0)">
                <i className="fas fa-comment" />
              </a>
            </span> */}
                    </div>
                    <HomeFilter/>
                </div>
          <div className="col-lg-9 main-bar p-3 rt-col">

            <div className="tab-top d-flex flex-wrap-wrap">
              {/* <Logo /> */}
              
              {
                                    ((singleProfileDataResponse.is_subscribed == 0 && !singleProfileApiLoading) || IsSubscription==0) &&
                                       <div className={(singleProfileDataResponse.is_subscribed == 0  || IsSubscription==0) ? "ml-auto mr-5" : "feature-menu "}>
                                       <UpgradeButton />
                                   </div>
                                   }
              <Toolbars />
              
            </div>
            <a href="javascript:void(0)" className="login-back-4 btn-back mb-4" onClick={() => history.goBack()}><i className="fas fa-chevron-left" /></a>
            {/* <Scrollbars autoHide className="sidebar__menu-scroll"> */}
         
            <div className="search-section-wrapper mt-4 px-4">
            <h2 className="text-center">Likes</h2>
              <div className="search-people-row">
                <div className="row">
                  {LikeState.LikeList.map((data) => {
                    return <div className="col-md-3">
                      <div className="sp-singular">
                        <a href="javascript:void(0)" onClick={() => handleClick(data.user_id)}>
                          <figure>
                            <img onError={(e) => addDefaultSrc(e)} src={!!data.profile_image ? data.profile_image : returnDefaultImage()} alt="Adrianne" />
                          </figure>
                          <div className="sp-singular-content">
                            {data.online_status == 1 ? <div className="status online">Online</div> :
                              <div className="status offline"></div>}
                            <h4>{data.name} </h4>
                            {/* <div className="info">47km, Fashion Model</div> */}
                          </div>
                        </a>
                      </div>
                    </div>
                  })}
                         {/* <ClipLoader color={"#fcd46f"} loading={!!LikeListApiLoading ? true : true} css={override}  /> */}
                </div>
              </div>
            </div>
            {!!message ?
              <p>{message}</p> : ""}
            {/* </Scrollbars> */}
          </div>
         
        </div>
 

      </div>
      
    </div>

  )
}
export default Likes