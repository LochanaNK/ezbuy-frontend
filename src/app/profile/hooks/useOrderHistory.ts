"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

export const useOrderHistory = (userId: number | undefined) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchOrders = async () => {
    if (!userId) return;
    try {
      const data = await apiFetch(`/order/profile/${userId}`);
      setOrders(data);
    } catch (err: any) {
      console.error("Order history error:", err);
      toast.error("Could not load order history.");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      await apiFetch(`/order/cancel/${orderId}`, {
        method: "POST",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel the order.");
    }
  };

  const filteredOrders = activeFilter === "All" ? orders : orders.filter(order => order.status === activeFilter);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return { orders, loading, cancelOrder, refreshOrders: fetchOrders , filteredOrders, activeFilter, setActiveFilter };
};
