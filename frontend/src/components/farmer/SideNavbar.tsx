"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { label: "Dashboard", path: "/farmer/dashboard" },
    { label: "Crops", path: "/farmer/cropdetail" },
    { label: "Livestock", path: "/farmer/livestock" },
    { label: "Market", path: "/farmer/market" },
    { label: "Add Product", path: "/farmer/addproduct" },
    { label: "Reports", path: "/farmer/reports" },
    { label: "Resources", path: "/farmer/resources" },
    { label: "Profile", path: "/farmer/profile" },
];

export default function SideNavbar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="h-screen w-64 bg-white border-r shadow-sm fixed top-0 left-0 hidden md:block z-40 pt-30">
            <nav className="flex flex-col p-4 space-y-4">
                {navItems.map(({ label, path }) => (
                    <Link
                        key={label}
                        href={path}
                        className={`px-4 py-2 rounded text-sm font-medium ${pathname === path
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {label}
                    </Link>
                ))}
                <button
                    onClick={logout}
                    className="mt-4 text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded font-medium"
                >
                    Logout
                </button>
            </nav>
        </aside>
    );
}
