"use client";

import { NavBar } from "../components/NavBar";
import { useOrderHistory } from "./hooks/useOrderHistory";
import { useProfile } from "./hooks/useProfile";

export default function ProfilePage() {
    const { user } = useProfile();
    const { orders, loading } = useOrderHistory(user?.id);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <NavBar />
            
            <div className="max-w-2xl mx-auto px-4">
                
                {/* Profile Card */}
                <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                            {user?.userName?.[0]?.toUpperCase() || "?"}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-700">{user.userName}</h1>
                        <p className="text-blue-500">{user.email}</p>

                        <div className="mt-8 w-full border-t pt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Full Name:</span>
                                <span className="font-medium text-gray-700">{user.userName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email:</span>
                                <span className="font-medium text-gray-700">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Account Type:</span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                                    {user.role === "Vendor" ? "Vendor" : "Customer"}
                                </span>
                            </div>
                        </div>

                        <button className="mt-10 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition text-white font-semibold">
                            Edit Profile Settings
                        </button>
                    </div>
                </div>

                {/* Order History Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            {[1, 2].map((n) => (
                                <div key={n} className="h-32 bg-gray-200 rounded-xl"></div>
                            ))}
                        </div>
                    ) : orders && orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white border rounded-xl overflow-hidden shadow-sm transition hover:shadow-md">
                                    {/* Order Header */}
                                    <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Order Placed</p>
                                            <p className="font-medium text-gray-800">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-bold">Total Amount</p>
                                            <p className="font-bold text-blue-600">${(order.totalAmount || 0).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-4 space-y-4">
                                        {order.items?.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <div className="flex gap-4 items-center">
                                                    <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded text-gray-700 font-bold">
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-gray-800 font-medium">{item.productName || 'Unknown Product'}</span>
                                                </div>
                                                <span className="text-gray-500">${(item.unitPrice || 0).toFixed(2)} each</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
                                        Status: {order.status || 'Processing'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-white text-gray-400">
                            <p className="text-2xl mb-2">📦</p>
                            <p>You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}