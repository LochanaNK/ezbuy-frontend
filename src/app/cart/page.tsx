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

    const { cartItems, loading, removeItem, cartTotal, updateQuantity } = useCart(userId);

    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-700">Your Shopping Cart</h1>

                {loading ? (
                    <p>Loading cart...</p>
                ) : cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty. Go buy something!</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-700">{item.productName}</h3>
                                    <p className="text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2.5 py-1 bg-red-300 rounded hover:bg-red-500 text-red-700"
                                    >-</button>

                                    <span className="font-medium text-gray-700">{item.quantity}</span>

                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-green-300 rounded hover:bg-green-500 text-green-700"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="border-t pt-4 mt-8 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-700">Total:</span>
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