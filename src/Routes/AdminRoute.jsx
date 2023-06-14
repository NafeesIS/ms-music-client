import { Navigate, useLocation } from "react-router";

import { useContext } from "react";
import { AuthContext } from "../Hooks/Provider/AuthProvider/AuthProvider";
import useAdmin from "../Hooks/UseAdmin/UseAdmin";


const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin();
    const location = useLocation();


    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;