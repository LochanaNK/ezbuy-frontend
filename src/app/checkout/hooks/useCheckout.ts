"use client";
import { apiFetch } from "@/lib/api";
import {useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export const useCheckout = () =>{
    const searchParams = useSearchParams();
    const [clientSecret, setClientSecret] = useState("");
    const orderId = searchParams.get("orderId");

    useEffect(()=>{
        if(!orderId)return;

        const getSecret = async ()=>{
            try{
                const response = await apiFetch(`/order/payment-intent/${orderId}`,{
                    method: "POST",
                });
                setClientSecret(response.clientSecret);
            }catch(error){
                console.error("Error fetching client secret: ",error);
            }
        };
        getSecret();
    }, [orderId]);

    return {clientSecret, orderId, stripePromise};
}