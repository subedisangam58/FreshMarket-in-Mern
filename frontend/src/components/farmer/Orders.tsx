"use client";

function Orders() {
    return (
        <div className="flex pt-25">
            <div className="flex-1 flex flex-col items-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Orders</h1>
                <p className="text-lg mb-2">Here you can manage your orders.</p>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-2">
                        View Order History
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-2">
                        View Current Orders
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mb-2">
                        Cancel Order
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 mb-2">
                        Update Order Status
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 mb-2">
                        View Order Details
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 mb-2">
                        Print Order Invoice
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300 mb-2">
                        Export Order Data
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 mb-2">
                        Send Order Confirmation Email
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300 mb-2">
                        Track Order Shipment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Orders
