import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import IndiaSelector from './components/IndiaSelector';
import CloudBackground from './components/CloudBackground';
import LocationButton from './components/LocationButton';
import { getCoordinates, getWeather, getCityName } from './api/weather';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (cityOrCoords) => {
        setLoading(true);
        setError(null);
        try {
            let lat, lon, name, country;

            if (typeof cityOrCoords === 'string') {
                const coords = await getCoordinates(cityOrCoords);
                lat = coords.latitude;
                lon = coords.longitude;
                name = coords.name;
                country = coords.country;
            } else {
                lat = cityOrCoords.lat;
                lon = cityOrCoords.lon;
                try {
                    const locationData = await getCityName(lat, lon);
                    name = locationData.name;
                    country = locationData.country;
                } catch (e) {
                    name = "Current Location";
                    country = "GPS";
                }
            }

            setLocation({ name, country });
            const data = await getWeather(lat, lon);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (err) => {
                setError("Failed to get location: " + err.message);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        // Default city
        fetchWeather('New York');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <CloudBackground />
            <div className="w-full max-w-4xl z-10">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Atmosphere</h1>
                    <p className="text-white/80">Premium Weather Forecast</p>
                </header>

                <IndiaSelector onSelect={fetchWeather} />
                <div className="flex justify-center items-start mb-8 gap-2">
                    <div className="flex-1 max-w-md">
                        <SearchBar onSearch={fetchWeather} />
                    </div>
                    <LocationButton onLocationSelect={handleCurrentLocation} loading={loading} />
                </div>

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
