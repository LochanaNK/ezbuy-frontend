"use client";

import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({orderId}: {orderId: number}){
    const {handleSubmit, isProcessing} = useCheckoutForm(orderId);
    const stripe = useStripe();
    const elements = useElements();

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe || !elements}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}