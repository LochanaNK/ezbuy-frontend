"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]:value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await apiFetch("/user/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      console.log("Login successful, user data:", user);
      localStorage.setItem("ezbuy_user", JSON.stringify(user));
      
      const redirectPath = user?.role === 'Vendor' ? "/vendor-dashboard" : "/home";
      console.log("Redirecting to:", redirectPath);
      
      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return{
    formData,
    error,
    loading,
    handleInputChange,
    handleSubmit,
  };
};
