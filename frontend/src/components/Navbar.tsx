"use client";

import { cn } from "@/utils/utils";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar({ className }: { className?: string }) {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("Navbar rendered. Loading:", loading, "User:", user);
    }, [user, loading]);

    const getDashboardLink = () => {
        if (!user) return "/";
        return user.role === "farmer" ? "/farmer/dashboard" : "/client/dashboard";
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const navItems: { label: string; path: string }[] = [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
        { label: "About Us", path: "/about" },
        { label: "Contact Us", path: "/contact" },
        { label: "Today Market", path: "/todayprice" },
        { label: "Shop", path: "/shop" },
    ];

    return (
        <div className={cn("fixed top-0 inset-x-0 w-full z-50", className)}>
            <Menu setActive={() => null}>
                <div className="px-4 py-2">
                    <HoveredLink href="/" className="text-3xl font-bold">
                        <span className="text-green-500">Fresh</span>Market
                    </HoveredLink>
                </div>

                <div className="flex justify-center flex-1 gap-10">
                    {navItems.map(({ label, path }) => (
                        <MenuItem key={label} item={label} setActive={() => null} active={null}>
                            <Link href={path} className="text-black dark:text-white text-lg font-medium">
                                {label}
                            </Link>
                        </MenuItem>
                    ))}
                </div>

                <div className="flex items-center gap-4 px-4">
                    {loading ? null : user ? (
                        <>
                            <MenuItem item="Dashboard" setActive={() => null} active={null}>
                                <Link
                                    href={getDashboardLink()}
                                    className="text-black dark:text-white font-medium hover:underline"
                                >
                                    Hello, {user.name?.split(" ")[0]}
                                </Link>
                            </MenuItem>
                            <MenuItem item="Logout" setActive={() => null} active={null}>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem item="Login" setActive={() => null} active={null}>
                                <Link
                                    href="/login"
                                    className="text-black dark:text-white font-medium hover:underline"
                                >
                                    Login
                                </Link>
                            </MenuItem>
                            <MenuItem item="Sign Up" setActive={() => null} active={null}>
                                <Link
                                    href="/signup"
                                    className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition"
                                >
                                    Sign Up
                                </Link>
                            </MenuItem>
                        </>
                    )}
                </div>
            </Menu>
        </div>
    );
}

export default Navbar;
