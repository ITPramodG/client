import React, { useState } from "react";
import "./css/style.css";

const FindCity = () => {
    const [location, setLocation] = useState('Pune');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7722f97765f93442f11832f85257b1b4`
            );
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                setWeather(data);
                setError(null);
            } else {
                throw new Error("Location not found. Please try again.");
            }
        } catch (error) {
            setWeather(null);
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Weather App</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        required
                        type="search"
                        className="form-control"
                        placeholder="Please Enter City Name...."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Get Weather
                </button>
            </form>
            {weather && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h2>
                            {weather.name}, {weather.sys.country}
                        </h2>
                        <h5><b>Temperature:</b> {weather.main.temp}°C</h5>
                        <h5><b>Weather:</b> {weather.weather[0].description}</h5>
                        <h5><b>Humidity: </b>{weather.main.humidity}%</h5>
                        <h5><b>Wind Speed:</b> {weather.wind.speed} m/s</h5>
                    </div>
                </div>
            )}
            {error && <div className="alert alert-danger mt-4">{error}</div>}
        </div>
    );
};

export default FindCity;
