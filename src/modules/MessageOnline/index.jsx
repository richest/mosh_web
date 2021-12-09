import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import { getFilterDataApi } from '../../library/api/HomeApiService'
import { MoshVipModel, Toolbars, UpgradeButton } from '../../library/common/components'
import { Logo } from '../../library/common/components'
import { addDefaultSrc, getCookie, returnDefaultImage, scroolTop } from '../../library/utilities/functions'
import { changeMessagePageNumber } from './MessageOnlineAction'
import { clearFilterListResponse } from '../Home/HomeActions'
import { useHistory } from 'react-router'
import { clearMessageLimitResonse } from '../SingleProfile/SingleProfileAction'
import { useState } from 'react'
import { checkMessageLimit } from '../../library/api/SingleProfileApiService'
import { HomeFilter } from '../Home/common'

let new_page = 1;

const MessageOnline = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [showVipModel, setShowVip] = useState(false)
    const ListState = useSelector(state => state.Homereducer);
    const MessageState = useSelector(state => state.MessageOnlineReducer);
    const userDataState = useSelector(state => state.SingleProfileReducer)
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { checkMessageLimitApi: { checkMessageLimitSuccess, checkMessageLimitLimitReach } } = userDataState
    const { filterApi: { getFilterResonse, getFilterApiSuce } , filterList } = ListState
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    const { messagePage } = MessageState;
    new_page = messagePage;
    console.log(MessageState, "MessageState...")
    console.log(ListState, "ListState")


    const hideVipModel = () => {
        setShowVip(false)
    }

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

    const getOnlineUser = () => {
        const bodyparameter = {
            session_id: localStorage.getItem("session_id"),
            page: messagePage,
            limit: "",
            is_online: true
        }
        dispatch(getFilterDataApi(bodyparameter))
    }
    useEffect(() => {
        if (messagePage !== null && messagePage !== undefined) {
            getOnlineUser();
        }
    }, [messagePage])

    // alert(MessageState.page)
    console.log(messagePage, "bwjbwnx")
    useEffect(() => {
        $(".show-filter").click(function () {
            $(".option-bar").toggleClass("filter-active");
          });
        scroolTop();
        dispatch(changeMessagePageNumber({ messagePage: 1 }))
        // alert(messagePage)
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()-1) {
                if (window.location.pathname == "/webapp/message-online") {
                dispatch(changeMessagePageNumber({ messagePage: new_page + 1 }))
                }
            }
        });
        return () => {
            dispatch(changeMessagePageNumber({ messagePage: 1 }))
            dispatch(clearFilterListResponse())
            // alert(messagePage)
        }
    }, [])
    const handleCardClick = (id) => {
        setUserId(id)
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            user_id: id
        }
        dispatch(checkMessageLimit(bodyParameter))
    }
    return (
        <>
            <div className="message-inner">
                {/* <div className="container-fluid p-0"> */}
                {/* <div className="row no-gutters"> */}
                <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                    <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                        <Logo />
                        <a className="show-filter" href="javascript:void(0)"><img src="/webapp/images/Filter.png" alt="filter" /></a>
                    </div>
                    <HomeFilter/>
                </div>
              
                <div className="col-lg-9 main-bar p-3 rt-col">
               
                    <div className="tab-top d-flex flex-wrap-wrap">
                    {/* <Logo/> */}
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
                    <h2 className="text-center">New And Online</h2>
                        <div className="search-people-row">
                            <div className="row">
                                {filterList.map((data) => {
                                    return <div className="col-md-3" >
                                        <div className="sp-singular">
                                            <a href="javascript:void(0)" onClick={() => handleCardClick(data.user_id)} >
                                                <figure>
                                                    <img onError={(e) => addDefaultSrc(e)} src={!!data.profile_image ? data.profile_image : returnDefaultImage()} alt="Adrianne" />
                                                </figure>
                                                <div className="sp-singular-content">
                                                    {data.online_status == 1 ? <div className="status online">Online</div> :
                                                        <div className="status offline"></div>}
                                                    <h4>{data.name} </h4>
                                                    <div className="info">Chat Now</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    {/* </Scrollbars> */}
                </div>
                {/* </div> */}
                {/* </div> */}
            </div>
            <MoshVipModel showModel={showVipModel}
                hideModel={hideVipModel}
            />
        </>
    )
}
export default MessageOnline