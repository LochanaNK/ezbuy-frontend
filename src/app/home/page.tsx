"use client";

import { useProduct } from "./hooks/useProduct";
import { ProductCard } from "./components/ProductCard";
import { NavBar } from "../components/NavBar";



export default function HomePage() {
    const { products, loading, error } = useProduct();
    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />

            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">Featured Products</h1>

                {loading && <p className="text-center text-gray-500">Loading amazing deals...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    )
}