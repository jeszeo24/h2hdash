import { Divider } from "@mui/material";
import React from "react";
import "./TimeWeather.css";


function TimeWeather(props) {

  return (
    <div className="TimeWeather">
      TIME WEATHER
      
      <ul className="compile">
          {props.cities2.map((c) => (
              // in order to have unique classes for each list, created className with id in front because CSS does not recognize numbers as classname
              <li key={c.id} className={`id${c.id}`}>
                  <h2>{c.city}</h2>
                  <div className="icon">
                  <img src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} />
                  </div>
                  
                  <div className="weather">
                  {c.weather}{" "}{c.temperature}°C
                  </div>
                  
                  <div className="time">
                  {c.time}
                  </div>
                  
              </li>
          ))}
      </ul>
     
    </div>
  );
}

export default TimeWeather;

// city: city, 
//       weather: weather && weather.weather[0].main,
//       temperature: weather && weather.main.temp,
//       icon: weather && weather.weather[0].icon,
//       time: time && time.datetime,
//     }