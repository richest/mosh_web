import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPlanDetailApi, razorpayPaymentApi } from '../../../library/api/profileApiService'
import { getCookie } from '../../../library/utilities/functions'
import { changeRazorPayDetail, clearRazorPayResponse } from '../ProfileActions'
import displayRazorpay from '../../../library/common/components/RazorpayForm/RazorpayForm';

const MembershipPlans = ({ PlanList, Modal, singleProfileDataResponse, profileState }) => {
    const dispatch = useDispatch();
    const { razorpayDetail: { order_id, amount, subscription_id ,plan_id } } = profileState
    const { razorpayApi: { razorpayStatus, razorpayError } } = profileState
   
    const handleOrder = (data) => {
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            plan_id: data.id
        }
        dispatch(razorpayPaymentApi(bodyParameter));
        dispatch(changeRazorPayDetail({ plan_id: data.id}))
        // setShowPaymentForm(true)
    }
    useEffect(() => {
        if (!razorpayError && !!razorpayStatus) {
            displayRazorpay(order_id, amount,plan_id,dispatch);
            dispatch(clearRazorPayResponse());
        }
    }, [razorpayStatus])

    return (
        <>
            <div className="col-md-4">
                <div className="membership-plans">
                    {/* <h5 className="text-white text-uppercase"><img src="/webapp/images/Crown-white.png" alt="crown" /> Become vip</h5> */}
                    {PlanList.map((data) => (
                        (data.is_selected === 1) ?
                            <div className="membership-plans__block active mt-4">
                                <a href="javascript:void(0)" onClick={() => handleOrder(data)}>
                                    <span className="membership-discount">save {data.discount} %</span>
                                    <h5 className="text-white text-uppercase mb-0">{data.title}</h5>
                                    <div className="membership-plans__price">
                                        <span>INR {data.amount}</span>
                                    </div>
                                </a>
                            </div> :

                            <div className="membership-plans__block mt-4">
                                <a href="javascript:void(0)" onClick={() => handleOrder(data)}>
                                    <span className="membership-discount">save {data.discount} %</span>
                                    <h5 className="text-uppercase mb-0">{data.title}</h5>
                                    <div className="membership-plans__price">
                                        <span>INR {data.amount}</span>
                                    </div>
                                </a>
                            </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MembershipPlans