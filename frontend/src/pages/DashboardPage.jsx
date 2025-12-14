import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import sweetService from '../api/sweetService';

const DashboardPage = () => {
    const { user, isAdmin } = useAuth();
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome, {user?.username}! 👋
                    </h2>
                    <p className="text-gray-600">
                        {isAdmin()
                            ? 'Manage your sweet shop inventory and sales'
                            : 'Browse and purchase delicious sweets'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading sweets...</p>
                        </div>
                    </div>
                ) : sweets.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍭</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No sweets available</h3>
                        <p className="text-gray-600">
                            {isAdmin()
                                ? 'Start by adding some sweets to your inventory!'
                                : 'Check back later for delicious treats!'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sweets.map((sweet) => (
                            <div
                                key={sweet.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{sweet.category}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-blue-600">₹{sweet.price}</span>
                                    <span className={`text-sm font-medium ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
                                    </span>
                                </div>
                                <div className="text-center text-gray-500 text-sm">
                                    Sweet card component - Full features coming in Phase 4
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
