import { LoginForm } from "./components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to your EzBuy account</p>

        <LoginForm />

        <p className="mt-8 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}