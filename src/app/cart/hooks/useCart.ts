"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { CartItem } from "../types/cartType";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export const useCart = (userId: number | undefined) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await apiFetch(`/cart/${userId}`);
      setCartItems(data);
      console.log(data);
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
      toast.success("Item added");
      await fetchCart();
    } catch (error: any) {
      toast.error(error.message || "Failed to add item");
    }
  };


  const removeItem = async (productId: number) => {
    try {
      await apiFetch(`/cart/${userId}/${productId}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      toast.success("Item removed");
    } catch (error) {
      toast.error("Could not remove the item");
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
      fetchCart();
    } catch (error) {
      console.error("update failed: ", error);
    }
  };

  const placeOrder = async (userId: number) =>{
    try{
      const result = await apiFetch(`/orders/checkout/${userId}`,{method:"POST"});
      toast.success(result.message);
      router.push("/profile");
    }catch(error:any){
      toast.error("Checkout failed: ",error.message);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  return {
    cartItems,
    loading,
    removeItem,
    cartTotal,
    updateQuantity,
    addToCart,
    placeOrder
  };
};
