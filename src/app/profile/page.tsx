"use client";

import { NavBar } from "../components/NavBar";
import { useProfile } from "./hooks/useProfile";

export default function ProfilePage() {
    const { user } = useProfile();

    if (!user) {
        return <p className="text-center mt-20">Please log in to view your profile.</p>
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                        {user?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <h1 className="text-2xl font-bold">{user.username}</h1>
                    <p className="text-gray-500">{user.email}</p>

                    <div className="mt-8 w-full border-t pt-6 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Name:</span>
                            <span className="font-medium text-gray-700">
                                {user.userName}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email:</span>
                            <span className="font-medium text-gray-700">
                                {user.email}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Account Type:</span>
                            <span className="font-medium text-gray-700">
                                {user.role === "Vendor" ? "Vendor" : "Customer"}
                            </span>
                        </div>
                    </div>

                    <button className="mt-10 w-full border border-gray-300 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white hover:text-white">
                        Edit Profile Settings
                    </button>
                </div>
            </div>
        </main>
    )
}