import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearRazorPayResponse } from '../../../../modules/Profile/ProfileActions';
import { getPlanDetailApi, razorpayPaymentApi } from '../../../api/profileApiService';
import { getCookie } from '../../../utilities/functions';
import displayRazorpay from '../RazorpayForm/RazorpayForm';

function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}

const MoshVipModel = (props) => {
    const dispatch = useDispatch()
    const profileState = useSelector(state => state.ProfileReducer);
    const userDataState = useSelector(state => state.SingleProfileReducer);
    const { getPlanListApi: { PlanList, planInfo } } = profileState
    const { getSingleProfile: { singleProfileDataResponse, singleProfileApiLoading } } = userDataState
    const { razorpayApi: { razorpayStatus, razorpayError, razorpayLoading } } = profileState
    const { razorpayDetail: { order_id, amount, subscription_id ,plan_id} } = profileState

    const [id, setId] = useState("")
    const handleCreateOrder = (e, id) => {
        setId(id);
        let vipIds = document.querySelectorAll("#vipModalAdd");
        for (let i in vipIds) {
            if (isElement(vipIds[i])) {
                vipIds[i].classList.remove("vip-border");
            }

        }
        e.currentTarget.classList.add('vip-border')

        // dispatch(changeRazorPayDetail({ order_id: data.plan_id }))
    }
  
    const handleCountinue = () => {
        const bodyParameter = {
            session_id: localStorage.getItem("session_id"),
            plan_id: id
        }
        dispatch(razorpayPaymentApi(bodyParameter));
    }
    useEffect(() => {
        if (!razorpayError && !!razorpayStatus) {
            displayRazorpay(order_id, amount ,plan_id,dispatch);
            dispatch(clearRazorPayResponse());
        }
    }, [razorpayStatus])
    return (
        <Modal className="vip-modal" show={props.showModel} onHide={props.hideModel} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
            <div className="vip-modal__inner">
                <h4 className="theme-txt text-center mb-4 ">Get mosh Vip</h4>
                <div className="get_vip vip-grid">

                    {PlanList.map((data) =>
                        <div className="single-package" id="vipModalAdd" style={{ cursor: "pointer" }} onClick={(e) => { handleCreateOrder(e, data) }}>

                            <div>{data.title}</div>
                            <div>Save {data.discount} %</div>
                            <div> <img src="/webapp/images/rupeeImage.png" style={{ maxWidth: "10px" }} />{data.amount} </div>

                        </div>

                    )}

                </div>
                <div className="text-center my-4">
                <button className="btn bg-grd-clr" onClick={handleCountinue} disabled={!!razorpayLoading ? true : false}>{!!razorpayLoading ? "Processing" : "Continue"}</button>
                </div>
                <table border="1" cellPadding="10" cellSpacing="10" className="w-100">
                    <tr>
                        <th>FEATURES</th>
                        <th>SILVER PLAN</th>
                        <th>GOLD PLAN</th>
                    </tr>

                    {planInfo.map((data) => {
                        return <tr>
                            <td>{data.feature}</td>
                            <td>{data.silver_plan}</td>
                            <td>{data.gold_plan}</td>
                        </tr>
                    })}

                </table>

            </div>
            <a href="javascript:void(0)" className="modal-close" onClick={props.hideModel}><img src="/webapp/images/btn_close.png" /></a>
        </Modal>
    )
}
export default MoshVipModel