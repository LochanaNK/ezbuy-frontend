"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const NavBar = () => {
  const [user, setUser] = useState<{ userName: string; role?: string } | null>(
    null,
  );
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
        <Link href="/home" className="text-2xl font-bold text-slate-600">
          EzBuy
        </Link>

        {/* Center Navigation */}
        {user?.role === "Customer" && (
          <div className="flex-1 flex items-center justify-center gap-6">
            <Link
              href="/home"
              className="text-gray-700 hover:text-mauve-800 hover:font-semibold p-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
          after:bg-mauve-800 after:transition-all after:duration-300 
          hover:after:w-full relative"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-mauve-800 hover:font-semibold p-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
          after:bg-slate-600 after:transition-all after:duration-300 
          hover:after:w-full relative"
            >
              Cart
            </Link>
            <Link
              href="/feedback"
              className="text-gray-700 hover:text-mauve-800 hover:font-semibold p-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
          after:bg-slate-600 after:transition-all after:duration-300 
          hover:after:w-full relative"
            >
              Feedback
            </Link>
          </div>
        )}

        {/* Vendor Dashboard - Center placeholder */}
        {user?.role === "Vendor" && <div className="flex-1"></div>}

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Hi,{" "}
              <Link
                href="/profile"
                className="font-semibold text-mauve-800 hover:font-semibold p-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
          after:bg-mauve-800 after:transition-all after:duration-300 
          hover:after:w-full relative"
              >
                {user.userName}
              </Link>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition "
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
