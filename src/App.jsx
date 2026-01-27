import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import IndiaSelector from './components/IndiaSelector';
import { getCoordinates, getWeather } from './api/weather';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const coords = await getCoordinates(city);
            setLocation({ name: coords.name, country: coords.country });
            const data = await getWeather(coords.latitude, coords.longitude);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Default city
        fetchWeather('New York');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Atmosphere</h1>
                    <p className="text-white/80">Premium Weather Forecast</p>
                </header>

                <IndiaSelector onSelect={fetchWeather} />
                <SearchBar onSearch={fetchWeather} />

                {loading && (
                    <div className="text-center text-white text-xl mt-10 animate-pulse">
                        Loading weather data...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-200 bg-red-500/20 p-4 rounded-xl mx-auto max-w-md border border-red-500/30">
                        {error}
                    </div>
                )}

                {!loading && weatherData && location && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <WeatherCard data={weatherData} location={location} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
