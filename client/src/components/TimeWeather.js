import React, { useState, useEffect } from "react";
import "./TimeWeather.css";
import Clock from "react-live-clock";

// just display one city (instead of rendering all cities)
// pass the time at which API responded, timer needs a starting point

function TimeWeather(props) {
  // NOTE: props.compile is an object, props.counter in unique number to each object
  let c = props.compile[props.index];
  let t = props.time[props.index];
  const [newtime, setNewTime] = useState("");
  const [oldtime, setOldTime] = useState("");

 function refreshTime(){
   if (c) {
   let updatedT = c.time.slice(11) // no longer date object
   setNewTime(updatedT); // set time?
   console.log("this is the time from compile", updatedT)

   let hour = updatedT.slice(0,2);
   let minute = updatedT.slice(3,5);
   let second = updatedT.slice(6)

  //  if (second <= 60) {
  //    second++
  //  }

  //  if (second === 60 && minute < 60) {
  //    minute++
  //  }

  if (minute < 10) {
    minute++;
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
  }
}

  const MINUTE_MS = 60000;
  const SECONDS_MS = 1000;

  //  useEffect(() => {
  //   setInterval(refreshTime(), 60000); 
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTime();
    }, [MINUTE_MS]);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  console.log(newtime);

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
                
                  <div>
                  New time{newtime}
                  </div>
                  
                  <div>
                    <Clock />
                  </div>
                  </div>
                  
              </li> : null}
      </ul>
    
      
      {/* <ul className="compile">
          {props.compile.map((c) => (
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
      </ul> */}
     
    </div>
  )
}

export default TimeWeather;
