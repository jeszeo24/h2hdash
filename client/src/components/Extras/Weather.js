import React from "react";
import "./Weather.css";

function Weather(props) {
  // received weather props from parent App
  let w = props.weather;

  return (
    <div className="Weather">
      <h2>
        Current Weather in {w.name}, {w.sys.country}{" "}
      </h2>
      <p>
        {w.main.temp} °C, {w.weather[0].main}{" "} 
      </p>
      <div className="icon">
      {w.weather[0].icon}
      </div>
    </div>
  );
}

export default Weather;