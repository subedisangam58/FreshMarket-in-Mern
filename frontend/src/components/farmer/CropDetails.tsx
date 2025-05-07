"use client";

import cropData from '@/data/crops-details.json';
import SideNavbar from '@/components/farmer/SideNavbar';
import { useEffect, useState } from 'react';

interface Crop {
    name: string;
    category: string;
    introduction: string;
    seed_selection: string;
    fertilization_and_tilling: string;
    irrigation: string;
    crop_rotation_and_intercropping: string;
    production: string;
    climate_and_soil: string;
    uses_and_importance: string;
    main_varieties: string[];
    spacing: string;
}

// Component for displaying a single crop's details
const CropDetailCard = ({ crop, isOpen, toggleOpen }: {
    crop: Crop;
    isOpen: boolean;
    toggleOpen: () => void;
}) => {
    return (
        <div className="mb-4 border rounded-lg shadow-sm overflow-hidden">
            <div
                className="p-4 bg-green-50 flex justify-between items-center cursor-pointer"
                onClick={toggleOpen}
            >
                <div>
                    <h3 className="text-xl font-bold text-green-800">{crop.name}</h3>
                    <span className="text-sm text-green-600">{crop.category}</span>
                </div>
                <span className="text-green-800">
                    {isOpen ? '▲' : '▼'}
                </span>
            </div>

            {isOpen && (
                <div className="p-4 bg-white">
                    <p className="mb-4">{crop.introduction}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-green-700">Seed Selection</h4>
                                <p>{crop.seed_selection}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Fertilization & Tilling</h4>
                                <p>{crop.fertilization_and_tilling}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Irrigation</h4>
                                <p>{crop.irrigation}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Crop Rotation & Intercropping</h4>
                                <p>{crop.crop_rotation_and_intercropping}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-green-700">Production</h4>
                                <p>{crop.production}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Climate & Soil</h4>
                                <p>{crop.climate_and_soil}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Uses & Importance</h4>
                                <p>{crop.uses_and_importance}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-green-700">Spacing</h4>
                                <p>{crop.spacing}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold text-green-700">Main Varieties</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {crop.main_varieties.map((variety, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                >
                                    {variety}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Filter component
const CropFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm
}: {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}) => {
    return (
        <div className="pt-10 mb-6 space-y-4">
            <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Crops
                </label>
                <input
                    type="text"
                    id="search"
                    className="w-full p-2 border rounded-md"
                    placeholder="Search by crop name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Category
                </label>
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`px-3 py-1 rounded-full text-sm ${selectedCategory === ''
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                        onClick={() => setSelectedCategory('')}
                    >
                        All
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-800'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main CropDetails component
const CropDetails = () => {
    // State for crop data
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State for filtering and UI
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openCropId, setOpenCropId] = useState<string | null>(null);

    // Load crop data from JSON file
    useEffect(() => {
        try {
            // Directly use the imported cropData
            setCrops(cropData.crops);
            setLoading(false);
        } catch (err) {
            setError('Error loading crop data. Please try again later.');
            setLoading(false);
            console.error('Error loading crop data:', err);
        }
    }, []);

    // Extract unique categories from crops data
    const categories = [...new Set(crops.map(crop => crop.category))];

    // Filter crops based on search term and selected category
    const filteredCrops = crops.filter(crop => {
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || crop.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Toggle open/close state of crop details
    const toggleCrop = (cropName: string) => {
        if (openCropId === cropName) {
            setOpenCropId(null);
        } else {
            setOpenCropId(cropName);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading crop data...</div>;
    }

    if (error) {
        return <div className="text-red-600 p-4 border border-red-300 rounded">{error}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50 pt-30">
            <SideNavbar />
            <div className="flex-1 p-6 ml-0 md:ml-64">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-6">Crop Information</h1>

                    <CropFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {filteredCrops.length > 0 ? (
                        <div>
                            {filteredCrops.map((crop) => (
                                <CropDetailCard
                                    key={crop.name}
                                    crop={crop}
                                    isOpen={openCropId === crop.name}
                                    toggleOpen={() => toggleCrop(crop.name)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <p className="text-lg text-gray-600">No crops found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropDetails;