"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import SideNavbar from "./SideNavbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function CustomerDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        if (!loading && (!user || user.role !== "user")) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <SideNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activePage="overview"
            />

            <div className="flex-1 overflow-auto">
                {/* Top Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <h2 className="font-semibold text-xl text-gray-800">
                                Customer Overview
                            </h2>
                            <div className="lg:hidden">
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                >
                                    <Menu size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Overview Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mt-4 p-6 bg-white shadow rounded-lg">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome, Customer!</h1>
                        <p className="text-gray-600 mt-2">Here’s a quick summary of your activity.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CustomerDashboard;
