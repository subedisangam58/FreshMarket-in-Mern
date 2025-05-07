"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import SideNavbar from "@/components/farmer/SideNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!loading && !user) {
            if (!hasShownToast.current) {
                toast.warn("Please login first");
                hasShownToast.current = true;
            }
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return <div className="p-8 text-center text-gray-500">Checking authentication...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideNavbar />
            <main className="flex-1 p-6 pt-30">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Overview</h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-700">{user.name || "John Doe"}</h3>
                            <p className="text-gray-500">{user.email || "johndoe@example.com"}</p>
                            <p className="text-gray-500 mt-1">{user.phone || "+977-9800000000"}</p>
                            <p className="text-gray-500 mt-1">{user.address || "Kathmandu, Nepal"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                value={user.name || "John Doe"}
                                className="w-full p-2 border border-gray-300 rounded"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email || "johndoe@example.com"}
                                className="w-full p-2 border border-gray-300 rounded"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                value={user.phone || "+977-9800000000"}
                                className="w-full p-2 border border-gray-300 rounded"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Address</label>
                            <input
                                type="text"
                                value={user.address || "Kathmandu, Nepal"}
                                className="w-full p-2 border border-gray-300 rounded"
                                disabled
                            />
                        </div>
                        <div>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;