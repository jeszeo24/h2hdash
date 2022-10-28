import React, { useState, useEffect } from "react";
import "./TimeWeather.css";
import Clock from "react-live-clock";

// just display one city (instead of rendering all cities)
// pass the time at which API responded, timer needs a starting point

function TimeWeather(props) {
  // NOTE: props.compile is an object received from TimeWeatherView, props.index is a unique number to each object
  let c = props.compile[props.index];
  let t = props.time[props.index]; // NOTE: for react-live-clock if it still works?
  const [newtime, setNewTime] = useState("");
  const [oldtime, setOldTime] = useState("");

 function refreshTime(){
   if (c) {
   let updatedT = c.time.slice(11) // no longer date object
   setOldTime(updatedT); // set time?
   console.log("this is the time from compile", updatedT)
  }
  newTime();
}

// NOTE: useEffect to call refreshTime when props is changed/passed?
useEffect(() => {
  refreshTime(); 
}, [c])

function newTime(){
   let hour = oldtime.slice(0,2);
   let minute = oldtime.slice(3,5);
   let second = oldtime.slice(6)

  //  if (second <= 60) {
  //    second++
  //  }

  //  if (second === 60 && minute < 60) {
  //    minute++
  //  }

  // QUESTION: How do I add 0 to the front of a single digit?
  if (minute < 10) {
    minute++;
    return "0" + minute;
  }

  if (minute < 60) {
    minute++;
  }

   if (hour < 24 && minute === 59) {
     hour++;
   }

   if (hour === 24) {
     hour = 0;
   }

   console.log("hour", hour);
   console.log("min", minute);
   console.log("sec", second);

   setNewTime([hour,":",minute])
   console.log("this is the new time", newtime);
   return newTime;
  }

  const MINUTE_MS = 60000;
  const SECONDS_MS = 1000;
  
  useEffect(() => {
    const interval = setInterval(() => {
      newTime();
    }, [MINUTE_MS]);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  console.log(newtime);

  // REFERENCE:
  //  useEffect(() => {
  //   setInterval(refreshTime(), 60000); 
  // }, [])


  return (
    <div className="TimeWeather">
               <ul className="compile">
   
              {/* // in order to have unique classes for each list, created className with id in front because CSS does not recognize numbers as classname */}
              {/* NOTE: Having the list in an if statement because prob due to asynchronous nature, may not load */}
              {c ? <li key={c.id} className={`id${c.id}`}>
                  <h2>{c.city}</h2>
                  <div className="icon">
                  <img src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} />
                  </div>
                  
                  <div className="weather">
                  {c.weather}{" "}{c.temperature}°C
                  </div>
                  
                  <div className="time">
                  {c.time}
                  {c.timezone}
                
                  <div>
                  New time{newtime}
                  {/* NOTE: Breaks everything, invalid hook call? */}
                  {/* <Clock format={'HH:mm:ss'} ticking={true} timezone={c.timezone_location}/> */}
                  </div>
                  
                  </div>
                  
              </li> : null}
      </ul>
     
    </div>
  )
}

export default TimeWeather;
