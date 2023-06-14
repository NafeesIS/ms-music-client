import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Hooks/Provider/AuthProvider/AuthProvider";

const SelectedClasses = () => {
    const [selectedClassItems, setSelectedClassItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access-token');
                const response = await fetch(`https://ms-music-server.vercel.app/selected_classes?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setSelectedClassItems(data);
            } catch (error) {
                console.log('Error fetching selected classes:', error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const handleRemoveClass = (classItem) => {
        Swal.fire({
            title: 'Are You Sure!',
            text: "you won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://ms-music-server.vercel.app/selected_classes/${classItem._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                    },
                })
                    .then(res => {
                        if (res.ok) {
                            setSelectedClassItems(prevSelectedItems => prevSelectedItems.filter(item => item._id !== classItem._id));
                            console.log(`Removed class with id ${classItem._id}`);
                            Swal.fire({
                                title: 'Remove!',
                                text: 'Removed Successfully!',
                                icon: 'delete',
                                confirmButtonText: 'Cool'
                            });
                        } else {
                            console.error(`Error removing class with id ${classItem._id}`);
                        }
                    })
                    .catch(error => {
                        console.error('Error removing class:', error);
                    });
            }
        });
    };

    return (
        <div>
            <div className="text-4xl font-serif font-bold text-center m-14">
                Selected Classes
            </div>
            {selectedClassItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 justify-center items-center">
                    {selectedClassItems.map((classItem) => (
                        <div key={classItem._id}>
                            <div className="card mx-auto bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={classItem.image}
                                        alt="img"
                                        className="rounded-xl h-40 md:h-56 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{classItem.name}</h2>
                                    <p>
                                        <span className="font-semibold m-1">Instructor Name:</span>
                                        {classItem.instructor}
                                    </p>
                                    <p>
                                        <span className="font-semibold m-1">Available Seats:</span>
                                        {classItem.availableSeats}
                                    </p>
                                    <p>
                                        <span className="font-semibold m-1">Price:</span>
                                        {classItem.price}
                                    </p>
                                    <div className="card-actions">
                                        <button
                                            className="btn btn-primary bg-red-700"
                                            onClick={() => handleRemoveClass(classItem)}
                                        >
                                            Remove
                                        </button>
                                        <Link to={'/dashboard/payment'}>
                                            <button
                                                className="btn btn-primary bg-green-700"
                                            >
                                                Payment
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-16">
                    <p>No classes selected.</p>
                    <Link to="/classes" className="btn btn-primary mt-4">
                        Browse Classes
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SelectedClasses;
