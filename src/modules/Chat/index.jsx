import React from 'react'
import { useEffect } from 'react';
import $ from 'jquery'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { chatListDataApi } from '../../library/api/ChatApiService';
import { Logo, Toolbars, UpgradeButton } from '../../library/common/components'
import { addDefaultSrc, getCookie, returnDefaultImage } from '../../library/utilities/functions';
import { MessageBox } from './common';
import { useHistory } from 'react-router';
import { changeChatCount, changeChatList, changeChatPageNo, clearChatListresponse } from './FriendListAction';
import { SOCKET } from '../../library/urls';
import { HomeFilter } from '../Home/common';

const removeDublicateFrd = (chatList) => {
    chatList.forEach((data_outer, i) => {
        let count = 0;
        chatList.forEach((data_inner, j) => {
            if (data_inner.user_id == data_outer.user_id) {
                count += 1;
                if (count > 1) {
                    chatList.splice(j, 1)
                }
            }
        })
    })
    console.log(chatList, "after removingg...")
    return chatList
}

function sortByDate(a, b) {
    if (a.dateTimestamp > b.dateTimestamp) {
        return -1;
    }
    if (a.dateTimestamp < b.dateTimestamp) {
        return 1;
    }
    return 0;
}

let new_page = 1, chatListApiList = [];

