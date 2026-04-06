"use client";
import { useState } from "react";
import { ProductProps } from "../types/ProductProps";
import { ProductFormData } from "../types/Product";


export const ProductForm = ({ initialData, onSubmit, buttonText }: ProductProps) => {
    const [form, setForm] = useState<ProductFormData>(
        initialData || { name: "", description: "", price: "", stockQuantity: "" }
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };
    return (
        <form onSubmit={handleSubmit} className=" space-y-4 bg-white p-6 rounded-xl shadow-sm border ">
            <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded placeholder:text-gray-500 text-gray-700"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded placeholder:text-gray-500 text-gray-700 "
            />
            <div className="flex gap-4">
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded placeholder:text-gray-500 text-gray-700"
                    required
                />
                <input
                    name="stockQuantity"
                    type="number"
                    placeholder="Stock"
                    value={form.stockQuantity}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded placeholder:text-gray-500 text-gray-700"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-slate-800 hover:bg-slate-600 text-white py-2 rounded font-bold">
                {buttonText}
            </button>
        </form>
    );
}
