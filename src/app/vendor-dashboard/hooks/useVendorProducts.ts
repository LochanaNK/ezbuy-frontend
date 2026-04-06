import { Products } from "../types/Product";
import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export const useVendorProducts = (vendorId: number | undefined) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorProducts = useCallback(async () => {
    if (!vendorId) return;

    setLoading(true);
    try {
      const data = await apiFetch(`/products/vendor/${vendorId}`);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  const addProduct = async (newProduct: Omit<Products, "id" | "vendorId">) => {
    try {
      await apiFetch("/products", {
        method: "POST",
        
        body: JSON.stringify({ ...newProduct, vendorId }),
      });
      await fetchVendorProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await apiFetch(`/products/${productId}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const updateProduct = async (id: number, product: Partial<Products>) => {
    await apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
    fetchVendorProducts();
  };

  useEffect(() => {
    fetchVendorProducts();
  }, [fetchVendorProducts]);

  return {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    refresh: fetchVendorProducts,
  };
};
