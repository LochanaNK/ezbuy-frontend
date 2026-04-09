"use client";

import { apiFetch } from "@/lib/api";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCheckoutForm = (orderId:number) =>{

    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleSubmit = async (event: React.FormEvent)=>{
        event.preventDefault();
        if(!stripe || !elements || isProcessing || isConfirmed){
            return;
        }

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        if(error){
            toast.error(error.message || "Payment failed. Please try again.");
        }else if(paymentIntent && paymentIntent.status === "succeeded"){
            if (isConfirmed) return;
            try {
                await apiFetch(`/order/confirm/${orderId}`, { method: "POST" });
                setIsConfirmed(true);
                toast.success("Payment Successful!");
                window.location.href = "/profile";
            } catch (err) {
                toast.error("Payment succeeded but server update failed.");
            }
        }
        setIsProcessing(false);
    }

    return {handleSubmit, isProcessing};
}