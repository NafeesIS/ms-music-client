import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating async loading of user authentication state
        const checkAuthState = () => {
            // You can replace the setTimeout with your actual logic to check the user's authentication state
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        checkAuthState();
    }, []);

    if (isLoading) {
        // Show a loading indicator or skeleton screen while checking the authentication state
        return <div className="flex items-center justify-center h-screen"><RingLoader color="#36d7b7" /></div>;
    }

    if (user) {
        return children;
    }

    return <Navigate to={'/login'} replace={true} />;
};

export default PrivateRoute;