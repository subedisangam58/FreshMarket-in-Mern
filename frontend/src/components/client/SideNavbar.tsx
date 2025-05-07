"use client";
import {
    BarChart2,
    Bell,
    HelpCircle,
    Home,
    LogOut,
    Menu,
    Settings,
    User,
    X
} from "lucide-react";
import { FC, JSX } from "react";

type NavItem = {
    id: string;
    name: string;
    icon: JSX.Element;
};

interface SideNavbarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    activePage: string;
    navigateTo: (page: string) => void;
}

const SideNavbar: FC<SideNavbarProps> = ({
    isSidebarOpen,
    toggleSidebar,
    activePage,
    navigateTo
}) => {
    // Navigation items
    const navItems: NavItem[] = [
        { id: "home", name: "Dashboard", icon: <Home size={20} /> },
        { id: "statistics", name: "Statistics", icon: <BarChart2 size={20} /> },
        { id: "notifications", name: "Notifications", icon: <Bell size={20} /> },
        { id: "settings", name: "Settings", icon: <Settings size={20} /> },
        { id: "support", name: "Support", icon: <HelpCircle size={20} /> },
        { id: "feedback", name: "Feedback", icon: <Menu size={20} /> },
    ];

    return (
        <div
            className={`${isSidebarOpen ? "w-64" : "w-20"} bg-gray-800 text-white transition-all duration-300 ease-in-out`}
        >
            <div className="p-4 flex items-center justify-between">
                {isSidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700">
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div className="mt-4">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`flex items-center ${isSidebarOpen ? "px-4" : "justify-center px-2"} py-3 w-full ${activePage === item.id
                                ? "bg-gray-700 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            onClick={() => navigateTo(item.id)}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {isSidebarOpen && <span>{item.name}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            {/* User profile at bottom of sidebar */}
            <div className="absolute bottom-0 w-full p-4">
                <div className={`flex ${isSidebarOpen ? "items-center" : "justify-center"} text-sm`}>
                    <div className="flex-shrink-0">
                        <User size={24} className="text-gray-300" />
                    </div>
                    {isSidebarOpen && (
                        <div className="ml-3">
                            <p className="font-medium">John Doe</p>
                            <p className="text-gray-400">john@example.com</p>
                        </div>
                    )}
                </div>
                {isSidebarOpen ? (
                    <button className="mt-4 flex items-center text-gray-300 hover:text-white w-full">
                        <LogOut size={18} className="mr-2" />
                        <span>Log out</span>
                    </button>
                ) : (
                    <button className="mt-4 flex justify-center text-gray-300 hover:text-white w-full">
                        <LogOut size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SideNavbar;