import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Hooks/Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const authContext = useContext(AuthContext);
    const instructorEmail = authContext.user.email;
    const authToken = authContext.token;

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("https://ms-music-server.vercel.app/newclasses")
            .then((res) => res.json())
            .then((data) => setClasses(data))
            .catch((error) => console.log(error));
    }, []);

    const handleApprove = (classId) => {
        const updatedClasses = classes.map((classItem) => {
            if (classItem._id === classId) {
                return { ...classItem, status: "approved" };
            }
            return classItem;
        });

        fetch(`https://ms-music-server.vercel.app/newclasses/${classId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ status: "approved" }),
        })
            .then((res) => {
                if (res.ok) {
                    setClasses(updatedClasses);
                } else {
                    throw new Error("Failed to update class");
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle error state or display error message
            });
    };
    const handleDeny = (classId) => {
        const updatedClasses = classes.map((classItem) => {
            if (classItem._id === classId) {
                return { ...classItem, status: "Denied" };
            }
            return classItem;
        });

        fetch(`https://ms-music-server.vercel.app/newclasses/${classId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ status: "Denied" }),
        })
            .then((res) => {
                if (res.ok) {
                    setClasses(updatedClasses);
                } else {
                    throw new Error("Failed to update class");
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle error state or display error message
            });
    };

    const handleFeedback = (classId) => {
        Swal.fire({
            title: "Send Feedback",
            input: "text",
            inputLabel: "Feedback",
            inputPlaceholder: "Enter your feedback",
            showCancelButton: true,
            confirmButtonText: "Send",
            cancelButtonText: "Cancel",
            preConfirm: (feedback) => {
                if (!feedback) {
                    Swal.showValidationMessage("Feedback is required");
                } else {
                    return feedback;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedClasses = classes.map((classItem) => {
                    if (classItem._id === classId) {
                        return { ...classItem, feedback: "feedback sent" };
                    }
                    return classItem;
                });

                fetch(`https://ms-music-server.vercel.app/newclasses/${classId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({ feedback: "feedback sent", feedback: result.value }),
                })
                    .then((res) => {
                        if (res.ok) {
                            setClasses(updatedClasses);
                            Swal.fire("Success", "Feedback sent successfully", "success");
                        } else {
                            throw new Error("Failed to update class");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire("Error", "Failed to send feedback", "error");
                    });
            }
        });
    };

    return (
        <div className="items-center justify-center text-center p-6">
            <h2 className="text-4xl font-bold font-serif my-4 text-center">
                Manage Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  justify-center items-center gap-4">
                {classes.map((classItem) => (
                    <div className="card w-96 bg-base-100 shadow-xl" key={classItem._id}>
                        <figure className="px-10 pt-10">
                            <img src={classItem.image} alt="" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title font-serif">{classItem.name}</h2>
                            <h2 className="card-title font-serif">
                                Instructor: {classItem.instructor}
                            </h2>
                            <p>
                                <span className="font-serif font-semibold">
                                    Instructor Email:{" "}
                                </span>
                                {classItem.instructorEmail}
                            </p>
                            <p>
                                <span className="font-serif font-semibold">
                                    Available Seats:{" "}
                                </span>
                                {classItem.availableSeats}
                            </p>
                            <p>
                                <span className="font-serif font-semibold">Price: </span>
                                {classItem.price}
                            </p>
                            <p>
                                <span className="font-serif font-semibold">Status: </span>
                                {classItem.status}
                            </p>
                            <p>
                                <span className="font-serif font-semibold">Feedback: </span>
                                {classItem.feedback}
                            </p>
                            <div className="btn-group">
                                <button
                                    className="btn bg-green-500"
                                    onClick={() => handleApprove(classItem._id)}
                                    disabled={classItem.status === "approved"}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn bg-red-500"
                                    onClick={() => handleDeny(classItem._id)}
                                    disabled={classItem.status === "Denied"}
                                >
                                    Deny
                                </button>
                                <button onClick={() => handleFeedback(classItem._id)} className="btn bg-cyan-700">FeedBack</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageClasses;
