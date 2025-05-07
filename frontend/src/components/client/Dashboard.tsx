"use client";
import { Bell, User } from "lucide-react";
import { useState } from "react";
import SideNavbar from "./SideNavbar";

type RecentActivity = {
    id: number;
    type: string;
    date: string;
    time?: string;
    amount?: string;
    message?: string;
};

type StatisticsData = {
    visits: number;
    transactions: number;
    revenue: string;
    growth: string;
};

export default function Dashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState("home");
    const [feedbackText, setFeedbackText] = useState("");

    // Mock data for recent activity
    const recentActivities: RecentActivity[] = [
        { id: 1, type: "login", date: "2025-04-28", time: "14:32" },
        { id: 2, type: "transaction", date: "2025-04-27", amount: "$45.99" },
        { id: 3, type: "notification", date: "2025-04-26", message: "New feature available" }
    ];

    // Mock statistics data
    const statisticsData: StatisticsData = {
        visits: 254,
        transactions: 12,
        revenue: "$1,245.00",
        growth: "+15%"
    };

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Handle page navigation
    const navigateTo = (page: string) => {
        setActivePage(page);
    };

    // Handle feedback submission
    const handleFeedbackSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert(`Thank you for your feedback: "${feedbackText}"`);
        setFeedbackText("");
    };

    // Render content based on active page
    const renderContent = () => {
        switch (activePage) {
            case "home":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>
                        <p className="mt-2 text-lg text-gray-600">Overview of your account and recent activity</p>

                        {/* Stats summary */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Total Visits</h3>
                                <p className="text-2xl font-bold">{statisticsData.visits}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Transactions</h3>
                                <p className="text-2xl font-bold">{statisticsData.transactions}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Revenue</h3>
                                <p className="text-2xl font-bold">{statisticsData.revenue}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Growth</h3>
                                <p className="text-2xl font-bold text-green-500">{statisticsData.growth}</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-8 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                            </div>
                            <div className="p-4">
                                {recentActivities.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {recentActivities.map((activity) => (
                                            <li key={activity.id} className="py-3">
                                                {activity.type === "login" && (
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">Login detected</p>
                                                            <p className="text-sm text-gray-500">{activity.date} at {activity.time}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {activity.type === "transaction" && (
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">New transaction</p>
                                                            <p className="text-sm text-gray-500">{activity.date}</p>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                                                    </div>
                                                )}
                                                {activity.type === "notification" && (
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                                            <p className="text-sm text-gray-500">{activity.date}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">You have no recent activity.</p>
                                )}
                            </div>
                        </div>
                    </>
                );
            case "statistics":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
                        <p className="mt-2 text-lg text-gray-600">View your account statistics and analytics</p>

                        <div className="mt-6 bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Overview</h2>
                            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                                <p className="text-gray-500">Chart visualization would go here</p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium text-gray-700">Top Performing Days</h3>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex justify-between">
                                            <span>Monday</span>
                                            <span className="font-medium">36 visits</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Friday</span>
                                            <span className="font-medium">42 visits</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Saturday</span>
                                            <span className="font-medium">38 visits</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium text-gray-700">Growth Trends</h3>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex justify-between">
                                            <span>This week</span>
                                            <span className="font-medium text-green-500">+12%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>This month</span>
                                            <span className="font-medium text-green-500">+15%</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>This quarter</span>
                                            <span className="font-medium text-green-500">+8%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case "notifications":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                        <p className="mt-2 text-lg text-gray-600">Stay updated with your account notifications</p>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Notification Center</h2>
                            </div>
                            <div className="p-4 divide-y divide-gray-200">
                                <div className="py-4">
                                    <p className="text-sm font-medium text-gray-900">New feature available</p>
                                    <p className="text-sm text-gray-500">We've added new analytics features to your dashboard.</p>
                                    <p className="text-xs text-gray-400 mt-1">April 26, 2025</p>
                                </div>
                                <div className="py-4">
                                    <p className="text-sm font-medium text-gray-900">Security alert</p>
                                    <p className="text-sm text-gray-500">We noticed a login from a new device.</p>
                                    <p className="text-xs text-gray-400 mt-1">April 25, 2025</p>
                                </div>
                                <div className="py-4">
                                    <p className="text-sm font-medium text-gray-900">Account update</p>
                                    <p className="text-sm text-gray-500">Your account settings were updated successfully.</p>
                                    <p className="text-xs text-gray-400 mt-1">April 24, 2025</p>
                                </div>
                            </div>
                            <div className="p-4 border-t">
                                <button className="text-sm text-blue-500 hover:text-blue-600">Mark all as read</button>
                            </div>
                        </div>
                    </>
                );
            case "settings":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
                        <p className="mt-2 text-lg text-gray-600">Manage your account preferences</p>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                            </div>
                            <div className="p-4">
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                                defaultValue="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                                defaultValue="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                            defaultValue="john.doe@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                            defaultValue="********"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                            </div>
                            <div className="p-4">
                                <form className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="email-notifications"
                                                className="rounded text-blue-500"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Push Notifications</p>
                                            <p className="text-sm text-gray-500">Receive notifications on your device</p>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="push-notifications"
                                                className="rounded text-blue-500"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Marketing Emails</p>
                                            <p className="text-sm text-gray-500">Receive promotional emails</p>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="marketing-emails"
                                                className="rounded text-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                );
            case "support":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Support</h1>
                        <p className="mt-2 text-lg text-gray-600">Get help with your account</p>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Contact Support</h2>
                            </div>
                            <div className="p-4">
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                            placeholder="What do you need help with?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Message</label>
                                        <textarea
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                            rows={4}
                                            placeholder="Describe your issue in detail..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                                        <select
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
                            </div>
                            <div className="p-4 divide-y divide-gray-200">
                                <div className="py-4">
                                    <p className="font-medium text-gray-800">How do I reset my password?</p>
                                    <p className="mt-1 text-gray-600">You can reset your password by going to the login page and clicking on "Forgot Password".</p>
                                </div>
                                <div className="py-4">
                                    <p className="font-medium text-gray-800">How do I update my profile information?</p>
                                    <p className="mt-1 text-gray-600">You can update your profile information in the Account Settings section.</p>
                                </div>
                                <div className="py-4">
                                    <p className="font-medium text-gray-800">How do I cancel my subscription?</p>
                                    <p className="mt-1 text-gray-600">To cancel your subscription, please contact our support team.</p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case "feedback":
                return (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800">Feedback</h1>
                        <p className="mt-2 text-lg text-gray-600">We value your feedback</p>

                        <div className="mt-6 bg-white shadow-md rounded-lg">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Share Your Thoughts</h2>
                            </div>
                            <div className="p-4">
                                <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
                                        <textarea
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                            rows={6}
                                            placeholder="Tell us what you think..."
                                            value={feedbackText}
                                            onChange={(e) => setFeedbackText(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                                        <div className="mt-1 flex items-center">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    className="text-gray-300 hover:text-yellow-400 text-2xl p-1"
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Submit Feedback
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                );
            default:
                return <div>Page not found</div>;
        }
    };

    // Get the page title for header
    const getPageTitle = () => {
        switch (activePage) {
            case "home": return "Dashboard";
            case "statistics": return "Statistics";
            case "notifications": return "Notifications";
            case "settings": return "Settings";
            case "support": return "Support";
            case "feedback": return "Feedback";
            default: return "Dashboard";
        }
    };

    return (
        <div className="pt-26 flex h-screen bg-gray-100">
            {/* Sidebar component */}
            <SideNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activePage={activePage}
                navigateTo={navigateTo}
            />

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {/* Top header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <h2 className="font-semibold text-xl text-gray-800">
                                {getPageTitle()}
                            </h2>
                            <div className="flex items-center">
                                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 mr-2">
                                    <Bell size={20} />
                                </button>
                                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                    <User size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content area */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}