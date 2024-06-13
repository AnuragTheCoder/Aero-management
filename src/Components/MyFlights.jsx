import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './Context/UserContext';
import imagexe from '../Assets/marcel-strauss-NgfXZ7JYodE-unsplash.jpg';
import { Link, useNavigate } from 'react-router-dom';

const MyFlights = ({ myFlights, setMyFlights }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (delayed && user) {
            const refinedFlights = myFlights.map(({ id, ...rest }) => rest);

            const updateFlights = async () => {
                if (myFlights.length > 0) {
                    try {
                        const response = await axios.put(`http://localhost:4000/updateManyFlights/${user._id}`, {
                            flights: refinedFlights
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        console.log(response.data);
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            };

            const getMyFlights = async () => {

                try {
                    const response = await axios.get(`http://localhost:4000/getManyFlights/${user._id}`);
                    setMyFlights((prev) => [...prev, ...response.data.bookedFlights]);
                    console.log(response.data);
                } catch (err) {
                    console.error(err.message);
                }

            };

            if (myFlights.length > 0) {

                updateFlights();
            }
            else {
                getMyFlights();
            }
        }
    }, [delayed, user, myFlights]);

    const handleRemoveFlight = (index) => {
        const updatedFlights = myFlights.filter((_, i) => i !== index);
        setMyFlights(updatedFlights);

        const refinedFlights = updatedFlights.map(({ id, ...rest }) => rest);
        const updateFlights = async () => {
            try {
                const response = await axios.put(`http://localhost:4000/updateManyFlights/${user._id}`, {
                    flights: refinedFlights
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        updateFlights();
    };



    return (
        <><img src={imagexe} className='h-full w-full  top-0 left-0 right-0 bottom-0 p-0 fixed object-cover z-[-2] opacity-90 ' alt="" />
            <div className='min-h-screen  bg-gray-100'>
                <div className='right-0  text-white p-5 w-[14%]  absolute border-2  bg-slate-700 shadow-lg rounded-lg'>
                    <div className='flex items-center mb-3'>
                        <div className='ml-3 flex flex-col items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" className='w-1/3 h-1/3' viewBox="0 0 256 256" space="preserve">
                                <defs></defs>
                                <g className="bg-white stroke-none stroke-width-0 stroke-dasharray-none stroke-linecap-butt stroke-linejoin-miter stroke-miterlimit-10 fill-none fill-rule-nonzero opacity-100"
                                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                    <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z" className=" stroke-none stroke-width-1 stroke-dasharray-none stroke-linecap-butt stroke-linejoin-miter stroke-miterlimit-10 fill-white fill-rule-nonzero opacity-100"
                                        transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                </g>
                            </svg>
                            <p className='text-lg font-semibold text-gray-100'>{user.name}</p>
                            <div className='w-1/2 h-[30px]'>
                                <p className='text-sm text-gray-100  max-w-[200px] truncate text-center'>{user.email}</p>
                            </div>
                            <button onClick={handleLogout} className='p-2 w-1/2 h-1/3 mt-2 text-sm rounded-md bg-red-400 border-4 border-red-700 hover:bg-red-600'>Logout</button>
                            <Link to="/myflights" className='p-2  h-1/3 mt-2 text-sm rounded-md bg-green-400 border-4 border-green-700 hover:bg-green-600'>My Flights</Link>
                        </div>
                    </div>
                </div>
                <div className='p-5'>
                    <h2 className='text-2xl font-bold mb-4'>My Flights</h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {myFlights.map((flight, index) => (
                            <div key={index} className='bg-white p-4 shadow-md rounded-lg'>
                                <p><strong>From:</strong> {flight.from}</p>
                                <p><strong>To:</strong> {flight.to}</p>
                                <p><strong>Departure Time:</strong> {flight.departureTime}</p>
                                <p><strong>Arrival Time:</strong> {flight.arrivalTime}</p>
                                <p><strong>Airline:</strong> {flight.airline}</p>
                                <button
                                    onClick={() => handleRemoveFlight(index)}
                                    className='mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-700'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyFlights;
