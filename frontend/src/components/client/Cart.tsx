"use client";

import React, { useEffect, useState } from "react";

interface CartItem {
    _id: string;
    product: {
        _id: string;
        name: string;
        imageUrl?: string;
        price: number;
        category: string;
    };
    quantity: number;
}

function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/api/cart", {
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
            setCart(data.cart || []);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        const subtotal = cart.reduce(
            (sum, item) => sum + item.quantity * item.product.price,
            0
        );
        setTotal(subtotal);
    }, [cart]);

    const updateQuantity = async (itemId: string, delta: number) => {
        const item = cart.find((i) => i._id === itemId);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + delta);

        try {
            const res = await fetch(`http://localhost:8000/api/cart/${itemId}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update quantity");

            setCart((prev) =>
                prev.map((item) =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err: any) {
            alert(err.message || "Update failed");
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            const res = await fetch(`http://localhost:8000/api/cart/${itemId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to remove item");

            setCart((prev) => prev.filter((item) => item._id !== itemId));
        } catch (err: any) {
            alert(err.message || "Delete failed");
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-lg">Loading your cart...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600">{error}</div>;
    }

    return (
        <div className="bg-[#fdfced] px-6 md:px-20 py-10 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                🛒 Your Shopping Cart
            </h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.product.imageUrl || "/images/placeholder.jpg"}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Sold by: Green Acres Farm</p>
                                        <p className="text-sm text-gray-600">
                                            ${item.product.price.toFixed(2)} / lb
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="text-lg px-2"
                                        >
                                            −
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="text-lg px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="font-bold">
                                        ${(item.quantity * item.product.price).toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-500 hover:text-red-600 text-xl"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between text-gray-600 mb-2">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between text-lg font-bold mb-6">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="bg-orange-500 text-white w-full py-3 rounded hover:bg-orange-600 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
