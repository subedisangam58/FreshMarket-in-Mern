"use client";

function Shop() {
    return (
        <div className="flex pt-25">
            <div className="flex-1 flex flex-col items-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Shop</h1>
                <p className="text-lg mb-2">Here you can manage your shop.</p>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-2">
                        Add New Product
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-2">
                        View Product List
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mb-2">
                        Update Product Details
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 mb-2">
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Shop
