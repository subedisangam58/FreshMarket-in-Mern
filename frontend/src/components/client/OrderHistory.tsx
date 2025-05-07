"use client";

function Orders() {
    return (
        <div className="flex pt-25">
            <div className="flex-1 flex flex-col items-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">My Orders</h1>
                <p className="text-lg mb-2">Here you can manage your orders.</p>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-2">
                        View Order History
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Orders
