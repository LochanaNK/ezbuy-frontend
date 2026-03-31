"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { CartItem } from "../types/cartType";
import { useRouter } from "next/navigation";

export const useCart = (userId: number | undefined) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await apiFetch(`/cart/${userId}`);
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart: ", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!userId) {
      alert("Please log in to add items to yout cart");
      router.push("/login");
      return;
    }
    try {
      await apiFetch("/cart", {
        method: "POST",
        body: JSON.stringify({ userId, productId, quantity }),
      });
      alert("Item added to cart");
      await fetchCart();
    } catch (error: any) {
      alert(error.message);
    }
  };


  const removeItem = async (productId: number) => {
    try {
      await apiFetch(`/cart/${userId}/${productId}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      alert("Could not remove the item");
    }
  };

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      return;
    }
    try {
      await apiFetch(`/cart/${cartItemId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (error) {
      console.error("update failed: ", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return {
    cartItems,
    loading,
    removeItem,
    cartTotal,
    updateQuantity,
    addToCart,
  };
};
