import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imagexe from '../Assets/marcel-strauss-NgfXZ7JYodE-unsplash.jpg'
import { useAuth } from './Context/UserContext'
import { useNavigate } from 'react-router-dom';

const Explore = ({ myFlights, setMyFlights }) => {

    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [departureTime, setDepartureTime] = useState('any');
    const [cities, setCities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [flights, setFlights] = useState([]);
    const { user, logout } = useAuth();
    useEffect(() => {
        // Fetch cities data from an API or use a predefined list
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:4000/cities');
                const cities = response.data.cities;
                let citiArr = [];
                for (let i = 0; i < cities.length; i++) {
                    citiArr.push(cities[i].city);
                }
                setCities(citiArr);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        console.log(user);

        fetchCities();
    }, []);

    const [st, setSt] = useState("");

    const handleCityChange = (e, setCity) => {
        const value = e.target.value;
        const name = e.target.name
        setSt(name);
        setCity(value);
        setSuggestions(cities.filter(city => city.toString().toLowerCase().includes(value.toString().toLowerCase())));
    };



    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/flights/search`, {
                params: {
                    from: fromCity,
                    to: toCity,
                    time: departureTime,
                },
            });
            console.log(response);
            setFlights(response.data.flights);
        } catch (error) {
            console.error('Error searching flights:', error);
        }
    };
    const navigate = useNavigate()

    const [book, setBook] = useState("Book");
    const handleLogout = () => {
        logout();
        navigate('/login');

    }

    const [flag, setFlag] = useState("flag");

    const handleBooking = (e, id, airline, to, from, arrivalTime, departureTime) => {

        e.preventDefault();
        setMyFlights((prev) => {
            let arr = [];
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id !== id || prev[i].airline !== airline) {
                    arr.push({ id: prev[i].id, airline: prev[i].airline, to: prev[i].to, from: prev[i].from, arrivalTime: prev[i].arrivalTime, departureTime: prev[i].departureTime });
                }
            }
            arr.push({ id: id, airline: airline, to: to, from: from, arrivalTime: arrivalTime, departureTime: departureTime });
            return arr;
        });
        setFlag(`${id}+${airline}`);
        console.log(myFlights);
    }
    const handleFlagging = (e, id, airline, to, from, arrivalTime, departureTime) => {
        e.preventDefault();
        setFlag("");
        setMyFlights((prev) => {
            let arr = [];
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id !== id || prev[i].airline !== airline) {
                    arr.push({ id: prev[i].id, airline: prev[i].airline, to: prev[i].to, from: prev[i].from, arrivalTime: prev[i].arrivalTime, departureTime: prev[i].departureTime });
                }
            }
            return arr;
        });
        setFlag("can");
        console.log(myFlights);

    }

    return (
        <>
            <img src={imagexe} className='h-full w-full  top-0 left-0 right-0 bottom-0 p-0 fixed object-cover z-[-2] opacity-90 ' alt="" />
            <div className='min-h-screen  bg-gray-100  '>
                <div className='right-0  text-white p-5 w-[14%]  absolute border-2  bg-slate-700 shadow-lg rounded-lg'>
                    <div className='flex items-center mb-3'>

                        <div className='ml-3 flex flex-col items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" className='w-1/3 h-1/3' viewBox="0 0 256 256" space="preserve">

                                <defs>
                                </defs>
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
                    {/* Add more content or functionality here as needed */}
                </div>
                <div className=" flex flex-col items-center py-12">




                    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-6 text-center">Explore Flights</h1>
                        <div className="mb-4">
                            <label htmlFor="fromCity" className="block text-sm font-medium text-gray-700">From</label>
                            <input
                                id="fromCity"
                                type="text"
                                name="from"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={fromCity}
                                onChange={(e) => handleCityChange(e, setFromCity)}
                                autoComplete="off"
                            />
                            {suggestions.length > 0 && st === "from" && (
                                <ul className="bg-white border border-gray-300 rounded-md shadow-md mt-1 absolute z-10 w-full">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                setFromCity(suggestion);
                                                setSuggestions([]);
                                            }}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="toCity" className="block text-sm font-medium text-gray-700">To</label>
                            <input
                                id="toCity"
                                name="to"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={toCity}
                                onChange={(e) => handleCityChange(e, setToCity)}
                                autoComplete="off"
                            />
                            {suggestions.length > 0 && st === "to" && (
                                <ul className="bg-white border border-gray-300 rounded-md shadow-md mt-1 absolute z-10 w-full">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                setToCity(suggestion);
                                                setSuggestions([]);
                                            }}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Departure Time</label>
                            <input
                                id="departureTime"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Search Flights
                        </button>
                    </div>

                    <div className="mt-8 w-full cursor-default max-w-2xl">
                        {flights.length > 0 && (
                            <div className="bg-white shadow-md  rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Available Flights</h2>
                                <ul>
                                    {flights.map((flight) => (

                                        <p className="text-sm text-gray-600">
                                            {flight.airlines.map((airline) => (
                                                <>
                                                    <li key={`${flight._id}+${airline}`} className=" cursor-default mb-4 border-b border-gray-200 pb-4">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <p className="text-lg font-semibold text-gray-800">
                                                                    {flight.from} - {flight.to}
                                                                </p>
                                                                <p className="text-sm  text-gray-600">
                                                                    Departure Time: {flight.departureTime} | Arrival Time: {flight.arrivalTime}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {airline}
                                                                </p>



                                                                {
                                                                    flag !== `${flight._id}+${airline}` &&
                                                                    <button onClick={(e) => handleBooking(e, flight._id, airline, flight.to, flight.from, flight.arrivalTime, flight.departureTime)} name='Book' className='mt-2 p-2 bg-green-400 font-bold text-white rounded-md border-2 border-green-900 hover:bg-green-600'>Book</button>}
                                                                {flag === `${flight._id}+${airline}` && <button onClick={(e) => handleFlagging(e, flight._id, airline, flight.to, flight.from, flight.arrivalTime, flight.departureTime)} className='mt-2 p-2 bg-red-400 font-bold text-white rounded-md border-2 border-green-900 hover:bg-red-600'>Cancel Booking</button>
                                                                }
                                                            </div >
                                                        </div>
                                                    </li>
                                                </>
                                            ))}
                                        </p>

                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div >

        </>
    )
}

export default Explore