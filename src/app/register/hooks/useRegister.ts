"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

export const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: 3,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roleId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/user/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
      toast.error("Registration failed. Please try again.");
    }finally{
        setLoading(false);
    }
  };

  return{
    formData,
    error,
    loading,
    handleInputChange,
    handleSubmit,
  }
};
