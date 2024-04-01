// Weather.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className='weather'>
        <div className='search'>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
      <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weatherData && (
         <div className="container">
         <div className="top">
           <div className="location">
             <p>{weatherData.name}</p>
           </div>
           <div className="temp">
             {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°F</h1> : null}
           </div>
           <div className="description">
             {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
           </div>
         </div>
 
         {weatherData.name !== undefined &&
           <div className="bottom">
             <div className="feels">
               {weatherData.main ? <p className='bold'>{weatherData.main.feels_like.toFixed()}°F</p> : null}
               <p>Feels Like</p>
             </div>
             <div className="humidity">
               {weatherData.main ? <p className='bold'>{weatherData.main.humidity}%</p> : null}
               <p>Humidity</p>
             </div>
             <div className="wind">
               {weatherData.wind ? <p className='bold'>{weatherData.wind.speed.toFixed()} MPH</p> : null}
               <p>Wind Speed</p>
             </div>
           </div>
         }
 
 
 
       </div>
      )}
    </div>
  );

  
};

export default Weather;
