import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const useStudent = () => {
    const { user, loading } = useContext(AuthContext);

    const fetchStudentStatus = async () => {
        try {
            const response = await fetch(`https://ms-music-server.vercel.app/users/student/${user?.email}`);
            const data = await response.json();
            return data.student;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const { data: isStudent, isLoading: isStudentLoading } = useQuery(
        ["isStudent", user?.email],
        fetchStudentStatus,
        {
            enabled: !loading,
        }
    );

    return [isStudent, isStudentLoading];
};

export default useStudent;
