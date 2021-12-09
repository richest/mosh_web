import React from 'react'
import { useSelector } from "react-redux";
import Razorpay from 'razorpay';
import { getCookie } from '../../../utilities/functions';
import { storeRazorpayPaymentApi } from '../../../api/profileApiService';

export default function displayRazorpay(order_id , amount ,plan_id,dispatch) {
   const profileData = !!getCookie("profile") ? JSON.parse(getCookie("profile")) : null;
   console.log(order_id,plan_id ,"plan_id...")
    const options = {
        key_id: 'rzp_live_0fnqxFUKxrXNaU', 
        // subscription_id: subscription_id,
        amount: amount,
        currency: "INR",
        name: profileData.first_name,
        description: "Credits towards Mosh",
        image: "https://moshmatch.com/razorpaylogo.png",
        order_id: order_id,
        handler: async function (response) {
            console.log(response, "response razorpay...")
            const data = {
                session_id:localStorage.getItem("session_id"),
                plan_id:plan_id,
                // orderCreationId: "plan_HVyFckXa3MqAuT",
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            };

            dispatch(storeRazorpayPaymentApi(data))
        },
        prefill: {
            name:  profileData.first_name,
            email: "",
            contact: "",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#F4C862",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}