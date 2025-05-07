"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleError, handleSuccess } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";

function Login() {
    const router = useRouter();
    const { refreshUser, user } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        const remembered = localStorage.getItem("rememberMe") === "true";
        if (remembered && savedEmail) {
            setFormData((prev) => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) return handleError("All fields are required");

        try {
            const res = await fetch("http://localhost:8000/api/users/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Login failed");

            handleSuccess(result.message || "Login successful!");

            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
                localStorage.setItem("userEmail", email);
            } else {
                localStorage.removeItem("rememberMe");
                localStorage.removeItem("userEmail");
            }

            await refreshUser();
            router.refresh();

            const role = result.user?.role;
            if (role === "farmer") {
                router.push("/farmer/dashboard");
            } else if (role === "client") {
                router.push("/client/dashboard");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            handleError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center pt-28 min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/leaf-icon.png" alt="Logo" className="w-16 h-16" />
                </div>
                <h1 className="text-2xl font-bold mb-2 text-center text-green-600">Welcome back!</h1>
                <p className="text-center mb-6 text-gray-500">Please login to access your account</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            className="text-green-500 text-sm hover:underline"
                            onClick={() => handleError("Forgot password not implemented")}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                        Sign in
                    </button>
                </form>

                <p className="text-center text-sm mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-green-500 hover:underline">Sign up</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;