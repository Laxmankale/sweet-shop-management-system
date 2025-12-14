import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-blue-600">🍬 Sweet Shop</h1>
                        {isAdmin() && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                                Admin
                            </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">{user?.username}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="text-sm"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
