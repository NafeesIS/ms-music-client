import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Hooks/Provider/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MyClasses = () => {
    const authContext = useContext(AuthContext);
    const instructorEmail = authContext.user.email;
    const authToken = authContext.token;

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`https://ms-music-server.vercel.app/newclasses?instructorEmail=${instructorEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [instructorEmail, authToken]);

    const handleUpdate = (classId) => {
        // Handle class update logic here
    };

    return (
        <div className="bg-slate-200 md:p-8 md:m-8 rounded-lg">
            <h1 className="text-center text-3xl md:text-6xl font-serif font-bold italic text-pink-800 p-8 md:my-8">
                My Classes
            </h1>
            <div className="max-w-screen-lg mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.length === 0 ? (
                    <p className="text-center text-xl">You have no classes added yet.</p>
                ) : (
                    classes.map((classItem) => (
                        <div key={classItem._id} className="card">
                            <div className="card-body">
                                <img src={classItem.image} alt={classItem.name} className="w-full h-40 object-cover mb-4" />
                                <h2 className="text-xl font-bold">{classItem.name}</h2>
                                <p className="text-gray-600 mb-4">Status: {classItem.status}</p>
                                <p className="text-gray-600 mb-4">Total Enrolled Students: {classItem.totalEnrolledStudents}</p>
                                <p className="text-gray-600 mb-4">Feedback: {classItem.status === 'Denied' ? classItem.feedback : 'N/A'}</p>
                                <Link to={`/dashboard/updateclass/${classItem._id}`}>
                                    <button
                                        className="btn bg-pink-800 hover:bg-pink-900 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleUpdate(classItem._id)}
                                    >
                                        Update
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyClasses;
