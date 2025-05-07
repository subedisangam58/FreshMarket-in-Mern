"use client";
import React, { useEffect, useState } from 'react';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: string;
}

function HeroSection() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data.products || []))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    return (
        <div className="bg-[#fdfced]">
            <section className="pt-32 text-center py-20 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Fresh From the Farm, Straight to Your Table
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Discover the best local produce directly from farmers near you. High-quality,
                    fresh vegetables delivered with care.
                </p>
                <a href="/products" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition">
                    Browse Products →
                </a>
            </section>

            <section className="px-6 py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={product.imageUrl || '/images/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                <p className="text-green-600 font-bold">Rs. {product.price.toFixed(2)}</p>
                                <a
                                    href={`/products/${product._id}`}
                                    className="mt-4 inline-block text-sm text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <a
                        href="/products"
                        className="bg-[#f4f4da] text-gray-800 px-6 py-2 rounded hover:bg-[#eaeacb] border"
                    >
                        See All Products →
                    </a>
                </div>
            </section>

            <section className="text-center bg-[#fdfced] py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Are You a Farmer?</h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Join our community of local farmers and reach more customers. List your fresh produce easily and grow your business.
                </p>
                <a href="/signup" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                    Register Your Farm 🌱
                </a>
            </section>
        </div>
    );
}

export default HeroSection;
