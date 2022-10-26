import React, { useEffect, useState } from "react";
import "./App.css";
import CityField from "./components/CityField";
import TimeWeather from "./components/TimeWeather";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";


const API_KEY = "95e5614d843306eba8cca48f943be4f3";
const TIME_API_KEY="b9320ebff64a4f69aa48f65296c8a20a";

// const INIT_OBJ = { 
//   id: 0,
//   city: "", 
//   weather: "",
//   temperature: "",
//   icon: "",
//   time: ""
// }

export default function App() {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");
  const [compile, setCompile] = useState([]);
  const [notes, setNotes] = useState([]);
  const [dates, setDate] = useState("");

 async function getCities(city) {
  setCities(cities => [...cities, city]);
  
  await getTime(city);
  await getWeather(city);

    let newObj = { 
      id: cities.length,
      city: city, 
      weather: weather && weather.weather[0].main,
      temperature: weather && weather.main.temp,
      icon: `icon-${weather && weather.weather[0].icon}`,
      time: time && time.datetime
    }

    // if (cities.length === 0) {
    //   setCompile(compile => newObj = compile);
    // } else {
    setCompile(compile => [...compile, newObj])
    // };
 }
  console.log(compile);
  

  async function getWeather(city) {
    // build URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

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

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  // if nothing in brackets, call when page loads


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

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    try {
        // NOTE: second argument of options not necessary because DEFAULT method is GET
        // only first argument of the link required
      let response = await fetch("/notes");
      if (response.ok) {
        let note = await response.json(); // converts JSON to JavaScript for client/frontend
        setNotes(note);
      } else {
        // server error
        // NOTE: FOR FRONT END, it is console.log NOT res.status/send
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  // POST (add) a new note
  async function addNote(input) {
    // NOTE: how do I pass a new date?
    let date = new Date;
    setDate(date);
    // setDate(dates => [...dates, date]);
    console.log(date);

    // Define fetch() options
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input) // send server JSON
    };

    try {
      let response = await fetch("/notes", options);
      if (response.ok) {
        let note = await response.json(); // converts JSON to JavaScript for client
        setNotes(note);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  // DELETE a note
  async function deleteNote(id) {
    // NOTE: For delete, do NOT need to find task and update state prior to the delete
    // All the information it needs is in the URL (id)

    // Define fetch() options
    let options = {
      method: "DELETE"
    };

    try {
      let response = await fetch(`/notes/${id}`, options);
      if (response.ok) {
        let note = await response.json(); // converts JSON to JavaScript for client
        setNotes(note);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <p>{console.log(cities)}</p>

       {/* Need to check if weather and time exists/loaded, then only display - if not, will receive error message "Cannot read properties of null as defined in useState*/}
       <CityField
       getCitiesCb={(city) => getCities(city)} 
       getWeatherCb={(city) => getWeather(city)} 
       getTimeCb={(city) => getTime(city)}
       />
       {compile && <TimeWeather compile={compile}/> }

       <NotesForm addNoteCb={addNote}/>

       <div>
       <NotesList
       notes={notes}
       deleteCb={deleteNote}
       />
       </div>
       

    </div>
  );
}

