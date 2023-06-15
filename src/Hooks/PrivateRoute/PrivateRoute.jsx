import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { RingLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Show a loading indicator or skeleton screen while checking the authentication state
        return (
            <div className="flex items-center justify-center h-screen">
                <RingLoader color="#36d7b7" />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to={"/login"} replace={true} />;
};

export default PrivateRoute;
