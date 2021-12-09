import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { UpgradeButton } from '..';
import { changeChatCount, changeFriendListClick } from '../../../../modules/Chat/FriendListAction';
import { SOCKET } from '../../../urls';
import { getCookie } from '../../../utilities/functions';
import MoshVipModel from '../MoshVipModel/MoshVipModel';

const Toolbars = () => {
  const profileData = !!getCookie("profile") ? JSON.parse(getCookie("profile")) : null;
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userID = getCookie("user_id");
  const [showVipModel, setShowVip] = useState(false);
  const FriendState = useSelector(state => state.FriendListReducer)
  const userDataState = useSelector(state => state.SingleProfileReducer)  
  const { chatCount, countFriendListClick } = FriendState
  const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
  console.log(singleProfileDataResponse ,"singleProfileDataResponse...")
  // console.log(chatCount ,"chatCount...")
  useEffect(() => {

    SOCKET.off('ping_frd_my_unread_message').on('ping_frd_my_unread_message', function (data) {
      if (data.user_id == userID) {
        console.log(data, userID, "data count")
        dispatch(changeChatCount({ chatCount: data.counts }))

      }
    });
  }, [])
  
  useEffect(() => {
    if (pathname == "/chat") {
      console.log(singleProfileDataResponse,"cfcddv")
      if(singleProfileDataResponse.is_subscribed==0){
      dispatch(changeFriendListClick({ countFriendListClick: countFriendListClick + 1 }))
      if (countFriendListClick > 4) {
        setShowVip(true)
        window.setTimeout(() => {
          document.getElementById("vipModalAdd").click();
      }, 0)
        dispatch(changeFriendListClick({ countFriendListClick: 1}))
      }
    }
    }
  }, [pathname])
  const hideVipModel = () => {
    setShowVip(false)
  }

  return (
    <>
      <ul className={singleProfileDataResponse.is_subscribed==0 ? "feature-menu" : "feature-menu ml-auto"}>
      {pathname!="/home"? <li className={`${pathname === '/home' ? '' : ''}`}>
          <Link to="/home">
            <i class="fas fa-home" style={{ fontSize: "21px" }}></i>
            {/* <span>Home</span> */}
          </Link>
        </li> :""} 
{/*         
        <li className={`${pathname === '/likes' ? 'active' : ''}`}>
          <Link to="/likes">
            <i class="fas fa-heart" style={{ fontSize: "21px" }}></i>
            <span>Like</span>
          </Link>
        </li> */}
       
        {/* <li className={`${pathname === '/chat' || pathname.match("/message-box")  ? 'active' : ''}`} >
       
          <Link to="/chat">
            <i class="fas fa-comment-dots" style={{ position: 'relative', fontSize: "21px" }}>
              {UpgradeButton}</i>
            <span>Chat</span>
          </Link>
        </li> */}
        <li className="logged-user">
          <Link to="/profile">
            <i className="fas fa-user" style={{ fontSize: "21px" }} />
            
            {!!profileData ? profileData.first_name: ""}
            <span>Profile</span>
          </Link>
        </li>
      </ul>
      <MoshVipModel showModel={showVipModel}
        hideModel={hideVipModel}
      />
    </>
  )
}
export default Toolbars