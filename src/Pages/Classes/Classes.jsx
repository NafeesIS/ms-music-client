import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Hooks/Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClassItems, setSelectedClassItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch latest class data from the API
        fetch("http://localhost:5000/classes")
            .then((res) => res.json())
            .then((data) => setClasses(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access-token');
                const response = await fetch(`http://localhost:5000/selected_classes?email=${user.email}`, {
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

    const handleSelectClass = (classItem) => {
        if (user && user.email) {
            // Check if the class item is already selected by the user
            const isClassItemSelected = selectedClassItems.find(
                (item) => item.image === classItem.image && item.email === user.email
            );

            if (isClassItemSelected) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "You have already selected this class!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }

            const selectedItem = {
                image: classItem.image,
                instructor: classItem.instructor,
                availableSeats: classItem.availableSeats,
                price: classItem.price,
                email: user.email,
            };

            fetch("http://localhost:5000/selected_classes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(selectedItem),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        // Update the availableSeats of the selected class locally
                        const updatedClasses = classes.map((c) => {
                            if (c.image === classItem.image) {
                                return { ...c, availableSeats: c.availableSeats - 1 };
                            }
                            return c;
                        });
                        setClasses(updatedClasses);

                        // Update the selected class items for the user
                        setSelectedClassItems([...selectedClassItems, selectedItem]);

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Added To Selected Classes!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        }
    };

    return (
        <div>
            <div className="text-6xl font-serif font-bold text-center m-14 italic">
                All Music Classes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 justify-center items-center">
                {classes.map((classItem) => (
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
                                    {user ? (
                                        <button
                                            className="btn btn-primary bg-[#0e6969]"
                                            onClick={() => handleSelectClass(classItem)}
                                        >
                                            Select
                                        </button>
                                    ) : (
                                        <Link to="/login">
                                            <button className="btn btn-primary bg-[#0e6969]">
                                                Login to Select
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
