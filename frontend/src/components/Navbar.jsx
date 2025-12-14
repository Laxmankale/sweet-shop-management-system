import { useAuth } from '../auth/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">🍭</span>
                        <h1 className="text-2xl font-bold text-blue-600">Sweet Shop</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Welcome,</p>
                            <p className="font-semibold text-gray-800">{user?.username}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={logout}
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
