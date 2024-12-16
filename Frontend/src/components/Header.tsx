import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout Successful");
    };

    const isLoginPage = location.pathname === '/login';

    return (
        <header className="bg-slate-800 text-white flex items-center justify-between px-4 py-3 md:px-14 h-[10vh]">
            <div className="flex items-center">
                <a href="/" className="flex items-center">
                    <img
                        src="https://levitation.in/wp-content/uploads/2023/12/Frame-39624.svg"
                        alt="Levitation Infotech Logo"
                        className="w-24 h-8 md:w-34 md:h-12"
                        width="141"
                        height="48"
                    />
                </a>
            </div>

            <div>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-[#2af62a] text-black font-medium py-2 px-3 rounded transition duration-300 text-sm md:text-base md:py-2 md:px-4"
                    >
                        Logout
                    </button>
                ) : (
                    isLoginPage ? (
                        <Link to={"/register"} className="border-[#2af62a] border text-[#2af62a] font-medium py-2 px-3 rounded transition duration-300 text-sm md:text-base md:py-2 md:px-4">
                            Connecting People With Technology
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#2af62a] text-black font-medium py-2 px-3 rounded transition duration-300 text-sm md:text-base md:py-2 md:px-4"
                        >
                            Login
                        </Link>
                    )
                )}
            </div>

            <Toaster position="top-right" reverseOrder={false} />
        </header>
    );
};

export default Header;
