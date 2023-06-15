import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Hooks/Provider/AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        passwordLength: false,
        capitalLetter: false,
        specialCharacter: false,
        emptyFields: false,
    });
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!validateFields(email, password)) {
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                updateUserData(user, name, photoUrl)
                    .then(() => {
                        const saveUser = { name: name, email: email };
                        fetch('https://ms-music-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(saveUser),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfully Signed Up',
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown',
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp',
                                    },
                                });
                                console.log(data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .then(() => {
                        navigate('/'); // Navigate to the home page
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);

                const saveUser = { name: user.displayName, email: user.email };
                fetch('https://ms-music-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(saveUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Signed Up',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown',
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp',
                            },
                        });
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                navigate('/'); // Navigate to the home page
            })
            .catch((error) => console.log(error));
    };

    const updateUserData = (user, name, photoUrl) => {
        return updateProfile(user, { displayName: name, photoURL: photoUrl });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateFields = (email, password) => {
        let isValid = true;
        const updatedErrors = {
            passwordLength: false,
            capitalLetter: false,
            specialCharacter: false,
            emptyFields: false,
        };

        if (email.trim() === '' || password.trim() === '') {
            updatedErrors.emptyFields = true;
            isValid = false;
        }

        if (password.length < 6) {
            updatedErrors.passwordLength = true;
            isValid = false;
        }

        if (!/[A-Z]/.test(password)) {
            updatedErrors.capitalLetter = true;
            isValid = false;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            updatedErrors.specialCharacter = true;
            isValid = false;
        }

        setErrors(updatedErrors);
        return isValid;
    };

    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url('https://m.media-amazon.com/images/I/71uGAyJ2aAL.jpg')` }}>
            <Helmet>
                <title>MS Music | SignUp</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="w-1/2">
                    <h6 className="sm:text-xl md:text-4xl text-white font-bold font-serif italic pt-4 items-center ml-4">
                        Sir, Insert Your Email & Password Correctly!
                    </h6>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl text-center font-bold italic font-serif">Sign Up now!</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name="photoUrl" placeholder="photoUrl" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex gap-4 justify-start items-center w-full">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="password"
                                        className={`input input-bordered pr-10 ${errors.passwordLength || errors.capitalLetter || errors.specialCharacter ? 'input-error' : ''
                                            }`}
                                    />
                                    <span className="icon icon-xs cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </span>
                                </div>
                                {errors.passwordLength && <p className="text-xs text-red-500">Password should be at least 6 characters long.</p>}
                                {errors.capitalLetter && <p className="text-xs text-red-500">Password should contain at least one capital letter.</p>}
                                {errors.specialCharacter && (
                                    <p className="text-xs text-red-500">Password should contain at least one special character (!@#$%^&*).</p>
                                )}
                            </div>
                            {errors.emptyFields && <p className="text-xs text-red-500">Email and password fields cannot be empty.</p>}
                            <div className="form control mt-6">
                                <input className="btn btn-block btn-primary bg-[#0e6969] hover:bg-[#074646]" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <button className="btn btn-secondary bg-[#0e6969] hover:bg-[#074646]" onClick={handleGoogleLogin}>
                            SignUp with Gmail
                        </button>
                        <p className="text-center">
                            Already Have an Account? Please{' '}
                            <Link className="text-[#0e6969] hover:text-[#074646] font-bold" to={'/login'}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
