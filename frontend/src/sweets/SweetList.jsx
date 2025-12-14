import { useState, useEffect } from 'react';
import sweetService from '../api/sweetService';
import SweetCard from '../components/SweetCard';

const SweetList = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await sweetService.getAllSweets();
            setSweets(data);
        } catch (err) {
            setError(err.message || 'Failed to load sweets');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = (sweet) => {
        console.log('Purchase sweet:', sweet);
    };

    const handleEdit = (sweet) => {
        console.log('Edit sweet:', sweet);
    };

    const handleDelete = (sweet) => {
        console.log('Delete sweet:', sweet);
    };

    const handleRestock = (sweet) => {
        console.log('Restock sweet:', sweet);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading sweets...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchSweets}
                    className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (sweets.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🍭</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No sweets available</h3>
                <p className="text-gray-600">Check back later for delicious treats!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
                <SweetCard
                    key={sweet.id}
                    sweet={sweet}
                    onPurchase={handlePurchase}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRestock={handleRestock}
                />
            ))}
        </div>
    );
};

export default SweetList;
