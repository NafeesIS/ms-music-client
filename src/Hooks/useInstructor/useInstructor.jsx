import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const useInstructor = () => {
    const { user, loading } = useContext(AuthContext);

    const fetchInstructorStatus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/instructor/${user?.email}`);
            const data = await response.json();
            return data.instructor;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery(
        ["isInstructor", user?.email],
        fetchInstructorStatus,
        {
            enabled: !loading,
        }
    );

    return [isInstructor, isInstructorLoading];
};

export default useInstructor;
