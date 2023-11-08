import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaFacebookF } from 'react-icons/fa';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useTitle from "../hooks/useTitle";
import { toast } from "react-toastify";
import Navbar from "../Shared/Navbar";
import loginImg from '../assets/auth.jpg'
import Footer from "../Shared/Footer";

const Login = () => {
    const { login, user, googleLogin, loading, setLoading } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // Set Title
    useTitle('Login')


    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
                
                toast.success('Welcome back, login successful')
                setLoading(false);
            })
            .catch(error => {
                const errorMessage = error.message;
                const myError = errorMessage.slice(22);
                setError(myError.slice(0, -2));
                console.log(error);
                setLoading(false);
            })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                setLoading(false);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }
    const handleOnChange = () =>{
        setError('');
    }

    useEffect(()=>{
        if(user?.accessToken){
            return navigate('/');
        }
    },[user])
    
    return (
        <div>
            <Navbar />
            {/* Login Page Code */}
            <div className="w-full max-w-[1300px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-7 mt-[100px] mb-[70px]">

                {/* Left Side Info*/}
                <div className="w-full flex flex-col items-center justify-center text-center mb-5 md:mb-0">
                    <div className="flex w-full justify-center mb-5 md:mt-[-40px]">
                        <img src={loginImg} className="max-h-[250px]" alt="" />
                    </div>
                    <p className="text-base text-gray-500 font-medium">Toy wonderland awaits! Dive into a world of imagination. Log in now for exclusive deals, interactive games, and endless fun. Join us today!</p>
                </div>

                {/* Right Side Login From */}
                <div className="w-full md:min-w-[350px] lg:min-w-[450px] lg:max-w-[500px] border rounded-lg p-6 py-5 ml-auto">
                    <h1 className="text-xl text-primary mb-3 font-semibold">Login for more experience</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <input name="email" onChange={handleOnChange} className="border font-[500] text-base px-3 py-2 w-full outline-none rounded-md" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="mt-4 mb-2 relative">
                            <input name="password" onChange={handleOnChange} className="border font-[500] text-base px-3 py-2 w-full outline-none rounded-md" type={showPass ? 'text' : 'password'} placeholder="Password" />
                            {
                                showPass ? <div onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer text-error top-[15px] right-2"><FaEye size={18} /></div>
                                    : <div onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer text-error top-[15px] right-2"><FaEyeSlash size={18} /></div>
                            }
                        </div>
                        <p className="underline text-gray-500 text-md">Forget Password</p>
                        <input type="submit" className="mt-5 cursor-pointer btn btn-block bg-primary w-full py-[8px] rounded-full shadow-md hover:shadow-xl text-white text-base font-medium capitalize" value={`${loading ? 'Log in...' : 'Log in'}`} />

                            {/* Error Message */}
                        {
                            error && <div className="alert alert-error p-1 text-[#d34c4c] mt-1">
                            <div className="flex items-center gap-1 rounded-lg text-[14px] font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        </div>
                        }

                        <p className="text-gray-500 text-[14px] text-center font-[400] mt-5 mb-3 capitalize">also login with-</p>

                        {/* Right side Social Media */}
                        <div className="grid grid-flow-col justify-center space-x-2">
                            <Link onClick={handleGoogleLogin} className="w-[35px] h-[35px] flex items-center justify-center transition-all border rounded-full hover:text-primary text-error hover:bg-error border-error">
                                <FaGoogle size={20} />
                            </Link>

                            <Link className="w-[35px] h-[35px] flex items-center justify-center transition-all border rounded-full hover:text-primary text-error hover:bg-error border-error">
                                <FaGithub size={20} />
                            </Link>

                            <Link className="w-[35px] h-[35px] flex items-center justify-center transition-all border rounded-full hover:text-primary text-error hover:bg-error border-error">
                                <FaFacebookF size={20} />
                            </Link>
                        </div>
                    </form>
                    <p className="mt-3 text-center text-gray-500 font-medium">Are you new here ? <Link to='/register' className="underline btn-link font-semibold text-primary">Register</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;