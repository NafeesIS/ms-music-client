import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Replace with your Firebase authentication imports
// import logo from 'path/to/your/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const auth = getAuth(); // Replace with your getAuth function

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, update state with user info
                setIsLoggedIn(true);
                setUsername(user.displayName || 'John Doe'); // Replace with your user display name property
                setUserPhoto(user.photoURL); // Replace with your user display name property
            } else {
                // User is not logged in, update state accordingly
                setIsLoggedIn(false);
                setUsername('');
            }
        });

        // Clean up the listener
        return () => unsubscribe();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        const auth = getAuth(); // Replace with your getAuth function

        // Perform logout logic using the Firebase authentication signOut method
        auth.signOut().then(() => {
            setIsLoggedIn(false);
            setUsername('');
        });
    };

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-[#0e6969] py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src='https://i.ibb.co/d6GSzfD/mlogo-removebg-preview.png' alt="Website Logo" className="h-16 w-[7rem]" />
                    <h1 className="ml-2 text-white font-bold text-lg">MS Music</h1>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                    <Link to={"/"} className="text-gray-300 hover:text-white px-4 py-2">Home</Link>
                    <Link to={"/instructors"} className="text-gray-300 hover:text-white px-4 py-2">Instructors</Link>
                    <Link to={"/classes"} className="text-gray-300 hover:text-white px-4 py-2">Classes</Link>

                    {isLoggedIn ? (

                        <div className="flex items-center ml-4">
                            <Link to={"/dashboard"} className="text-gray-300 hover:text-white block px-4 py-2">Dashboard</Link>
                            <img
                                src={userPhoto}
                                alt={username}
                                className="h-8 w-8 rounded-full cursor-pointer"
                                title={username}
                            />
                            <span className="text-white ml-2 cursor-pointer">{username}</span>
                            <button
                                className="text-gray-300 hover:text-white px-4 py-2 ml-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to={"/login"} className="text-gray-300 hover:text-white px-4 py-2">Login</Link>
                    )}
                </div>
                <div className="sm:hidden">
                    <button
                        className="text-gray-300 hover:text-white focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-[#0e6969] py-2">
                    <Link to={"/"} className="text-gray-300 hover:text-white block px-4 py-2">Home</Link>
                    <Link to={"/instructors"} className="text-gray-300 hover:text-white block px-4 py-2">Instructors</Link>
                    <Link to={"/classes"} className="text-gray-300 hover:text-white block px-4 py-2">Classes</Link>
                    {isLoggedIn ? (
                        <>
                            <hr className="border-gray-700 my-2" />

                            <Link to={"/dashboard"} className="text-gray-300 hover:text-white block px-4 py-2">Dashboard</Link>

                            <div className="flex items-center px-4 py-2">
                                <img
                                    src={userPhoto}
                                    alt={username}
                                    className="h-8 w-8 rounded-full cursor-pointer"
                                    title={username}
                                />
                                <span className="text-white ml-2 cursor-pointer">{username}</span>
                            </div>
                            <div className="px-4 py-2">
                                <button
                                    className="text-gray-300 hover:text-white w-full text-left focus:outline-none"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to={"/login"} className="text-gray-300 hover:text-white block px-4 py-2">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

