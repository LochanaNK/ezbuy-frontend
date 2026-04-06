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
                <h3 className="text-lg font-bold text-mauve-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                </p>
                <p className="text-2xl font-bold text-mauve-700 mt-4">
                    ${product.price.toFixed(2)}
                </p>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => addToCart(product.id, 1)}
                    className="mt-4 w-1/2 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-600 transition"
                >
                    Add to Cart
                </button>
                {product.stockQuantity > 5 ? (
                    <p className="text-green-500 text-md mt-5">
                        Stock: {product.stockQuantity}
                    </p>
                ) : <p className="text-red-500 text-md mt-5">
                    Stock: {product.stockQuantity}
                </p>
                }
            </div>
        </div>
    );
};
