import { useAuth } from '../auth/AuthContext';
import Navbar from '../components/Navbar';
import SweetList from '../sweets/SweetList';

const DashboardPage = () => {
    const { user, isAdmin } = useAuth();

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

                <SweetList />
            </div>
        </div>
    );
};

export default DashboardPage;
