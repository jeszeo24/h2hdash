import React, { useState, useEffect, useCallback } from "react";
import "./TimeWeather.css";

// just display one city (instead of rendering all cities)
// pass the time at which API responded, timer needs a starting point

function TimeWeather(props) {
  // NOTE: props.compile is an object received from TimeWeatherView, props.index is a unique number to each object
  let c = {
    requested_location: "Oxford, United Kingdom",
    longitude: -1.257677,
    latitude: 51.752022,
    datetime: "2020-07-01 14:22:13",
    timezone_name: "British Summer Time",
    timezone_abbreviation: "GMT",
    offset: "+1",
    is_dst: true,
  };

  const [dateTime, setDateTime] = useState(new Date());

  const getDateTime = useCallback(() => {
    if (c.timezone_abbreviation) {
      const date = new Date();
      const dt = date.toLocaleString("en-US", {
        timeZone: c.timezone_abbreviation,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      setDateTime(dt);
    }
  }, [c.timezone_abbreviation]);

  useEffect(() => {
    getDateTime();
  }, [getDateTime]);

  useEffect(() => {
    const timerId = setInterval(() => getDateTime(), 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [getDateTime]);

  return (
    <div className="TimeWeather">
      <ul className="compile">
        {/* // in order to have unique classes for each list, created className with id in front because CSS does not recognize numbers as classname */}
        {/* NOTE: Having the list in an if statement because prob due to asynchronous nature, may not load */}
        {c ? (
          <li key={c.id} className={`id${c.id}`}>
            <h2>{c.city}</h2>
            <h3>{c.timezone}</h3>
            <div className="icon">
              <img src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} />
            </div>

            {/* <div className="weather">
              {c.weather} {c.temperature}°C
            </div> */}

            <div className="time">
              {/* {c.time} */}
              {dateTime.toString()}
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default TimeWeather;
