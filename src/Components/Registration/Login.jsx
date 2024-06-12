import React from 'react'
import imagex from "../../Assets/RegisterBg.jpg"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext'
import Cookies from 'js-cookie';
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    // const [check, setCheck] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const obj = await axios.post('http://127.0.0.1:4000/api/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }, {
                withCredentials: true // This is crucial for sending cookies
            })
            Cookies.set("token", obj.data.token);
            console.log(obj.data.user);
            login(obj.data.user);
            toast.success("Login successfully");
            setTimeout(() => {
                if (obj.data.success) {
                    navigate('/explore');
                }

            }, 2000)

        }
        catch (err) {

            toast.error(err.response.data.message || 'Registration failed');
        }




    }




    return (
        <>

            <img src={imagex} className='h-full w-full  top-0 left-0 right-0 bottom-0 p-0 fixed object-cover z-[-2] opacity-90 ' alt="" />
            <ToastContainer position="top-right" style={{ marginTop: "90px" }} autoClose={3000} hideProgressBar={false} />
            <div class="font-[sans-serif] mt-12 relative bg-opacity-60 mb-12 text-gray-800 bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
                <div class="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                    <div class="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                        <div>
                            <h4 class="text-white text-lg font-semibold">Login to Your Account</h4>
                            <p class="text-[13px] text-white mt-2">Welcome to our Login page! Get started by Logging in to your account.</p>
                        </div>
                        <div>
                            <h4 class="text-white text-lg font-semibold">Simple & Secure Login</h4>
                            <p class="text-[13px] text-white mt-2">Our Login process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
                        </div>
                    </div>
                    <form class="md:col-span-2 w-full py-6 px-6 sm:px-16">
                        <div class="mb-6">
                            <h3 class="text-2xl font-bold">Create an account</h3>
                        </div>
                        <div class="space-y-5">
                            <div>

                            </div>
                            <div>
                                <label class="text-sm mb-2 block">Email Id</label>
                                <div class="relative flex items-center">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required class="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                            <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label class="text-sm mb-2 block">Password</label>
                                <div class="relative flex items-center">
                                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required class="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <div class="!mt-10">
                            <button type="button" onClick={handleClick} class="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                Login
                            </button>
                        </div>
                        <p class="text-sm mt-6 text-center">Dont have an account? <Link to="/register" class="text-blue-600 font-semibold hover:underline ml-1">Register Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}



export default Login