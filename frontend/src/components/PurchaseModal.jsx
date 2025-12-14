import { useState } from 'react';
import Button from './Button';
import Input from './Input';

const PurchaseModal = ({ sweet, onClose, onPurchase }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const maxQuantity = sweet.quantity;
    const totalPrice = (sweet.price * quantity).toFixed(2);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        if (value > maxQuantity) {
            setQuantity(maxQuantity);
            setError(`Only ${maxQuantity} available in stock`);
        } else if (value < 1) {
            setQuantity(1);
            setError('Quantity must be at least 1');
        } else {
            setQuantity(value);
            setError('');
        }
    };

    const handlePurchase = async () => {
        if (quantity > maxQuantity) {
            setError(`Only ${maxQuantity} available in stock`);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onPurchase(sweet.id, quantity);
            onClose();
        } catch (err) {
            setError(err.message || 'Purchase failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Purchase Sweet</h2>
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
                        <p className="text-sm text-gray-600">{sweet.category}</p>
                        <p className="text-2xl font-bold text-blue-600 mt-2">₹{sweet.price}</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="mb-6">
                    <Input
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={maxQuantity}
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Available: {maxQuantity} in stock
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Total Price:</span>
                        <span className="text-3xl font-bold text-green-600">₹{totalPrice}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={handlePurchase}
                        loading={loading}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                        Confirm Purchase
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;
