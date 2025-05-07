"use client";

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    cPassword: string;
    role: string;
}

const handleError = (message: string) => toast.error(message);
const handleSuccess = (message: string) => toast.success(message);

function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        cPassword: '',
        role: 'user', // ✅ default to "user" which matches backend
    });

    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

    const { name, email, password, address, phone, cPassword, role } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !cPassword || !phone || !address) {
            return handleError('All fields are required');
        }
        if (!termsAccepted) {
            return handleError("You must accept the Terms & Conditions.");
        }
        if (password !== cPassword) {
            return handleError("Passwords don't match");
        }

        try {
            const response = await fetch("http://localhost:8000/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, address, role }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || "Signup failed");
            }

            handleSuccess("Account created! Please verify your email.");

            const queryParams = new URLSearchParams({
                name, email, phone, address, role,
            }).toString();

            router.push(`/verifyemail?${queryParams}`);
        } catch (error: any) {
            console.error(error);
            handleError(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <main className="pt-28 min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <section className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-2">Create Your Account</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Join our community of local farmers and food enthusiasts</p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" placeholder="Full Name" value={name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Email Address" value={email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="cPassword" name="cPassword" placeholder="Confirm Password" value={cPassword} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" id="phone" name="phone" placeholder="Phone Number" value={phone} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input type="text" id="address" name="address" placeholder="Address" value={address} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" name="role" value={role} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="user">Customer</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>

                    <div className="flex items-start space-x-2">
                        <input type="checkbox" id="terms" name="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</Link>
                        </label>
                    </div>

                    <button type="submit" className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-colors ${termsAccepted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!termsAccepted}>
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
                    </p>
                </form>

                <ToastContainer />
            </section>
        </main>
    );
}

export default Signup;
