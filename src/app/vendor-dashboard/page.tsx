"use client";
import { NavBar } from "../components/NavBar";
import { useVendorAuth } from "../vendor-dashboard/hooks/useVendorAuth";
import { useVendorProducts } from "../vendor-dashboard/hooks/useVendorProducts";
import { ProductForm } from "../vendor-dashboard/components/ProductForm";

export default function VendorDashboard() {
    // 1. Logic Hook (Handles Identity & Redirects)
    const { vendor, isReady } = useVendorAuth();

    // 2. Data Hook (Handles Products) - only runs if vendor exists
    const { products, loading, addProduct, deleteProduct } = useVendorProducts(vendor?.id);

    // 3. Simple Guard: Prevents "Black Screen" while redirecting or loading cookie
    if (!isReady || !vendor) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
                Verifying vendor access...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-700">Vendor Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
                        <ProductForm
                            onSubmit={(data) => addProduct({
                                name: data.name,
                                description: data.description,
                                price: parseFloat(data.price),
                                stockQuantity: parseInt(data.stockQuantity),
                            })}
                            buttonText="List Product"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Inventory</h2>
                        {loading ? <p className="animate-pulse">Fetching inventory...</p> : (
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-100 text-gray-600 text-sm">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Stock</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y text-gray-700">
                                        {Array.isArray(products) && products.length > 0 ? (
                                            products.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50 transition">
                                                    <td className="p-4 font-medium">{p.name}</td>
                                                    <td className="p-4">${p.price}</td>
                                                    <td className="p-4">{p.stockQuantity}</td>
                                                    <td className="p-4 text-right space-x-3">
                                                        <button className="text-blue-600 hover:underline">Edit</button>
                                                        <button
                                                            onClick={() => deleteProduct(p.id!)}
                                                            className="text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-gray-400">
                                                    No products found. Start listing items to see them here.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}