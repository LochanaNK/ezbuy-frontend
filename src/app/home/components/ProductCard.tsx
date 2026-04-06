import { useProduct } from "../hooks/useProduct";
import { Product } from "../types/productType";
import { useCart } from "../../cart/hooks/useCart";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export const ProductCard = ({ product }: { product: Product }) => {
    const [userId, setUserId] = useState<number>();

    useEffect(() => {
        const savedUser = Cookie.get("ezbuy_user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUserId(user.id);
        }
    }, []);
    const { addToCart } = useCart(userId);
    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border border-gray-100 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mt-4">${product.price.toFixed(2)}</p>
            </div>

            <button
                onClick={() => addToCart(product.id, 1)}
                className="mt-4 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}
