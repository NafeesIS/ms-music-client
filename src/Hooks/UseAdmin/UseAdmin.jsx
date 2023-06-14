import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);

    const fetchAdminStatus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
            const data = await response.json();
            return data.admin;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
        ["isAdmin", user?.email],
        fetchAdminStatus,
        {
            enabled: !loading,
        }
    );

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
