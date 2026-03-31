"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Product } from "../types/productType";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await apiFetch("/products");
      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error};
};
