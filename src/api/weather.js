const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(city) {
    const response = await fetch(`${GEO_API_URL}?name=${city}&count=1&language=en&format=json`);
    if (!response.ok) throw new Error('Failed to fetch coordinates');
    const data = await response.json();
    if (!data.results || data.results.length === 0) throw new Error('City not found');
    return data.results[0]; // { latitude, longitude, name, country }
}

export async function getWeather(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return response.json();
}
const REVERSE_GEO_API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export async function getCityName(lat, lon) {
    const response = await fetch(`${REVERSE_GEO_API_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!response.ok) throw new Error('Failed to fetch location name');
    const data = await response.json();
    return {
        name: data.locality || data.city || data.principalSubdivision,
        country: data.countryName
    };
}

export const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light',
    53: 'Drizzle: Moderate',
    55: 'Drizzle: Dense intensity',
    61: 'Rain: Slight',
    63: 'Rain: Moderate',
    65: 'Rain: Heavy intensity',
    71: 'Snow fall: Slight',
    73: 'Snow fall: Moderate',
    75: 'Snow fall: Heavy intensity',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};
