import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Hooks/Provider/AuthProvider/AuthProvider';
const ManageAllUsers = () => {
    const { user } = useContext(AuthContext);
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const token = localStorage.getItem('access-token');
        const response = await fetch('https://ms-music-server.vercel.app/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    });

    useEffect(() => {
        refetch();
    }, []);

    const handleMakeAdmin = (user) => {
        const token = localStorage.getItem('access-token');
        fetch(`https://ms-music-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleMakeInstructor = (user) => {
        const token = localStorage.getItem('access-token');
        fetch(`https://ms-music-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is now an Instructor!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleDelete = (user) => {
        const token = localStorage.getItem('access-token');
        fetch(`https://ms-music-server.vercel.app/users/${user._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} has been deleted!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <div className="w-full">
            <Helmet>
                <title>MS Music | All users</title>
            </Helmet>
            <h3 className="text-4xl font-serif font-bold my-4 text-center mx-8">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className='text-black'>
                        <tr>
                            <th className='font-semibold font-serif'>#</th>
                            <th className='font-semibold font-serif'>Name</th>
                            <th className='font-semibold font-serif'>Email</th>
                            <th className='font-semibold font-serif'>Role</th>
                            <th className='font-semibold font-serif'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        'Admin'
                                    ) : user.role === 'instructor' ? (
                                        'Instructor'
                                    ) : (
                                        <div>
                                            {user.role === 'student' ? (
                                                <div>
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-ghost bg-orange-600 text-white mx-3"
                                                        disabled={user.role !== 'student'}
                                                    >
                                                        Make Admin
                                                    </button>
                                                    <button
                                                        onClick={() => handleMakeInstructor(user)}
                                                        className="btn btn-ghost bg-blue-600 text-white"
                                                        disabled={user.role !== 'student'}
                                                    >
                                                        Make Instructor
                                                    </button>
                                                </div>
                                            ) : (
                                                'Unknown Role'
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-ghost bg-red-600 text-white"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default ManageAllUsers;

