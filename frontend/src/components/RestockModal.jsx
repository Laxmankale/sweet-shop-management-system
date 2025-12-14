import { useState } from 'react';
import Button from './Button';
import Input from './Input';

const RestockModal = ({ sweet, onClose, onRestock }) => {
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const restockQty = parseInt(quantity);
        if (!restockQty || restockQty <= 0) {
            setError('Please enter a valid quantity');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onRestock(sweet.id, restockQty);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to restock');
        } finally {
            setLoading(false);
        }
    };

    const newStock = sweet.quantity + (parseInt(quantity) || 0);

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
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Restock Sweet</h2>
                    <p className="text-gray-600 text-center">
                        Add more stock for <span className="font-semibold">{sweet.name}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Current Stock:</span>
                        <span className="text-2xl font-bold text-gray-800">{sweet.quantity}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Quantity to Add"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter quantity"
                        min="1"
                        required
                    />

                    {quantity && parseInt(quantity) > 0 && (
                        <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-green-700 font-medium">New Stock:</span>
                                <span className="text-2xl font-bold text-green-600">{newStock}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            loading={loading}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                            Restock
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestockModal;
