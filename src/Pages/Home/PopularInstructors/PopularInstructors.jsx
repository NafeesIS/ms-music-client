import React, { useEffect, useState } from "react";

const PopularInstructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        // Fetch latest instructor data from the API
        fetch("http://localhost:5000/instructors")
            .then((res) => res.json())
            .then((data) => {
                // Sort instructors based on the number of classes taken in descending order
                const sortedInstructors = data.sort(
                    (a, b) => b.classesTaken - a.classesTaken
                );
                // Set instructors to the top 6 instructors
                setInstructors(sortedInstructors.slice(0, 6));
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <div>
                <div className="text-6xl font-serif font-bold text-center m-14">
                    All Music Instructors
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 justify-center items-center">
                    {instructors.map((instructor) => (
                        <div key={instructor._id}>
                            <div className="card mx-auto bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={instructor.image}
                                        alt="img"
                                        className="rounded-xl h-72 md:h-80 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{instructor.name}</h2>
                                    <p>
                                        <span className="font-semibold m-1">Email:</span>
                                        {instructor.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold m-1">Classes Taken:</span>
                                        {instructor.classesTaken}
                                    </p>

                                    <div className="card-actions">
                                        <button className="btn btn-primary bg-[#0e6969]">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularInstructors;
