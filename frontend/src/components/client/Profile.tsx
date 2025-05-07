"use client";
import { useState } from "react";
import SideNavbar from "./SideNavbar";

function Profile() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex pt-25">
            <SideNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activePage="profile"
                navigateTo={(page) => { }}
            />
            <div className="flex-1 flex flex-col items-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">User Profile</h1>
                <p className="text-lg mb-2">Welcome to your profile page!</p>
                <p className="text-lg mb-2">Here you can manage your account settings.</p>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-2">
                        Edit Profile
                    </button>
                </div>
                <div className="mt-4 text-gray-500">
                    <p>If you need assistance, feel free to reach out to our support team.</p>
                    <p>Email: <a href="mailto:freshmarket@gmail.com" className="text-blue-500 hover:underline">freshmarket@gmail.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 234 567 890</a></p>
                </div>
            </div>
        </div>
    );
}

export default Profile;