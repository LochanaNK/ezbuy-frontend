"use client";

import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
    const { formData, error, loading, handleInputChange, handleSubmit } = useLogin();

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                    name="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    name="password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}