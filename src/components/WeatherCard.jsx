import React from 'react';
import { weatherCodes } from '../api/weather';

function WeatherCard({ data, location }) {
    const { current, daily } = data;
    const temp = Math.round(current.temperature_2m);
    const condition = weatherCodes[current.weather_code] || 'Unknown';
    const minTemp = Math.round(daily.temperature_2m_min[0]);
    const maxTemp = Math.round(daily.temperature_2m_max[0]);

    return (
        <div className="glass rounded-3xl p-8 max-w-md mx-auto text-white">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-1">{location.name}</h2>
                <p className="text-lg opacity-80">{location.country}</p>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-9xl font-thin mb-4 tracking-tighter">
                    {temp}°
                </div>
                <div className="text-2xl font-medium px-4 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                    {condition}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-white/10 rounded-2xl">
                    <p className="opacity-70 text-sm mb-1">Humidity</p>
                    <p className="text-xl font-semibold">{current.relative_humidity_2m}%</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl">
                    <p className="opacity-70 text-sm mb-1">Wind</p>
                    <p className="text-xl font-semibold">{current.wind_speed_10m} km/h</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl">
                    <p className="opacity-70 text-sm mb-1">Low</p>
                    <p className="text-xl font-semibold">{minTemp}°</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl">
                    <p className="opacity-70 text-sm mb-1">High</p>
                    <p className="text-xl font-semibold">{maxTemp}°</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
