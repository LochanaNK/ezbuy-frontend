"use client";
import Link from "next/link";
import {useState, useEffect} from "react";
import {apiFetch} from "@/lib/api";
import {CartItem} from "../types/cartType";

export const useCart = (userId: number | undefined) =>{
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () =>{
        if(!userId) return;
        try{
            const data = await apiFetch(`/cart/${userId}`);
            setCartItems(data);
        }catch(error){
            console.error("Failed to fetch cart: ", error);
        }finally{
            setLoading(false);
        }
    }
    const removeItem = async (cartItemId:number)=>{
        try{
            await apiFetch(`/cart/${cartItemId}`,{method:'DELETE'});
            setCartItems((prev)=>prev.filter(item=>item.id !== cartItemId));
        }catch(error){
            alert("Could not remove the item");
        }
    };

    useEffect(()=>{
        fetchCart();
    },[userId]);

    const cartTotal = cartItems.reduce((total,item)=> total + item.price * item.quantity, 0);
    return {cartItems, loading, removeItem, cartTotal};
}

