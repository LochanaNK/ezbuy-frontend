"use client";

import { useRegister } from "../hooks/useRegister";
import Link from "next/link";

export const RegisterForm = () => {
    const { formData, error, loading, handleInputChange, handleSubmit } = useRegister();
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-2 rounded">{error}</p>}

            <input
                name="username"
                type="text" placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.username}
                onChange={handleInputChange}
                required
            />
            <input
                name="email"
                type="email" placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <input
                name="password"
                type="password" placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleInputChange}
                required
            />

            <select
                name="roleId"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.roleId}
                onChange={handleInputChange}
            >
                <option value="3">Customer</option>
                <option value="2">Vendor</option>
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
            >
                {loading ? "Creating Account..." : "Register"}
            </button>
        </form>
    )
}