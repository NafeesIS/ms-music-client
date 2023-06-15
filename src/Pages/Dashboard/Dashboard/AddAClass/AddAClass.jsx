import { useState, useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Hooks/Provider/AuthProvider/AuthProvider';
// import UseDocumentTitle from '../UseDocumentTitle/UseDocumentTile';

const AddAClass = () => {
    // UseDocumentTitle('Class Store | AddAClass');
    const authContext = useContext(AuthContext);
    const instructor = authContext.user.displayName;
    const instructorEmail = authContext.user.email;
    const authToken = authContext.token;

    const [name, setClassName] = useState('');
    const [image, setimage] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClass = {
            name,
            image,
            instructor,
            instructorEmail,
            availableSeats,
            price,
            status: 'pending',
            feedback: 'N/A'
        };

        // Handle form submission here
        fetch('https://ms-music-server.vercel.app/newclasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(newClass),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class Added Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    }).then(() => {
                        setClassName('');
                        setimage('');
                        setAvailableSeats('');
                        setPrice('');
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while adding the class',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            });
    };

    return (
        <div className='bg-slate-200 md:p-8 md:m-8 rounded-lg'>
            <h1 className='text-center text-2xl md:text-5xl font-serif font-bold italic text-pink-800 p-8 md:my-8'>Add a Class</h1>
            <div className="max-w-screen-lg mx-auto p-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label htmlFor="className" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Class Name
                        </label>
                        <input
                            type="text"
                            id="className"
                            value={name}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="image" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Class Image
                        </label>
                        <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setimage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="instructor" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            id="instructor"
                            value={instructor}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="instructorEmail" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Instructor Email
                        </label>
                        <input
                            type="email"
                            id="instructorEmail"
                            value={instructorEmail}
                            readOnly
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
                            value={availableSeats}
                            onChange={(e) => setAvailableSeats(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block md:text-2xl font-serif font-bold italic text-pink-800 my-2">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="btn btn-block bg-pink-800 hover:bg-pink-900 text-white px-4 py-2 rounded-md"
                        >
                            Add Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAClass;
