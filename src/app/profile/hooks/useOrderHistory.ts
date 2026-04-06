"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

export const useOrderHistory = (userId: number | undefined) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const data = await apiFetch(`/profile/${userId}`);
        setOrders(data);
      } catch (err: any) {
        console.error("Order history error:", err);
        toast.error("Could not load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return {orders, loading};
};
