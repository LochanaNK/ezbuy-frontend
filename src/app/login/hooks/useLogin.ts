"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // console.log("Login successful:", response);
      toast.success("Login successfully!")

      localStorage.setItem("ezbuy_token", response.token);

      Cookies.set("ezbuy_user", JSON.stringify(response.user), { expires: 7 });

      const isVendor = response.user.role === "Vendor" || response.user.roleId === 2;
      
      const redirectPath = isVendor ? "/vendor-dashboard" : "/home";
      
      router.push(redirectPath);
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleInputChange,
    handleSubmit,
  };
};