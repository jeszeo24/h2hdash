import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import CityField from "./components/CityField";
import TimeZone from "./components/TimeZone";


const API_KEY = "95e5614d843306eba8cca48f943be4f3";
const TIME_API_KEY="b9320ebff64a4f69aa48f65296c8a20a";

export default function App() {
    // cities can be an array (push in here, map it out)
  const [cities, setCities] = useState(["Barcelona", "Boston"]);
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");
  const [compile, setCompile] = useState([]);

 function getCities(city) {
  setCities(cities => [...cities, city])
    // getWeather(cities.map((c) => c));
    // getTime(cities.map((c) => c));

    setCompile(compile => ({
      ...compile,

      city: city,
      time: getTime(city)
      // weather: getWeather(cities.map((c) => c)).weather[0].main,
      // temperature: getWeather(cities.map((c) => c)).main.temp,
      // icon: getWeather(cities.map((c) => c)).weather[0].icon
    
    }));
  }

  console.log(compile);

  // console.log(cities.map(c => c))

  async function getWeather(city) {
    // build URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    // call Open Weather API
    try {
      // Send request to server
      let response = await fetch(url);
      if (response.ok) {
        // wait for data
        let data = await response.json();
        setWeather(data);
      } else {
        // Server error
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      // Server was never reached, network error
      setError(`Network error: ${err.message}`);
    }
  }

  async function getTime(city) {

    // build URL
    let url = `https://timezone.abstractapi.com/v1/current_time/?api_key=${TIME_API_KEY}&location=${city}`;

    // call timezone API
    try {
      // Send request to server
      let response = await fetch(url);
      if (response.ok) {
        // wait for data
        let data = await response.json();
        setTime(data);
      } else {
        // Server error
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      // Server was never reached, network error
      setError(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <p>{console.log(cities)}</p>

       {/* Need to check if weather and time exists/loaded, then only display - if not, will receive error message "Cannot read properties of null as defined in useState*/}
       {weather && <Weather weather={weather} />}
       <CityField
       getCitiesCb={(city) => getCities(city)} 
       getWeatherCb={(city) => getWeather(city)} 
       getTimeCb={(city) => getTime(city)}
       />
       {time && <TimeZone time={time}/>}

    </div>
  );
}

