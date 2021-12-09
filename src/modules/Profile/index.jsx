import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { UpdateProfile, MembershipPlans } from './common'
import { Toolbars, Logo, UpgradeButton } from '../../library/common/components'
import { useHistory } from 'react-router'
import { Modal } from 'react-bootstrap';
import { getSingleProfileDataApi } from '../../library/api/SingleProfileApiService'
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, FacebookShareButton, TelegramShareButton, WhatsappShareButton, TwitterShareButton, } from "react-share";
import { clearSingleProfileResponse } from '../SingleProfile/SingleProfileAction'
import { addDefaultSrc, clearCookies, getCookie, returnDefaultImage, setCookie } from '../../library/utilities/functions'
import { useDispatch, useSelector } from 'react-redux'
import { changeActivateDeactivate, clearActivateDeactivate, clearlogoutResponse, clearPlanListResponse } from './ProfileActions'
import { activatedeactivateApi, LogoutApi } from '../../library/api/profileApiService'
import { changeIsAuth } from '../../library/common/actions/AuthActions'
import { useRef } from 'react';
import { SOCKET } from '../../library/urls';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const confirmEl = useRef(null)
    const userDataState = useSelector(state => state.SingleProfileReducer);
    const profileState = useSelector(state => state.ProfileReducer);
    const chatState = useSelector(state => state.ChatReducer);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    const { getPlanListApi: { PlanList, planInfo } } = profileState
    const { logoutApi: { logoutSuccess } } = profileState
    const { deactivateActivateApi: { activateStatus } } = profileState
    console.log(profileState, "profileState..")

    const shareUrl = 'https://moshmatch.com/';
    const title = 'mosh-app';

    useEffect(() => {
        dispatch(clearSingleProfileResponse())
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            user_id: getCookie("user_id")
        }
        dispatch(getSingleProfileDataApi(bodyParameter))
        return () => {
            dispatch(clearlogoutResponse());
        }
    }, [])

    useEffect(() => {
        if (!!singleProfileDataResponse) {
            dispatch(changeActivateDeactivate({ accountDeativated: singleProfileDataResponse.profile_enabled == 2 ? false : true }))
        }
    }, [singleProfileDataResponse])

    useEffect(() => {
        if (!!logoutSuccess) {
            localStorage.clear();
            clearCookies()
            SOCKET.emit("destroy_socket_connection", { socket_id: chatState.socket_id });
            // dispatch(changeIsAuth({ is_auth: false }))
            window.location.href = "/webapp/login";
        }
    }, [logoutSuccess])

    useEffect(() => {
        if (!!activateStatus) {
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                user_id: getCookie("user_id")
            }
            dispatch(getSingleProfileDataApi(bodyParameter))
            dispatch(clearActivateDeactivate());
        }
    }, [activateStatus])
    console.log(logoutSuccess, "logoutSuccess...")
    const handleLogout = () => {
        console.log(logoutSuccess, "logoutSuccess...")
        const bodyParameter = {
            session_id: localStorage.getItem("session_id")
        }
        dispatch(LogoutApi(bodyParameter))
    }
    const handleActivate = (e) => {
        // alert(e.target.checked)
        if (!!e.target.checked) {
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                account_active: singleProfileDataResponse.profile_enabled == 2 ? 1 : 2
            };
            dispatch(activatedeactivateApi(bodyParameter))
            dispatch(changeActivateDeactivate({ accountDeativated: e.target.checked }))
        }
        else {
            setShowConfirm(true);
            // dispatch(changeActivateDeactivate({ accountDeativated: e.target.checked }))
        }
    }
    const handleCloseConfirm = (e) => {
        setShowConfirm(false);
        dispatch(changeActivateDeactivate({ accountDeativated: true }))
    }
    const handleConfirmActivate = () => {
        setShowConfirm(false);
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            account_active: singleProfileDataResponse.profile_enabled == 2 ? 1 : 2
        };
        dispatch(activatedeactivateApi(bodyParameter))
    }
    console.log(singleProfileDataResponse.SubscriptionDetail, "SubscriptionDetail...")
    return (
        <>
            <div>
                <div className="header-bar">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-lg-5 p-3">
                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="logo-tab d-flex justify-content-between align-items-start">
                                        <Logo />
                                    </div>
                                </div>
                                <a href="javascript:void(0)" className="login-back-4 btn-back mb-4" onClick={() => history.goBack()}><i className="fas fa-chevron-left" /></a>
                              
                            </div>
                            <div className="col-lg-7 p-3">
                          
                                <div className="tab-top d-flex flex-wrap-wrap align-items-center">
                                <h2 className="text-center">Profile</h2>
                                {
                                       ((singleProfileDataResponse.is_subscribed == 0 && !singleProfileApiLoading) || IsSubscription==0) &&
                                       <div className={(singleProfileDataResponse.is_subscribed == 0  || IsSubscription==0) ? "ml-auto mr-5" : "feature-menu "}>
                                       <UpgradeButton />
                                   </div>
                                   }
                                    <Toolbars />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container becomevip-wrapper">
                    <div className="row">
                        <div className="col-md-4 border-rt">
                            <div className="user-profile becomevip-wrapper__innerblock p-0">
                                <div className="user-profile__details text-center">
                                    <img onError={(e) => addDefaultSrc(e)} src={!!singleProfileDataResponse.profile_image ? singleProfileDataResponse.profile_image : returnDefaultImage()} alt="user" className="user-profile__image img-circle" />
                                    <div className="user-profile__details__data">
                                        <h5 className="user-profile__name text-capitalize">{singleProfileDataResponse.first_name}</h5>
                                        <div className="user-profile__level d-inline-block">
                                            {singleProfileDataResponse.is_subscribed == 1 ?
                                                <span className="d-block"><img src="images/level-img.png" alt="profile level" /></span> : ""}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="user-profile__options becomevip-wrapper__innerblock">
                                <ul>
                                    <li><a href="javascript:void(0)" id="edit-profile" onClick={() => history.push("/update-profile")} className="hover-link">
                                        <i class="fas fa-user-edit"></i>
                                        <h6>Edit Profile</h6>
                                    </a></li>
                                    <li><a href="javascript:void(0)" id="invite-modal" onClick={() => setShowShare(true)} className="hover-link">
                                        <i class="fas fa-share"></i>
                                        <h6>Invite Friends</h6>
                                    </a></li>
                                    <li><a href="https://moshmatch.com/contact-us.php" target="_blank" className="title" className="hover-link">
                                        <i class="fas fa-mobile-alt"></i>
                                        <h6>Contact Us</h6>
                                    </a></li>
                                </ul>
                            </div>
                            <div className="user-profile__options becomevip-wrapper__innerblock">
                                <div className="custom-checkbox__status">
                                    <span >Activate/Deactivate</span>
                                    <label className="switch">
                                        <input type="checkbox" checked={profileState.accountDeativated} onChange={handleActivate} />
                                        <span className="slider" />
                                    </label>
                                </div>

                            </div>
                            <div className="user-profile__logout becomevip-wrapper__innerblock text-center">
                                <a href="javascript:void(0)" className="text-white signout-btn" onClick={handleLogout}>
                                    <i class="fas fa-sign-out-alt"></i> Log out </a>
                            </div>
                            <div className="text-center">
                                <a href="https://moshmatch.com/terms-of-service.php" target="_blank" className="title text-white hover-link"> Terms &amp; Condiitions</a>
                            </div>
                            <div className="text-center">
                                <a href="https://moshmatch.com/privacy-policy.php" target="_blank" className="title text-white hover-link">Privacy Policy</a>
                            </div>
                        </div>
                        <MembershipPlans PlanList={PlanList}
                            Modal={Modal}
                            singleProfileDataResponse={singleProfileDataResponse}
                            profileState={profileState}
                        />
                        <div className="col-md-4">
                            <div className="user-actions">
                                <table border="solid" style={{ width: "100%" }} cellpadding="10" cellspacing="10" >
                                    <tr>
                                        <th>FEATURES</th>
                                        <th>SILVER PLAN</th>
                                        <th>GOLD PLAN</th>
                                    </tr>

                                    {planInfo.map((data) => {
                                        return <tr>
                                            <td style={{ fontWeight: 'bold' }}>{data.feature}</td>
                                            <td>{data.silver_plan}</td>
                                            <td>{data.gold_plan}</td>
                                        </tr>
                                    })}

                                </table>
                                {/* <ul>
                                        <li><a href>
                                            <span><img src="images/heartPink.png" alt="gifts" /></span>
                                            <h6 className="mb-0">Favorite Unlimited </h6>
                                        </a></li>
                                        <li><a href>
                                            <span><img src="images/footprint.png" alt="Edit Profile" /></span>
                                            <h6 className="mb-0">Poke Unlimited</h6>
                                        </a></li>
                                    </ul> */}

                            </div>
                            {!!singleProfileDataResponse.SubscriptionDetail && (singleProfileDataResponse.SubscriptionDetail).length != 0 &&
                            <>
                                <div className="membership-plans__block active mt-4">
                                    Your current plan
                                    <a href="javascript:void(0)">
                                        {/* <span className="membership-discount">save 76 %</span> */}
                                        <h5 className="text-white text-uppercase mb-0">{singleProfileDataResponse.SubscriptionDetail.title}</h5>
                                        {/* <h7>Purchased on</h7> */}
                                        <div className="membership-plans__price">
                                            <span>INR {singleProfileDataResponse.SubscriptionDetail.amount}</span>
                                            {/* <span>{moment(singleProfileDataResponse.SubscriptionDetail.updated_at).format('ll')}</span> */}
                                        </div>
                                    </a>
                                </div>
                                </>
                            }
                        </div>

                    </div>

                </div>

            </div>
            <Modal className="report-modal" show={showConfirm} onHide={() => setShowConfirm(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                <div className="edit-profile-modal__inner">

                    <h4 className="theme-txt text-center mb-4 ">Are you want to?</h4>
                    <h5>Deactivate Account</h5>
                    <div>
                        <a href="javascript:void(0)" onClick={handleCloseConfirm}>cancel</a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" onClick={handleConfirmActivate}>ok</a>
                    </div>
                </div>
            </Modal>

            <Modal className="share-model" show={showShare} onHide={() => setShowShare(false)} >
                <h4 class="theme-txt text-center mb-4 ">Share Mosh</h4>
                <div className="share__icons d-flex justify-content-center">
                    <div className="some-network">
                        <FacebookShareButton url={shareUrl} quote={title} className="share-button" >
                            <FacebookIcon round />
                        </FacebookShareButton>
                    </div>

                    <div className="some-network">
                        <TwitterShareButton url={shareUrl} title={title} className="share-button" >
                            <TwitterIcon round />
                        </TwitterShareButton>
                    </div>

                    <div className="some-network">
                        <TelegramShareButton url={shareUrl} title={title} className="share-button">
                            <TelegramIcon round />
                        </TelegramShareButton>
                    </div>

                    <div className="some-network">
                        <EmailShareButton url={shareUrl} subject={title} body="body" className="share-button">
                            <EmailIcon round />
                        </EmailShareButton>
                    </div>


                    <div className="some-network">
                        <WhatsappShareButton url={shareUrl} title={title} separator=":: " className="share-button">
                            <WhatsappIcon round />
                        </WhatsappShareButton>
                    </div>
                    <div className="some-network">
                        < LinkedinShareButton url={shareUrl} title={title} className="share-button">
                            <LinkedinIcon round />
                        </ LinkedinShareButton>
                    </div>
                </div>
                <a href="javascript:void(0)" className="modal-close" onClick={() => setShowShare(false)}><img src="images/btn_close.png" /></a>

            </Modal>
        </>
    )
}
export default Profile