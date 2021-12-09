import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Logo, MoshVipModel, Toolbars, UpgradeButton } from '../../library/common/components';
import { useToasts } from 'react-toast-notifications';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import { addDefaultSrc, getCookie, returnDefaultImage } from '../../library/utilities/functions';
import { addRemoveFavouriteDataApi, blockUnblockDataApi, checkMessageLimit, getSingleProfileDataApi, purrDataApi, reportListDataApi, reportUserDataApi } from '../../library/api/SingleProfileApiService';
import { useDispatch, useSelector } from 'react-redux';
import { changeReportUserInput, clearAddRemoveResponse, clearBlockUnblockResponse, clearLikeLimitReach, clearMessageLimitResonse, clearPurrUserResponse, clearReportUserResponse, clearSingleProfileResponse } from './SingleProfileAction';
import { useState } from 'react';
import { SOCKET } from '../../library/urls';
import { HomeFilter } from '../Home/common';


const SingleProfile = () => {
    const { userId } = useParams();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    const [reportShow, setReportShow] = useState(false)
    const [showVipModel, setShowVip] = useState(false)
    const userDataState = useSelector(state => state.SingleProfileReducer)
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { addRemoveFavourite: { addRemoveFavouriteStatus, addRemoveFavouriteMessage }, LikesLimitReach } = userDataState
    const { reportUserApi: { reportUserMessage, reportUserError } } = userDataState
    const { reportUser: { report, reportList } } = userDataState
    const { purrUserApi: { purrUserStatus, purrUserMessage, purrLimitReach } } = userDataState
    const { blockUnblockApi: { blockUnblockSuccess, blockUnblockMessage } } = userDataState
    const { checkMessageLimitApi: { checkMessageLimitSuccess, checkMessageLimitLimitReach } } = userDataState
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    console.log(userDataState, "userdataState...")

    useEffect(() => {
        if (!!checkMessageLimitSuccess) {
            if (!!checkMessageLimitLimitReach) {
                setShowVip(true)
                window.setTimeout(() => {
                    document.getElementById("vipModalAdd").click();
                }, 0)
            }
            else {
                history.push(`/message-box/${userId}`)
            }
            dispatch(clearMessageLimitResonse());
        }
    }, [checkMessageLimitSuccess])

    useEffect(() => {
        if (!!addRemoveFavouriteStatus) {
            if (LikesLimitReach != 0) {
                setShowVip(true)
                window.setTimeout(() => {
                    document.getElementById("vipModalAdd").click();
                }, 0)
            }
            else {
                addToast(addRemoveFavouriteMessage, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }
            dispatch(clearAddRemoveResponse());
            getProfileData();
        }
    }, [addRemoveFavouriteStatus])
    useEffect(() => {
        if (reportUserError === "false") {
            addToast(reportUserMessage, {
                appearance: 'success',
                autoDismiss: true,
            });
            setReportShow(false);
            dispatch(clearReportUserResponse())
        }
    }, [reportUserError])
    useEffect(() => {
        if (!!purrUserStatus) {
            if (purrLimitReach != 0) {
                setShowVip(true)
                window.setTimeout(() => {
                    document.getElementById("vipModalAdd").click();
                }, 0)
            }
            else {
                addToast(purrUserMessage, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }
            dispatch(clearPurrUserResponse())
        }
    }, [purrUserStatus])
    useEffect(() => {
        if (!!blockUnblockSuccess) {
            addToast(blockUnblockMessage, {
                appearance: 'success',
                autoDismiss: true,
            });
            let do_frd_have_blocked_me = {
                sender_id: userId,
                reciever_id: getCookie("user_id"),
                toMe: true
            }
            SOCKET.emit("do_frd_have_blocked_me", do_frd_have_blocked_me)
            do_frd_have_blocked_me.toMe = false;
            SOCKET.emit("do_frd_have_blocked_me", do_frd_have_blocked_me)
            dispatch(clearBlockUnblockResponse());
            getProfileData();
        }
    }, [blockUnblockSuccess])
    const getProfileData = () => {
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            user_id: userId
        }
        dispatch(getSingleProfileDataApi(bodyParameter))
    }
    useEffect(() => {
        dispatch(clearSingleProfileResponse())
        getProfileData();
        const bodyParameter = {
            session_id: localStorage.getItem("session_id")
        }
        dispatch(reportListDataApi(bodyParameter))
        return () => {
            dispatch(clearSingleProfileResponse())
            dispatch(clearReportUserResponse())
            dispatch(changeReportUserInput({ report: "" }))
            dispatch(clearAddRemoveResponse());
            dispatch(clearLikeLimitReach())
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                user_id: getCookie("user_id")
            }
            dispatch(getSingleProfileDataApi(bodyParameter))
        }
    }, [])

    const handleBack = () => {
        history.goBack();
    }

    const handleFavourite = () => {
        const bodyParameter = {
            fav_user_id: userId,
            session_id: localStorage.getItem("session_id"),
            add: singleProfileDataResponse.is_favorite == 1 ? "0" : "1"
        }
        dispatch(addRemoveFavouriteDataApi(bodyParameter))
    }

    const handleChange = (e) => {
        dispatch(changeReportUserInput({ [e.target.name]: e.target.value }))
    }
    const handleReport = () => {
        const bodyParameter = {
            userID: userId,
            session_id: localStorage.getItem("session_id"),
            reportMsgID: report
        }
        dispatch(reportUserDataApi(bodyParameter))
    }
    const handlePurr = () => {
        const bodyParameter = {
            user_id: userId,
            session_id: localStorage.getItem("session_id")
        }
        dispatch(purrDataApi(bodyParameter))
    }
    const handleBlockUnblock = () => {
        const bodyParameter = {
            blocked_user_id: userId,
            session_id: localStorage.getItem("session_id"),
            status: singleProfileDataResponse.is_blocked == 0 ? 1 : 0
        }
        dispatch(blockUnblockDataApi(bodyParameter))
    }
    const hideVipModel = () => {
        setShowVip(false)
    }
    const handleMessageClick = () => {
        if (singleProfileDataResponse.is_blocked == 1) {
            addToast("Blocked", {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        else {
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                user_id: userId
            }
            dispatch(checkMessageLimit(bodyParameter))
        }

    }
    return (
        <>
            <div>

                <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                    <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                        <Logo />

                    </div>
                    <HomeFilter />
                </div>
                <div className="col-lg-9 main-bar p-3 rt-col">
                    <div className="tab-top d-flex flex-wrap-wrap">
                        {
                            IsSubscription == 0 &&
                            <div className={IsSubscription == 0 ? "ml-auto mr-5" : "feature-menu "}>
                                <UpgradeButton />
                            </div>
                        }
                        <Toolbars />
                    </div>
             

                <div className="sprofile-inner ">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <div className="back-bar d-flex align-items-center">
                                    <a className="btn-back" href="javascript:void(0)" onClick={handleBack}><i className="fas fa-chevron-left" /></a>
                                    <span className="theme-txt">Back</span>
                                </div>
                               
                            </div>
                            {/* <div className="col-md-7">
                                <div className="report-tab d-flex flex-wrap align-items-center justify-content-end ml-auto">
                                    <span className="block-cta">
                                        <a className="theme-txt" href="javascript:void(0)">Block</a>
                                    </span>
                                    <span className="report-cta">
                                        <a className="theme-txt" href="javascript:void(0)">Report</a>
                                    </span>
                                </div>
                            </div> */}
                             <h2 className="text-center">Single Profile</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="p-title-info d-flex flex-wrap align-items-center justify-content-between my-3">
                                    <div className="pphoto-count">
                                        <i className="far fa-image" />
                                        <span className="d-inline-block">
                                            {!!singleProfileDataResponse.userImagesArray && singleProfileDataResponse.userImagesArray.length > 0 ? singleProfileDataResponse.userImagesArray.length : 1} Photos</span>
                                    </div>
                                    <div className="profile-id">
                                        {singleProfileDataResponse.is_favorite == 1 ?
                                            <img className="icon-image" onClick={handleFavourite} style={{ maxWidth: "35px", cursor: "pointer" }} src="/webapp/images/heartBtnSelected.png" />
                                            :
                                            <img className="icon-image" onClick={handleFavourite} style={{ maxWidth: "35px", cursor: "pointer" }} src="/webapp/images/heartbtn.png" />}
                                        <img className="icon-image" onClick={handleMessageClick} style={{ maxWidth: "35px", cursor: "pointer" }} src="/webapp/images/chatBackgroung.png" />
                                        <img className="icon-image" onClick={handlePurr} style={{ maxWidth: "35px", cursor: "pointer" }} src="/webapp/images/footprint.png" />
                                        <Dropdown >
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {singleProfileDataResponse.is_blocked == 1 ?
                                                    <img className="icon-image" style={{ maxWidth: "35px" }} src="/webapp/images/blockIcon.png" />
                                                    :
                                                    <img className="icon-image" style={{ maxWidth: "35px" }} src="/webapp/images/blockedUserIcon.png" />}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleBlockUnblock} href="javascript:void(0)"> {singleProfileDataResponse.is_blocked == 0 ? "Block User" : "Unblocked User"}</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setReportShow(true)} href="javascript:void(0)">Report</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                {!!singleProfileDataResponse.userImagesArray && singleProfileDataResponse.userImagesArray.length > 0 ?
                                    <Carousel id="images_crousal" indicators={false}>
                                        {singleProfileDataResponse.userImagesArray.map((data) => {
                                            return <Carousel.Item interval={700}>
                                                <div className="items position-relative">
                                                    <figure>
                                                        <img onError={(e) => addDefaultSrc(e)} src={!!data.image ? data.image : returnDefaultImage()} alt="Marlene" />
                                                    </figure>

                                                    <div className="sp-meta-info">
                                                        <div className="meta-info-data">
                                                            <h5>{singleProfileDataResponse.first_name}{!!singleProfileDataResponse.age ? "," : ""}{singleProfileDataResponse.age}</h5>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Carousel.Item>
                                        })}
                                    </Carousel>
                                    :
                                    <div className="items">
                                        <figure>
                                            <img onError={(e) => addDefaultSrc(e)} src={!!singleProfileDataResponse.profile_image ? singleProfileDataResponse.profile_image : returnDefaultImage()} alt="Marlene" />
                                        </figure>
                                        <div className="sp-meta-info">
                                            <div className="meta-info-data">
                                                <h5>{singleProfileDataResponse.first_name}{!!singleProfileDataResponse.age ? "," : ""} {singleProfileDataResponse.age}</h5>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-md-7 pl-5">
                                <div className="profile-bio-inner my-3">
                                    {!!singleProfileDataResponse.about_me && !!userDataState ?
                                        <div className="bio-about">
                                            <h5 className="mb-3">Bio</h5>
                                            <p className="mb-0">{singleProfileDataResponse.about_me}</p>
                                        </div> : ""}
                                    <div className="bio-education">
                                        <h5 className="mb-3">Education</h5>
                                        <p className="mb-0">{!!singleProfileDataResponse.education ? singleProfileDataResponse.education : ""}</p>
                                    </div>
                                    <div className="bio-basics">
                                        <h5 className="mb-3">Basic Profile</h5>
                                        <ul>
                                            <li>
                                                <div className="theme-txt">Age:</div>
                                                <div>{!!singleProfileDataResponse.age ? singleProfileDataResponse.age : ""}</div>
                                            </li>
                                            <li>
                                                <div className="theme-txt">height:</div>
                                                <div>
                                                    {!!singleProfileDataResponse.height_feet ? singleProfileDataResponse.height_feet : ""}
                                                    {!!singleProfileDataResponse.height_inches ? "." : ""}
                                                    {!!singleProfileDataResponse.height_inches ? singleProfileDataResponse.height_inches : ""}</div>
                                            </li>
                                            <li>
                                                <div className="theme-txt">Weight:</div>
                                                <div>{!!singleProfileDataResponse.weight ? singleProfileDataResponse.weight : ""}</div>
                                            </li>
                                            <li>
                                                <div className="theme-txt">Relationship status:</div>
                                                <div>{!!singleProfileDataResponse.relationship_status ? singleProfileDataResponse.relationship_status.name : ""}</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bio-interest">
                                        <h5 className="mb-3">Body Type</h5>
                                        <div className="interest-tags">
                                            {!!singleProfileDataResponse.body_type &&
                                                singleProfileDataResponse.body_type.map((data) => {
                                                    return <span>{data.name}</span>
                                                })
                                            }

                                        </div>
                                    </div>
                                    <div className="bio-looking">
                                        <h5 className="mb-3">Looking For</h5>
                                        <div className="looking-for">
                                            {!!singleProfileDataResponse.what_looking_for &&
                                                singleProfileDataResponse.what_looking_for.map((data) => {
                                                    return <span>{data.name}</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Modal className="report-modal" show={reportShow} onHide={() => setReportShow(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
                <div className="edit-profile-modal__inner">

                    <h4 className="theme-txt text-center mb-4 ">Why are you reporting this person?</h4>

                    <form>
                        <div className="choose-report d-flex flex-wrap">
                            {reportList.map((data) => {
                                return <div className="form-group">
                                    <input type="radio" name="report" value={data.id} id={data.title + data.id} onChange={handleChange} />
                                    <label for={data.title + data.id}></label>
                                    <span>{data.title} </span>
                                </div>
                            })}
                        </div>
                        <a href="javascript:void(0)" onClick={() => setReportShow(false)}>cancel</a>

                    </form>
                    <a href="javascript:void(0)" onClick={handleReport}>ok</a>
                </div>
                {/* <a href="javascript:void(0)" className="modal-close" onClick={() => setReportShow(false)}><img src="/webapp/images/btn_close.png" /></a> */}
            </Modal>
            <MoshVipModel showModel={showVipModel}
                hideModel={hideVipModel}
            />

        </>
    )
}
export default SingleProfile