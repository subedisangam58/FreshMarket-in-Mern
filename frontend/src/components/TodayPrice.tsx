"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Commodity {
    commodityname: string;
    avgprice: string;
    maxprice: string;
    minprice: string;
    commodityunit: string;
}

export default function Todayprice() {
    const [data, setData] = useState<Commodity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    async function handleApi() {
        try {
            const response = await fetch('https://kalimatimarket.gov.np/api/daily-prices/en');
            const result = await response.json();
            setIsLoading(false);
            setData(result?.prices || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleApi();
    }, []);

    const filteredData = data.filter((item) =>
        item.commodityname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Kalimati Fruits and Vegetables Daily Rate</h1>
            
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search commodity..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow"
                />
            </div>

            <div className="overflow-x-auto">
                {isLoading ? (
                    <h2 className="text-center text-xl font-semibold text-gray-600">Data is loading...</h2>
                ) : (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Commodity Name</th>
                                <th className="py-3 px-6 text-left">Price (Avg)</th>
                                <th className="py-3 px-6 text-left">Max Price</th>
                                <th className="py-3 px-6 text-left">Min Price</th>
                                <th className="py-3 px-6 text-left">Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index} className="border-t hover:bg-green-50">
                                        <td className="py-3 px-6">{item.commodityname}</td>
                                        <td className="py-3 px-6">{item.avgprice}</td>
                                        <td className="py-3 px-6">{item.maxprice}</td>
                                        <td className="py-3 px-6">{item.minprice}</td>
                                        <td className="py-3 px-6">{item.commodityunit}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
