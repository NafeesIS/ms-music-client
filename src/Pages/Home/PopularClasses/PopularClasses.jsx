import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Hooks/Provider/AuthProvider/AuthProvider";
import useAdmin from "../../../Hooks/UseAdmin/UseAdmin";
import useInstructor from "../../../Hooks/useInstructor/useInstructor";


const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    useEffect(() => {
        fetch("https://ms-music-server.vercel.app/classes")
            .then((res) => res.json())
            .then((data) => {
                const sortedClasses = data.sort(
                    (a, b) => b.numberOfStudents - a.numberOfStudents
                );
                setPopularClasses(sortedClasses.slice(0, 6));
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="mt-12">
            <div className="text-2xl md:text-6xl font-serif font-bold text-center m-14">
                Our Most Popular Classes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 justify-center items-center">
                {popularClasses.map((popularClass) => (
                    <div key={popularClass._id}>
                        <div className="card mx-auto bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={popularClass.image}
                                    alt="img"
                                    className="rounded-xl h-40 md:h-56 w-full object-cover"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{popularClass.name}</h2>
                                <p>
                                    <span className="font-semibold m-1">Instructor Name:</span>
                                    {popularClass.instructor}
                                </p>
                                <p>
                                    <span className="font-semibold m-1">Number Of Students:</span>
                                    {popularClass.numberOfStudents}
                                </p>
                                <p>
                                    <span className="font-semibold m-1">Available Seats:</span>
                                    {popularClass.availableSeats}
                                </p>
                                <p>
                                    <span className="font-semibold m-1">Price:</span>
                                    {popularClass.price}
                                </p>
                                <Link to={'/classes'}>
                                    <button
                                        className="btn btn-primary bg-[#0e6969]"
                                    >
                                        Check All Classes
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
