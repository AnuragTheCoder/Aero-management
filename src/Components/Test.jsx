import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [result, setResult] = useState([]);
    const apiKey = 'Wrx9pqjDsfyrUvJF6qbieIkgMMAF7eiq';
    useEffect(() => {
        const getWeather = async () => {
            try {
                const apiUrl = `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/1day/204842?apikey=${apiKey}&details=true`;

                const { data } = await axios.get(apiUrl);

                setResult(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        getWeather();
    }, []);

    return (
        <div>
            <label htmlFor="city">Enter city name</label>
            <input name="city" type="text" />
            <div>
                <h3>Weather Data:</h3>
                {result.DailyForecasts ? (
                    <div>
                        <p>Date: {result.DailyForecasts[0].Date}</p>
                        <p>Temperature: {result.DailyForecasts[0].Temperature.Minimum.Value} - {result.DailyForecasts[0].Temperature.Maximum.Value} {result.DailyForecasts[0].Temperature.Minimum.Unit}</p>
                        <p>Day: {result.DailyForecasts[0].Day.IconPhrase}</p>
                        <p>Night: {result.DailyForecasts[0].Night.IconPhrase}</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default Test;
