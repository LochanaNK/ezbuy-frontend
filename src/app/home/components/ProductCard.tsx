import { useProduct } from "../hooks/useProduct";
import { Product } from "../types/productType";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border border-gray-100 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mt-4">${product.price.toFixed(2)}</p>
            </div>

            <button className="mt-4 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Add to Cart
            </button>
        </div>
    );
}
