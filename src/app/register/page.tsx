import { RegisterForm } from "./components/RegisterForm";
import Link from "next/link";

export default function registerPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create EzBuy Account</h2>

                <RegisterForm />

                <p className="mt-8 text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-bold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}