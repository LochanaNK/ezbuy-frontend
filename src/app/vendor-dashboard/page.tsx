"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "../components/NavBar";
import { useVendorProducts } from "../vendor-dashboard/hooks/useVendorProducts";
import { ProductForm } from "../vendor-dashboard/components/ProductForm";

export default function VendorDashboard() {
    const [vendor, setVendor] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("ezbuy_user") || "null");
            setVendor(user);
    }, [router]);

    const { products, loading, addProduct, deleteProduct } = useVendorProducts(vendor?.id);

    if (!vendor) return null;

    return (
        <main className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-700">Vendor Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section: Add New Product */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
                        <ProductForm
                            onSubmit={(data) => addProduct({
                                name: data.name,
                                description: data.description,
                                price: parseFloat(data.price),
                                stockQuantity: parseInt(data.stockQuantity),
                                vendorId: vendor.id
                            })}
                            buttonText="List Product"
                        />
                    </div>

                    {/* Section: Product List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Inventory</h2>
                        {loading ? <p>Loading inventory...</p> : (
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
                                        {products.map((p) => (
                                            <tr key={p.id}>
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
                                        ))}
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