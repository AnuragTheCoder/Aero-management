import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/UserContext';
import imgs from "../../Assets/marcel-strauss-NgfXZ7JYodE-unsplash.jpg";

const AdminPanel = () => {
    const [isFlag, setFlag] = useState("lol");
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [flaggedFlight, setFlaggedFlight] = useState("");
    const [flightData, setFlightData] = useState({
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        airlines: []
    });

    const [flights, setFlights] = useState([]);
    const [arr, setArr] = useState([]);

    const [indianAirlines, setAirlines] = useState([
        { id: 'airindia', name: 'Air India' },
        { id: 'spicejet', name: 'SpiceJet' },
        { id: 'indigo', name: 'IndiGo' },
        { id: 'goair', name: 'GoAir' },
        { id: 'vistara', name: 'Vistara' },
        { id: 'airasia', name: 'AirAsia India' },
        { id: 'aircosta', name: 'Air Costa' },
        { id: 'trujet', name: 'TruJet' },
        { id: 'starair', name: 'Star Air' },
        { id: 'allianceair', name: 'Alliance Air' },
        { id: 'kingfisher', name: 'King Fisher' }
    ]);

    const [internationalAirlines, setInternationalAirlines] = useState([
        { id: 'emirates', name: 'Emirates' },
        { id: 'qatarairways', name: 'Qatar Airways' },
        { id: 'singaporeairlines', name: 'Singapore Airlines' },
        { id: 'britishairways', name: 'British Airways' },
        { id: 'lufthansa', name: 'Lufthansa' }
    ]);

    useEffect(() => {
        if (user.email !== "anurag" && user.password !== "anurag") {
            navigate('/login')
        }
        fetchFlights();
    }, []);

    const updateInternationalAirlines = (newAirlines) => {
        const existingAirlineNames = [
            ...internationalAirlines.map(airline => airline.name),
            ...indianAirlines.map(airline => airline.name)
        ];
        const airlinesToAdd = newAirlines.filter(airline => !existingAirlineNames.includes(airline));
        if (airlinesToAdd.length > 0) {
            setInternationalAirlines([...internationalAirlines, ...airlinesToAdd.map(name => ({ id: name.toLowerCase().replace(/\s+/g, ''), name }))]);
        }
    };

    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:4000/flights');
            setFlights(response.data.flights);
        } catch (error) {
            console.error('Error fetching flights:', error);
            alert('Failed to fetch flights');
        }
    };

    const [checkedAirlines, setCheckedAirlines] = useState([]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'airlines') {
            if (checked) {
                setArr(prevArr => [...prevArr, value]);
                setCheckedAirlines(prevChecked => [...prevChecked, value]);
            } else {
                setArr(prevArr => prevArr.filter((airline) => airline !== value));
                setCheckedAirlines(prevChecked => prevChecked.filter((airline) => airline !== value));
            }
            setFlightData(prevData => ({ ...prevData, airlines: checked ? [...prevData.airlines, value] : prevData.airlines.filter((airline) => airline !== value) }));
        } else {
            setFlightData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/flights', flightData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Flight added successfully:', response.data);
            fetchFlights(); // Refresh flights list
            setFlightData({
                from: '',
                to: '',
                departureTime: '',
                arrivalTime: '',
                airlines: []
            });
            setArr([]); // Clear the selected airlines array
            setCheckedAirlines([]); // Clear checked airlines state
            alert('Flight added successfully!');
        } catch (error) {
            console.error('Error adding flight:', error);
            alert('Failed to add flight');
        }
    };

    const handleUpdate = async (e, flaggedFlight) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/flights/${flaggedFlight}`, flightData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFlaggedFlight("");
            console.log('Flight updated successfully:', response.data);
            fetchFlights(); // Refresh flights list
            setFlightData({
                from: '',
                to: '',
                departureTime: '',
                arrivalTime: '',
                airlines: []
            });
            setArr([]); // Clear the selected airlines array
            setCheckedAirlines([]); // Clear checked airlines state
            setFlag("lol")
            alert('Flight updated successfully!');
        } catch (error) {
            console.error('Error updating flight:', error);
            alert('Failed to update flight');
        }
    };

    const handleFlag = async (flightId) => {
        try {
            const { data } = await axios.get(`http://localhost:4000/flights/${flightId}`);
            const { from, to, arrivalTime, departureTime, airlines } = data.flights;

            setFlightData({ ...flightData, from, to, arrivalTime, departureTime, airlines });
            updateInternationalAirlines(airlines);
            setCheckedAirlines(airlines);
            setArr(airlines);
            setFlaggedFlight(flightId);
            setFlag(flightId);
        } catch (error) {
            console.error('Error updating flight:', error);
            alert('Failed to fetch flight');
        }
    };





    const handleSetFlag = () => {
        setFlightData({ from: '', to: '', arrivalTime: '', departureTime: '', airlines: [] });
        setCheckedAirlines([]);
        setArr([]);
        setFlag("lol");
    }

    const handleDelete = async (flightId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/flights/${flightId}`);
            console.log('Flight deleted successfully:', response.data);
            fetchFlights(); // Refresh flights list
            alert('Flight deleted successfully!');
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Failed to delete flight');
        }
    };

    const [one, setOne] = useState(false);

    return (
        <>
            <img src={imgs} className='h-full w-full  top-0 left-0 right-0 bottom-0 p-0 fixed object-cover z-[-2] opacity-90 ' alt="" />

            <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-white">Add Flight</h2>
                </div>
                <div className="mt-8 sm:mx-auto  w-1/2 ">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                                    From
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="from"
                                        name="from"
                                        type="text"
                                        autoComplete="from"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={flightData.from}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                                    To
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="to"
                                        name="to"
                                        type="text"
                                        autoComplete="to"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={flightData.to}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>                          <div>
                                <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
                                    Departure Time
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="departureTime"
                                        name="departureTime"
                                        type="string"
                                        autoComplete="departure-time"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={flightData.departureTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">
                                    Arrival Time
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="arrivalTime"
                                        name="arrivalTime"
                                        type="string"
                                        autoComplete="arrival-time"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={flightData.arrivalTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Airlines
                                </label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {indianAirlines.map((airline) => (
                                        <div key={airline.id} className="flex items-center">
                                            <input
                                                id={airline.id}
                                                name="airlines"
                                                type="checkbox"
                                                value={airline.name}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                checked={checkedAirlines.includes(airline.name)}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={airline.id} className="ml-2 block text-sm text-gray-900">
                                                {airline.name}
                                            </label>
                                        </div>
                                    ))}
                                    {internationalAirlines.map((airline) => (
                                        <div key={airline.id} className="flex items-center">
                                            <input
                                                id={airline.id}
                                                name="airlines"
                                                type="checkbox"
                                                value={airline.name}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                checked={checkedAirlines.includes(airline.name)}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={airline.id} className="ml-2 block text-sm text-gray-900">
                                                {airline.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                {isFlag !== "lol" ?
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={(e) => handleUpdate(e, flaggedFlight)}
                                    >
                                        Update Flight
                                    </button> :
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleSubmit}
                                    >
                                        Add Flight
                                    </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="py-10 h-screen overflow-auto scroll-m-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Flights</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className='flex flex-col items-center justify-center '>
                                    {flights.map((flight) => (
                                        <div key={flight._id} className="bg-gray-50 mt-3 flex flex-col items-center justify-between px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 border-2 border-red-700 sm:px-6">
                                            <div className="text-sm font-medium text-gray-500">{`${flight.from} to ${flight.to}`}</div>
                                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {`Departure: ${flight.departureTime}, Arrival: ${flight.arrivalTime}`}
                                            </div>
                                            <div className='flex items-center justify-between mb-10 '>
                                                {flight.airlines.map((air) => (<div className='h-[90px] text-center bg-black text-white bg-opacity-85 shadow-gray-400 shadow-sm font-bold w-[120px] text-sm border-red-100 border-2 mb-10 rounded-md mx-4 p-4' key={air}>{air}</div>))}
                                            </div>
                                            <div className="flex gap-2 mt-10">
                                                {isFlag === "lol" && one == false && <button
                                                    className="w-full h-[40px] mt-9 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => handleFlag(flight._id)}
                                                >
                                                    Update
                                                </button>}

                                                {isFlag === flight._id && <button
                                                    className="w-full h-[40px] mt-9 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={handleSetFlag}
                                                >
                                                    Flagged for updation Click to unflag
                                                </button>}

                                                <button
                                                    className="w-full h-[40px] mt-9 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => handleDelete(flight._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;

