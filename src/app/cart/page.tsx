"use client";
import { useCart } from "./hooks/useCart";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [userId, setUserId] = useState<number>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("ezbuy_user") || "{}");
        setUserId(user?.id);
    }, []);

    const { cartItems, loading, removeItem, cartTotal } = useCart(userId);

    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

                {loading ? (
                    <p>Loading cart...</p>
                ) : cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty. Go buy something!</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{item.productName}</h3>
                                    <p className="text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="border-t pt-4 mt-8 flex justify-between items-center">
                            <span className="text-xl font-bold">Total:</span>
                            <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}