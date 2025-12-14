import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const SweetFormModal = ({ sweet, onClose, onSave, categories = [] }) => {
    const isEditMode = !!sweet;
    const [formData, setFormData] = useState({
        name: sweet?.name || '',
        category: sweet?.category || '',
        price: sweet?.price || '',
        quantity: sweet?.quantity || '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const suggestedCategories = ['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Cake', 'Cookie', 'Indian', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setApiError('');
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Sweet name is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.quantity) {
            newErrors.quantity = 'Quantity is required';
        } else if (parseInt(formData.quantity) < 0) {
            newErrors.quantity = 'Quantity cannot be negative';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            const sweetData = {
                name: formData.name.trim(),
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
            };

            if (isEditMode) {
                await onSave(sweet.id, sweetData);
            } else {
                await onSave(sweetData);
            }
            onClose();
        } catch (err) {
            setApiError(err.message || 'Failed to save sweet');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditMode ? 'Edit Sweet' : 'Add New Sweet'}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        {isEditMode ? 'Update sweet details' : 'Add a new sweet to your inventory'}
                    </p>
                </div>

                {apiError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{apiError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Sweet Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Chocolate Truffle"
                        required
                        error={errors.name}
                    />

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Chocolate, Indian, Candy"
                            list="category-suggestions"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        />
                        <datalist id="category-suggestions">
                            {suggestedCategories.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                            {categories.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                    </div>

                    <Input
                        label="Price (₹)"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                        error={errors.price}
                    />

                    <Input
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        required
                        error={errors.quantity}
                    />

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
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            {isEditMode ? 'Update Sweet' : 'Add Sweet'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SweetFormModal;
