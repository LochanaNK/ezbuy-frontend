"use client";

import { useCheckout } from "./hooks/useCheckout";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

export default function CheckoutPage(){
    const {clientSecret, orderId, stripePromise} = useCheckout();

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl text-slate-800 font-bold mb-6">Complete Payment</h2>
            
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm orderId={Number(orderId)} />
                </Elements>
            ) : (
                <p className="text-center text-slate-600">Loading payment secure session...</p>
            )}
        </div>
    );
}