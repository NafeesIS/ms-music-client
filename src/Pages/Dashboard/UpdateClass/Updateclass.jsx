import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Hooks/Provider/AuthProvider/AuthProvider';

const UpdateClass = () => {
    const authContext = useContext(AuthContext);
    const instructorEmail = authContext.user.email;
    const authToken = authContext.token;
    const id = useParams().id;
    console.log(id)

    const [classData, setClassData] = useState({
        name: '',
        instructor: '',
        instructorEmail: '',
        availableSeats: '',
        price: '',
        status: '',
    });

    useEffect(() => {
        fetch(`http://localhost:5000/newclasses/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setClassData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id, authToken]);


    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedClassData = {
            name: e.target.elements.className.value,
            instructor: e.target.elements.instructorName.value,
            availableSeats: e.target.elements.availableSeats.value,
            price: e.target.elements.price.value,
        };

        fetch(`http://localhost:5000/newclasses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedClassData),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to update class');
                }
            })
            .then((data) => {
                Swal.fire('Success', 'Class updated successfully', 'success');
                setClassData(data);
            })
            .catch((error) => {
                console.error(error);
                Swal.fire('Error', 'Failed to update class', 'error');
            });
    };


    return (
        <div className="bg-slate-200 md:p-8 md:m-8 rounded-lg">
            <h1 className="text-center text-3xl md:text-6xl font-serif font-bold italic text-pink-800 p-8 md:my-8">
                Update Class
            </h1>
            <div className="max-w-screen-lg mx-auto p-4">
                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label htmlFor="className" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Class Name
                        </label>
                        <input
                            type="text"
                            id="className"
                            defaultValue={classData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="instructorName" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            defaultValue={classData.instructor}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="instructorEmail" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Instructor Email
                        </label>
                        <input
                            type="email"
                            id="instructorEmail"
                            defaultValue={classData.instructorEmail}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="availableSeats" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Available Seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            defaultValue={classData.availableSeats}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            defaultValue={classData.price}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="btn bg-pink-800 hover:bg-pink-900 text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;
