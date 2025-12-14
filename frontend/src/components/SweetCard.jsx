import { useAuth } from '../auth/AuthContext';
import Button from './Button';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, onRestock }) => {
    const { isAdmin } = useAuth();
    const isOutOfStock = sweet.quantity === 0;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-white bg-opacity-80 text-purple-700 text-xs font-semibold rounded-full">
                        {sweet.category}
                    </span>
                    {isOutOfStock && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{sweet.name}</h3>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Price</p>
                        <p className="text-3xl font-bold text-blue-600">₹{sweet.price}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">In Stock</p>
                        <p className={`text-2xl font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                            {sweet.quantity}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    {!isAdmin() && (
                        <Button
                            variant="primary"
                            fullWidth
                            disabled={isOutOfStock}
                            onClick={() => onPurchase(sweet)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            {isOutOfStock ? 'Out of Stock' : 'Purchase'}
                        </Button>
                    )}

                    {isAdmin() && (
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => onEdit(sweet)}
                                className="text-sm"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => onRestock(sweet)}
                                className="text-sm text-green-600 border-green-600 hover:bg-green-50"
                            >
                                Restock
                            </Button>
                        </div>
                    )}

                    {isAdmin() && (
                        <Button
                            variant="danger"
                            fullWidth
                            onClick={() => onDelete(sweet)}
                            className="text-sm"
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
