import Button from './Button';

const DeleteConfirmModal = ({ sweet, onClose, onConfirm, loading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                    disabled={loading}
                >
                    ×
                </button>

                <div className="mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Delete Sweet?</h2>
                    <p className="text-gray-600 text-center">
                        Are you sure you want to delete <span className="font-semibold">{sweet.name}</span>? This action cannot be undone.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sweet:</span>
                        <span className="font-semibold text-gray-800">{sweet.name}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-semibold text-gray-800">{sweet.category}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-semibold text-gray-800">{sweet.quantity} units</span>
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
                        variant="danger"
                        fullWidth
                        onClick={onConfirm}
                        loading={loading}
                    >
                        Delete Sweet
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