const ChatBox = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = getCookie("user_id");
    const FriendState = useSelector(state => state.FriendListReducer)
    const userDataState = useSelector(state => state.SingleProfileReducer)
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { page, chatList, chatCount } = FriendState
    const { chatListApi: { chatListSucess } } = FriendState
    const IsSubscription = !!getCookie("is_subscribed") ? getCookie("is_subscribed") : ""
    new_page = page;
    console.log(FriendState, "chatState...")

    console.log(chatList, "chatList...sdg")
    chatListApiList = chatList

    useEffect(() => {
        $('#chat').on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                dispatch(changeChatPageNo({ page: new_page + 1 }))
            }
        })

        return () => {
            dispatch(clearChatListresponse())
            dispatch(changeChatPageNo({ page: 1 }))
        }
    }, [])
    useEffect(() => {
        if (!!chatListSucess && page == 1) {
            SOCKET.emit('get_unread_frd_messages', {
                user_id: userId,
                check_user: userId,
                toMe: true
            });
        }
    }, [chatListSucess])
    useEffect(() => {
        if (!!page) {
            const bodyParameter = {
                session_id: localStorage.getItem("session_id"),
                page: page
            }
            dispatch(chatListDataApi(bodyParameter));
        }
    }, [page])

    const handleClickChat = (id) => {
        if (!!id) {
            history.push(`/message-box/${id}`)
        }
    }
    useEffect(() => {
        SOCKET.off('is_user_active').on('is_user_active', function (data) {
            const frds_list = chatList;
            for (let i in frds_list) {
                if (data.user_id == frds_list[i].user_id) {
                    frds_list[i].online = !!data.is_online ? true : false
                }
            }
            // dispatch(changeChatList({ chatList: frds_list }))
        });

        SOCKET.off('get_unread_frd_messages').on('get_unread_frd_messages', (unreadData) => {
            let total_unread_frds = 0;
            // let call_future = store.getState().auth.futureCall
            if (unreadData.check_user == userId) {
                let chat_List = chatListApiList;
                let unreadList = unreadData.unreadMessagesList;
                for (let i in unreadList) {
                    total_unread_frds += unreadList[i].counts > 0 ? 1 : 0;
                    // unreadList[i].user_id == unreadList[i].friend_id
                    for (let j in chat_List) {
                        if (unreadList[i].friend_id == chat_List[j].user_id) {
                            unreadList[i].device_token = chat_List[j].device_token;
                            console.log(chat_List[j], "removed person....")
                            chat_List.splice(j, 1)

                        }
                    }
                }
                for (let k in chat_List) {
                    chat_List[k].counts = 0
                }
                console.log(unreadList, chat_List, "fdfdhfgdhfhddhfhghd")
                let chatlist = [...unreadList, ...chat_List]
                console.log(chatlist, "chatliost...")
                chat_List = removeDublicateFrd(chatlist);
                for (let i in chat_List) {
                    chat_List[i].dateTimestamp = !!chat_List[i].created_at ? new Date(chat_List[i].created_at).getTime() : 0;
                }
                // sorting...
                chat_List.sort(sortByDate);
                const frdsOnlineStatus = unreadData.frdsOnlineStatus;
                // console.log(frdsOnlineStatus, chatlist, "frdsOnlineStatus..")
                for (let h in frdsOnlineStatus) {
                    for (let r in chatlist) {
                        if (frdsOnlineStatus[h].user_id == chatlist[r].user_id) {
                            chatlist[r].online = frdsOnlineStatus[h].online
                        }
                    }
                }
                //console.log("chatListchatList",chatList)
                //   chatList = [...unreadList, ...chatList];
                //   dispatch({
                //     type: types.CHAT_COUNTER,
                //     payload: total_unread_frds,
                //   });
                //   dispatch({
                //     type: types.CHAT_LIST_USER,
                //     payload: chatList,
                //   });
                dispatch(changeChatList({ chatList: chat_List }))
                //     if (this.props.futureCall) {
                //     SOCKET.emit('get_unread_frd_messages', {
                //       user_id: this.props.userData.id,
                //       future_calls: true
                //     });
                //   }
            }

        })
    }, [])
    return (
        <>
          
              
                   

                    
                            <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
                                <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                                    <Logo />
                                </div>
                                <HomeFilter />
                            </div>
                            <div className="col-md-9 rt-col">
                               
                                <div className="tab-top d-flex flex-wrap-wrap align-items-center ml-auto">
                                    {
                                         ((singleProfileDataResponse.is_subscribed == 0 && !singleProfileApiLoading) || IsSubscription==0) &&
                                        <div className={(singleProfileDataResponse.is_subscribed == 0  || IsSubscription==0)? "ml-auto mr-5" : "feature-menu "}>
                                            <UpgradeButton />
                                        </div>
                                    }

                                    <Toolbars />
                                </div>
                                <a href="javascript:void(0)" className="login-back-4 btn-back mb-4" onClick={() => history.goBack()}><i className="fas fa-chevron-left" /></a>

                                <div className="chat-box-wrapper">
              
                    <div className="messages-panel">
                        <div className="contacts-list col-md-12">
                            <h2 className="text-center mb-5">Chat</h2>
                            <div id="chat" className="contacts-outter-wrapper tab-pane">
                                <div className="contacts-outter">
                                    <ul className="nav contacts row">
                                        {chatList.map((data) => {
                                            return <li className="nav-item col-md-4 d-flex">
                                                <a className="nav-link contacts__blk" href="javascript:void(0)" data-toggle="tab" role="tab" onClick={() => handleClickChat(data.user_id)}>
                                                    {/* <a className="nav-link" href="javascript:void(0);" data-toggle="tab" data-id={item.user_id} role="tab" onClick={() => updateFriendDetails(item)}> */}
                                                    <div className="status-check position-relative">
                                                        <img alt="Mia" onError={(e) => addDefaultSrc(e)} className="img-circle medium-image" src={!!data.profile_image ? data.profile_image : returnDefaultImage()} />
                                                        <span class={data.online_status ? "circle-shape-offline circle-shape-online" : "circle-shape-offline"}></span>
                                                    </div>
                                                    <div className="contacts_info">
                      
                                                        <div className="user_detail">      
                                                            <h6 className="mb-0 name text-capitalize">{data.name}</h6>
                                                            {!!data.counts ? <div className="message-count"></div> : ""}
                                                        </div>
                                                        <div className="vcentered info-combo">
                                                            <p>{data.last_message}</p>
                                                            {!!data.created_at ? <p className="message-time text-right">{moment(data.created_at).calendar()}</p> : ""}
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>

                        </div>


                    </div>
           
            </div>

                            </div>
                       
                  
              
          
           

        </>
    )
}
export default ChatBox