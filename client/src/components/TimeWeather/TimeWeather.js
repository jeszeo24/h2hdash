// NOTE: Reference time conversion from https://bobbyhadz.com/blog/javascript-convert-date-to-timezone
// NOTE: Reference useCallback from https://www.youtube.com/watch?v=_AyFP5s69N4&ab_channel=WebDevSimplified
import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./TimeWeather.css";

function TimeWeather(props) {
  // NOTE: props.compile is an object received from TimeWeatherView, props.index is a unique number to each object
  let c = props.compile[props.index];
  
  const [dateTime, setDateTime] = useState(new Date());

  // useCallback (from reactjs.org) Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).
  const getDateTime = useCallback(() => { // difference between useCallback and useMemo is that useCallback returns the actual function and not just the value of said function, which allows us to use the function later within the app (and pass parameters)
    if (c?.timezone) { // breaks if use useMemo, maybe because c.timezone is delayed (from call to API) so no immediate value being passed
      const date = new Date();
      const dt = date.toLocaleString("en-US", {
        timeZone: c.timezone,
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
  }, [c?.timezone]); // array of dependencies 

  useEffect(() => {
    getDateTime();
  }, [getDateTime]); // useCallback when there are referential equality problems (when using other hooks such as useEffect/useMemo), when need to have the value inside the dependencies array

  useEffect(() => {
    const timerId = setInterval(() => getDateTime(), 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [getDateTime]);
  
  return (
    <div className="TimeWeather">
      <table className="compile">
        {/* // in order to have unique classes for each list, created className with id in front because CSS does not recognize numbers as classname */}
        {/* NOTE: Having the list in an if statement because prob due to asynchronous nature, may not load */}
        {c ? (
          <td key={c.id} className={`id${c.id}`}>
            <h2 className="city">{c.city}</h2>
         
            <div className="time">
              {/* {c.time} */}
              {dateTime.toString()}
            </div>

            {/* <h4>{c.timezone}</h4> */}

            <div className="icon">
              <img src={`http://openweathermap.org/img/wn/${c.icon}@2x.png`} />
            </div>

            <div className="weather">
              {c.weather}
            </div>

            <div className="temperature">
              {c.temperature}°C
            </div>

            <div className="mintemp">
              Min temp {c.mintemp}°C
            </div>

            <div className="maxtemp">
              Max temp {c.maxtemp}°C
            </div>

            
          </td>
        ) : null}
      </table>
    </div>
  );
}

export default TimeWeather;

// const [newtime, setNewTime] = useState("");
  // const [oldtime, setOldTime] = useState("");
  // const [dateState, setDateState] = useState(new Date());
  // NOTE: toLocaleString: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

// useEffect(() => {
  //   const offset = c?.offset;

  //   if (Number.isInteger(offset)) {
  //     const newDate = new Date(new Date().getTime() + offset * 3600 * 1000) //getTime() calculates number of years since Jan 1, 1970?
  //       .toUTCString() //converts a date to a string, interpreting in UTC time zone
  //       .replace(/ GMT$/, "");
  //     setDateTime(newDate);
  //     console.log(dateTime)

  //     setInterval(() => setDateState(dateTime, 30000));
  //     console.log(dateState);
  //   }
  // }, [c?.offset]);

  // useEffect(() => {
  //   setInterval(() => setDateState(dateTime, 30000));
  // }, [c?.offset]);

  // function refreshTime() {
  //   if (c) {
  //     console.log(c.time);
  //     let updatedT = c.time.slice(11); // no longer date object
  //     setOldTime(updatedT); // set time?
  //     console.log("this is the time from compile", updatedT);
  //   }
  //   newTime();
  // }

  // NOTE: useEffect to call refreshTime when props is changed/passed?
  // useEffect(() => {
  //   refreshTime();
  // }, [c]);

  // NOTE: Unable to continue increasing time because state remains the same
  // function newTime() {
  //   console.log(oldtime);
  //   let hour = oldtime.slice(0, 2);
  //   let minute = oldtime.slice(3, 5);

    // QUESTION: How do I add 0 to the front of a single digit?
    // if (minute < 10) {
    //   minute++;
    //   return "0" + minute;
    // }

    // if (minute < 60) {
    //   minute++;
    // }

    //  if (hour < 24 && minute === 59) {
    //    hour++;
    //  }

    //  if (hour === 24) {
    //    hour = 0;
    //  }

    //  console.log("hour", hour);
    //  console.log("min", minute);

    // setNewTime([hour, ":", minute]);

    //NOTE: Below NOT working because oldtime state is always updated by the time passed by parent prop
    //So the minute only changes in the first instance
  //   setOldTime(`${hour}:${minute}`);
  //   console.log("this is the new time", newtime);
  //   return newTime;
  // }

  // const MINUTE_MS = 60000;

  // NOTE: TEMPORARILY COMMENTED OUT/UNCOMMENT TO SEE REFRESH EVERY MINUTE
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     newTime();
  //   }, [MINUTE_MS]);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);

  // console.log(newtime);

  // REFERENCE:
  //  useEffect(() => {
  //   setInterval(refreshTime(), 60000);
  // }, [])