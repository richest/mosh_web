import React, { useEffect, useMemo, useState } from 'react';
import GlitterCard from "react-tinder-card";
import $, { post } from 'jquery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addDefaultSrc, getCookie, returnDefaultImage } from '../../../library/utilities/functions';
import { getFilterDataApi } from '../../../library/api/HomeApiService';
import { changeFilterInputs, changeFilterList, clearFilterListAfterResponse } from '../HomeActions';
import { addRemoveFavouriteDataApi, checkMessageLimit } from '../../../library/api/SingleProfileApiService';
import { clearAddRemoveResponse, clearLikeLimitReach, clearMessageLimitResonse } from '../../SingleProfile/SingleProfileAction';
import { MoshVipModel, ShowVipNModel } from '../../../library/common/components';

const alreadyRemoved = [];
let isMouseClick = false, startingPos = [], glitterUid, childRefs = [], cDetails = null, showMeVip = false, timeoutId = 0;;

const HomeCard = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [cardClick, setCardClick] = useState(false);
  const [showVipModel, setShowVip] = useState(false);
  const [userId, setUserId] = useState("")
  const FilterState = useSelector(state => state.Homereducer);
  const userDataState = useSelector(state => state.SingleProfileReducer);

  const ListState = useSelector(state => state.Homereducer);
  const { filterApi: { getFilterResonse, getFilterApiSucess, getFilterApiStatus, getFilterApiLoading }, filterList } = ListState

  const { filterInputInfo: { page, age, distance, relationshipStatus, lookingFor, interests } } = FilterState;
  const { addRemoveFavourite: { addRemoveFavouriteStatus } } = userDataState
  const { checkMessageLimitApi: { checkMessageLimitSuccess, checkMessageLimitLimitReach } } = userDataState
  const { LikesLimitReach } = userDataState
  const [currentCardDetails, setCurrentCardDetails] = useState(null);
  console.log(FilterState, "FilterList..")
  console.log(page, "page...")
  // const [cardStartPosition, setStartPosition] = useState([])


  console.log(getFilterApiSucess, "getFilterApiSucess, getFilterApiStatus")
  useEffect(() => {
    if (!!checkMessageLimitSuccess) {
      if (!!checkMessageLimitLimitReach) {
        showMeVip = true;
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


  // useEffect(() => {
  //   if(!!currentCardDetails && currentCardDetails != "over" && !getFilterApiLoading) {
  //     alert("trans yes")
  //   }
  // }, [currentCardDetails, getFilterApiLoading])
  useEffect(() => {
    if (!!getFilterApiStatus) {
      dispatch(clearFilterListAfterResponse())
      if (!showMeVip) {
        const new_index = (FilterState.filterList).length - 1;
        console.log(FilterState.filterList[new_index], "test.....")
        cDetails = !!FilterState.filterList[new_index] ? FilterState.filterList[new_index] : "over";
        setCurrentCardDetails(!!FilterState.filterList[new_index] ? FilterState.filterList[new_index] : "over")
      }
    }
  }, [getFilterApiSucess])

  // useEffect(() => {
  //   if (currentCardDetails) {
  //     console.log(currentCardDetails, "currentCardDetails...")
  //     const currentCardId = currentCardDetails.user_id;
  //     const currentCardElm = document.getElementById(currentCardId).childNodes[0];
  //     currentCardElm.style.transition = 1;
  //     currentCardElm.style.transform = 1;
  //   }
  // }, [currentCardDetails])

  useEffect(() => {
  $(document).mousemove(function(){
    if($(".main_wrapper:hover").length != 0){
      console.log(cDetails, "sdgfg")
      if (!!cDetails && document.getElementById(cDetails.user_id)) {
        console.log(document.getElementById(cDetails.user_id), "sgdcfhdgh") 
        document.getElementById(cDetails.user_id).childNodes[0].style.setProperty('transition', 'none', 'important');
        document.getElementById(cDetails.user_id).childNodes[0].style.setProperty('transform', 'none', 'important');
      }
      // const allSwipes = document.querySelectorAll(".main_wrapper");
      // for (let i in allSwipes) {
      //   if (!!allSwipes[i].style) {
      //     allSwipes[i].childNodes[0].style.setProperty('transition', 'none', 'important');
      //     allSwipes[i].childNodes[0].style.setProperty('transform', 'none', 'important');
      //   }
      // }
  } else{
    // const allSwipes = document.querySelectorAll(".main_wrapper");
    // for (let i in allSwipes) {
    //   if (!!allSwipes[i].style) {
    //     allSwipes[i].childNodes[0].style.setProperty('transition', 'auto', 'important');
    //     allSwipes[i].childNodes[0].style.setProperty('transform', 'auto', 'important');
    //   }
    // }
  }
  });
  }, [])
  useEffect(() => {
    if (!!addRemoveFavouriteStatus) {
      dispatch(clearAddRemoveResponse());
    }
  }, [addRemoveFavouriteStatus])

  console.log(currentCardDetails, "currentCardDetails")
  const swiped = (direction, userId) => {
    if (direction == "left") {
      const cardsLeft = FilterState.filterList.filter(
        (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
      );
      console.log(cardsLeft, "cardsLeft...")
      if (cardsLeft.length == 1) {
        dispatch(changeFilterInputs({ page: page + 1 }));
        // alert(cardsLeft.length)
      }
      alreadyRemoved.push(userId);
    } else if (direction == "right") {
      if (LikesLimitReach != "0") {
        showMeVip = true;
        setShowVip(true)
        window.setTimeout(() => {
          document.getElementById("vipModalAdd").click();
      }, 0)
      }
      const bodyParameter = {
        fav_user_id: userId,
        session_id: localStorage.getItem("session_id"),
        add: 1
      }
      dispatch(addRemoveFavouriteDataApi(bodyParameter))
      const cardsLeft = FilterState.filterList.filter(
        (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
      );
      console.log(cardsLeft, "cardsLeft...")
      if (cardsLeft.length == 1) {
        dispatch(changeFilterInputs({ page: page + 1 }));
        // alert(cardsLeft.length)
      }




      alreadyRemoved.push(userId);
    }

    const cardsLeft = FilterState.filterList.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );

    //  if (cardsLeft.length) {
    //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
    //     const index = FilterState.filterList
    //       .map((person) => person.user_id)
    //       .indexOf(toBeRemoved); // Find the index of which to make the reference to
    //     if (!!childRefs && childRefs[index] && !!childRefs[index].current) {
    //       if (LikesLimitReach  !="0" ) {
    //         showMeVip = true;
    //         setShowVip(true) 
    //        }
    //        else{
    //         // childRefs[index].current.swipe(direction);
    //        }

    //       } 
    //     if (!showMeVip) {
    //       const new_index = index - 1;
    //       console.log(FilterState.filterList[new_index], "test")
    //       setCurrentCardDetails(!!FilterState.filterList[new_index] ? FilterState.filterList[new_index] : "over")
    //     }
    //   }
  };

  childRefs = FilterState.filterList
  const swipe = (direction) => {
    const cardsLeft = FilterState.filterList.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );
    console.log(cardsLeft, "cardsLeft...")
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
      const index = FilterState.filterList
        .map((person) => person.user_id)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      if (!!childRefs && childRefs[index] && !!childRefs[index].current) {
        if (LikesLimitReach != "0") {
          showMeVip = true;
          setShowVip(true)
          window.setTimeout(() => {
            document.getElementById("vipModalAdd").click();
        }, 0)
        }
        else {
          childRefs[index].current.swipe(direction);
        }
      } else {
      }
      if (!showMeVip) {
        const new_index = index - 1;
        console.log(FilterState.filterList[new_index], "test;;;;;;")
        cDetails = !!FilterState.filterList[new_index] ? FilterState.filterList[new_index] : "over";
        setCurrentCardDetails(!!FilterState.filterList[new_index] ? FilterState.filterList[new_index] : "over")
      }
    }
    if (cardsLeft.length == 1) {
      dispatch(changeFilterInputs({ page: page + 1 }));
      // alert(cardsLeft.length)
    }

  };

  const handleInitialFilter = () => {
    const bodyparameter = {
      session_id: localStorage.getItem("session_id"),
      page: page,
      limit: "",
      agefrom: "",
      ageto: "",
      lookingfor: "",
      relationship_status: "",
      interest: "",
      radius: "",
      is_online: ""
    }
    dispatch(getFilterDataApi(bodyparameter))
  }
  useEffect(() => {
    if (page !== null && page !== undefined) {
      handleInitialFilter();
      // setShowVip(true) 
    }
  }, [page])

  useEffect(() => {
    window.setTimeout(() => {
      $(".main_wrapper")
        .mousedown(function (evt) {
          isMouseClick = true;
          glitterUid = $(".main_wrapper")
          // setCardClick(isMouseClick)
          startingPos = [evt.pageX, evt.pageY]
          glitterUid = evt.currentTarget.id
          // setStartPosition(startingPos);
        })
        .mousemove(function (evt) {
          if (!(evt.pageX === startingPos[0] && evt.pageY === startingPos[1])) {
            isMouseClick = false;
          }
        })
        .mouseup(function () {
          if (!isMouseClick) {
            setCardClick(isMouseClick)
          } else {
            isMouseClick = true
            setCardClick(isMouseClick)
          }
          startingPos = [];
          // setStartPosition(startingPos)
        });
    }, 1000);
    return () => {
      dispatch(clearLikeLimitReach())
    }
  }, []);

  // useEffect(() => {
  //   if (!!cardClick) {
  //     if (!!glitterUid) {
  //       history.push(`/single-profile/${glitterUid}`)
  //     }
  //   }
  // }, [cardClick])

  const handleMessage = () => {
    const cardsLeft = FilterState.filterList.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
      const index = FilterState.filterList
        .map((person) => person.user_id)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      if (!!childRefs && childRefs[index]) {
        console.log(childRefs[index].user_id, "creent card")
        setUserId(childRefs[index].user_id)
        const bodyParameter = {
          session_id: localStorage.getItem("session_id"),
          user_id: childRefs[index].user_id
        }
        dispatch(checkMessageLimit(bodyParameter))
        //  history.push(`/message-box/${childRefs[index].user_id}`)
      } else {
      }
    }
  }
  const handleBackSwipe = () => {
    const cardsLeft = FilterState.filterList.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );
    // if (cardsLeft.length) {
    //   if (!!childRefs) {
    //     console.log(alreadyRemoved, "alreadyRemoved")
    //    for (let i in FilterState.filterList){
    //      if(FilterState.filterList[i].user_id ==alreadyRemoved[alreadyRemoved.length - 1]){
    //       console.log(FilterState.filterList[i] ,"alreadyRemoved...");
    //       console.log(alreadyRemoved[alreadyRemoved.length - 1], "alreadyRemoved")
    //       // dispatch(changeFilterList({filterList : [FilterState.filterList[i] ,...FilterState.filterList]}))


    //     }
    //    }

    //   } else {
    //   }
    // }
  }
  const hideVipModel = () => {
    showMeVip = false;
    setShowVip(false)
  }
  console.log(LikesLimitReach, "LikesLimitReach..")
  return (
    <div>
      <div className="stage">
        <div className='cardContainer'>
          {FilterState.filterList.map((currentUser, index) =>
            <>
              <div className="main_wrapper" id={currentUser.user_id} >
                <GlitterCard
                  ref={childRefs[index]}
                  // preventSwipe={LikesLimitReach != "0"?(['right','up','down']):""}
                  // flickOnSwipe={true}
                  preventSwipe={['right', 'left', 'up', 'down']}
                  className="swipe"
                  id="swipe"
                  key={currentUser.user_id}
                // onSwipe={(dir) => swiped(dir, currentUser.user_id)}
                >
                  <div className="user__card position-relative">
                    <img onError={(e) => addDefaultSrc(e)} src={!!currentUser.profile_image ? currentUser.profile_image : returnDefaultImage()} alt="alt" width="100%" />
                    <div className="card-titles">
                      {/* <h3>
                        {currentUser.name} {currentUser.age}
                        {currentUser.signup_with == 0 ? <i class="fas fa-envelope"></i>
                          : currentUser.signup_with == 1 ? <i class="fab fa-facebook-f"></i>
                          : currentUser.signup_with == 2 ? <i class="fas fa-mobile-android-alt"></i>
                          : currentUser.signup_with == 3 ? <i class="fab fa-google"></i>
                          : ""}
                      </h3> */}

                      {/* <span>
                        {currentUser.education} {currentUser.profession}

                      </span> */}

                    </div>
                  </div>
                </GlitterCard>

              </div>
            </>
          )}

        </div>
        {
          (!!currentCardDetails && currentCardDetails != "over" && !getFilterApiLoading) &&
          <div className="users-data my-4 text-center">
            <h5>
            {currentCardDetails.name}, {!! currentCardDetails.age ? currentCardDetails.age + ", " : ""}
              {currentCardDetails.signup_with == 0 ? <i class="fas fa-envelope"></i>
                : currentCardDetails.signup_with == 1 ? <i class="fab fa-facebook-f"></i>
                  : currentCardDetails.signup_with == 2 ? <i class="fas fa-mobile-alt"></i>
                    : currentCardDetails.signup_with == 3 ? <i class="fab fa-google"></i>
                      : ""}
            </h5>

            {
              !!currentCardDetails.profession &&
              <span className="d-block">Working as {currentCardDetails.profession}</span>
            }
            {
              !!currentCardDetails.education &&
              <span>Studied {currentCardDetails.education}</span>
            }
            <a href="javascript:void(0)" onClick={() => history.push(`/single-profile/${currentCardDetails.user_id}`)}> View More</a>
          </div>
        }
        {/* 
        {
          !currentCardDetails && !!FilterState.filterList && (FilterState.filterList).length > 0 &&
          <div className="users-data my-4 text-center">
            <h5>{FilterState.filterList[0].name}, {FilterState.filterList[0].age}, {FilterState.filterList[0].location}</h5>
            {
              !!FilterState.filterList[0].profession &&
                <span className="d-block">Working as {FilterState.filterList[0].profession}</span>
            }
            {
              !!FilterState.filterList[0].education &&
                <span>Studied {FilterState.filterList[0].education}</span>
            }
          </div>
        } */}
        {
          !getFilterApiLoading &&


          <div className="action-tray global-actions d-flex flex-wrap justify-content-between align-items-center mt-3">
            {/* <div className="chat_page">
            <a href="javascript:void(0)" onClick={handleBackSwipe}>
              <img src="images/ImageBack.png" />
            </a>
          </div> */}
            <div className="close-btn tray-btn-s">
              <a className="left-action text-white hover-link" href="javascript:void(0)" onClick={() => swipe("left")}>
                <i class="fas fa-times mr-3 circle-icon"></i>
                <span className="action-text">SKIP</span>
              </a>
            </div>
            <div className="chat_page send-msg">
              <a href="javascript:void(0)" onClick={handleMessage} className="btn text-white text-uppercase btn-lg">
                <i class="far fa-comment-alt align-middle"></i>   <span className="action-text">send message</span>
              </a>
            </div>
            <div className="like-profile tray-btn-s">
              <a className="right-action text-white hover-link" href="javascript:void(0)" onClick={() => swipe("right")}>
                <i class="fas fa-check mr-3 circle-icon"></i>  <span className="action-text">LIKE</span>
              </a>
            </div>

          </div>
        }
      </div>
      <MoshVipModel showModel={showVipModel}
        hideModel={hideVipModel}
      />
    </div>

  )
}
export default HomeCard