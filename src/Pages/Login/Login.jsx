import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Hooks/Provider/AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Logged In!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate('/');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed To Login!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            });
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
                            title: 'Successfully Logged In',
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div
            className="hero min-h-screen bg-base-200"
            style={{
                backgroundImage: `url('https://m.media-amazon.com/images/I/71uGAyJ2aAL.jpg')`,
            }}
        >
            <Helmet>
                <title>MS Music | Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="w-1/2">
                    <h6 className="sm:text-xl md:text-4xl text-white font-bold font-serif italic pt-4 items-center ml-4">
                        Sir, Insert Your Email & Password Correctly!
                    </h6>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl text-center font-bold italic font-serif">Login now!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" />
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
                                        className="input input-bordered pr-10"
                                    />
                                    <span className="icon icon-xs cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <FaRegEyeSlash></FaRegEyeSlash>

                                        ) : (
                                            <FaRegEye></FaRegEye>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary bg-pink-800 hover:bg-pink-950" type="submit" value="Login In" />
                            </div>
                        </form>
                        <button className="btn btn-primary bg-red-500 hover:bg-red-600 mt-4" onClick={handleGoogleLogin}>
                            Login with Gmail
                        </button>
                        <p className="text-center">
                            New to Toy Store?{' '}
                            <Link className="text-pink-800 hover:text-pink-950 font-bold" to={'/signup'}>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
