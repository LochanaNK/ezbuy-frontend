"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const NavBar = () => {
    const [user, setUser] = useState<{ userName: string; role?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = Cookies.get("ezbuy_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("ezbuy_user");
        localStorage.removeItem("ezbuy_token");
        setUser(null);
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/home" className="text-2xl font-bold text-blue-600">
                    EzBuy
                </Link>

                <div className="flex items-center gap-6">
                    {user?.role === "Vendor" && (
                        <Link href="/vendor-dashboard" className="text-gray-700 hover:text-blue-600 font-semibold">
                            Vendor Dashboard
                        </Link>
                    )}
                    {user?.role === "Customer" && (
                        <div className="flex items-center gap-4">
                            <Link href="/home" className="text-gray-700 hover:text-blue-600 font-semibold text-decoration-line">Home</Link>
                            <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-semibold text-decoration-line">Cart</Link>
                        </div>

                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Hi, <Link href="/profile" className="font-semibold text-blue-600">
                                {user.userName}
                            </Link></span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}