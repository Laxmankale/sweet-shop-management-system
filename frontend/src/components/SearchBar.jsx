import { useState } from 'react';
import Input from './Input';
import Button from './Button';

const SearchBar = ({ onSearch, onClear, categories = [] }) => {
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = {};
        if (filters.name) searchParams.name = filters.name;
        if (filters.category) searchParams.category = filters.category;
        if (filters.minPrice) searchParams.minPrice = filters.minPrice;
        if (filters.maxPrice) searchParams.maxPrice = filters.maxPrice;
        onSearch(searchParams);
    };

    const handleClear = () => {
        setFilters({
            name: '',
            category: '',
            minPrice: '',
            maxPrice: '',
        });
        onClear();
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Search & Filter Sweets</h3>

            <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <Input
                        label="Sweet Name"
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleChange}
                        placeholder="Search by name..."
                    />

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={filters.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Min Price"
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="Min ₹"
                    />

                    <Input
                        label="Max Price"
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="Max ₹"
                    />
                </div>

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                    >
                        🔍 Search
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClear}
                        className="flex-1"
                    >
                        Clear Filters
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
