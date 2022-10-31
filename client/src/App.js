import React, { useEffect, useState } from "react";
import "./App.css";
import TimeWeatherView from "./views/TimeWeatherView";
import NotesView from "./views/NotesView";
import LuckGameView from "./views/LuckGameView";
// import UploadFile from "./components/UploadFile_Germinal";
import Clock from "react-live-clock";
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';
import PhotoCarouselView from "./views/PhotoCarouselView"

const API_KEY = "95e5614d843306eba8cca48f943be4f3";
const TIME_API_KEY="b9320ebff64a4f69aa48f65296c8a20a";

export default function App() {
  const [cities, setCities] = useState([]);
  const [compile, setCompile] = useState([]);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState([]);
  const [time, setTime] = useState("");
  const [files, setFiles] = useState([]);
  const slides = [
    "https://picsum.photos/id/251/600/267",
    "https://picsum.photos/id/256/600/267",
    "https://picsum.photos/id/264/600/267",
]

  function getCities(city) {
    let newObj = { 
      id: cities.length,
      city: city, 
    }

    setCities(cities => [...cities, newObj]);
    getCompile(city);
  }

 async function getCompile(city) {

  let myWeather = await getWeather(city);
  let myTime = await getTime(city);

    let newObj = { 
      id: cities.length,
      city: city, 
      weather: myWeather.weather[0].main,
      temperature: myWeather.main.temp,
      feelslike: myWeather.main.feels_like,
      mintemp: myWeather.main.temp_min,
      maxtemp: myWeather.main.temp_max,
      icon: myWeather.weather[0].icon,
      time: myTime.datetime,
      timezone: myTime.timezone_location,
      timezone_abbreviation: myTime.timezone_abbreviation,
      offset: myTime.gmt_offset
    }
  
    setCompile(compile => [...compile, newObj]);
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
        // NOTE: Instead of setting state (because setting state is asynchronous), instead just return the data
        // setWeather(data);
        return data;
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
        // NOTE: Instead of setting state (because setting state is asynchronous), instead just return the data
        // setTime(data);
        return data;
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
  }, []); // if nothing in brackets, call when page loads

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
    input = {
      text: input
    }
    // NOTE: Insert date as below
    input.date = new Date;
    console.log(input);

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

  useEffect(() => {
    getFiles();
}, []);

async function getFiles() {
    try {
        let response = await fetch('/files');
        if (response.ok) {
            let data = await response.json();
            setFiles(data);
        } else {
            console.log(`Server error: ${response.status}: ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Network error: ${err.message}`);
    }
}

async function uploadFile(formData) {
    let options = {
        method: 'POST',
        body: formData
    };

    try {
        let response = await fetch('/files', options);
        if (response.ok) {
            // Server responds with updated array of files
            let data = await response.json();
            setFiles(data);
        } else {
            console.log(`Server error: ${response.status}: ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Network error: ${err.message}`);
    }
}

  return (
    <div className="App">
      <div className="gridsection">
       {/* Need to check if weather and time exists/loaded, then only display - if not, will receive error message "Cannot read properties of null as defined in useState*/}
       <div className="timeweather">
       <TimeWeatherView
       // For TimeWeather component
       cities={cities} 
       compile={compile}
       time={time}
       // For CityField component
       getCitiesCb={(city) => getCities(city)} 
       />
       </div>
      </div>

      <div className="gridsection">
       <NotesView 
       addNoteCb={addNote} // send NotesView addNoteCb
       notes={notes}
       deleteCb={deleteNote}
        />
        </div>

        <div className="gridsection">
        <PhotoCarouselView 
        slides={slides}
        interval={5000}
        indicators
        controls
        autoPlay={true}
        width="600px"/>
  
        </div>

        <div className="gridsection">
        <LuckGameView />
        </div>


            <UploadForm uploadCb={fd => uploadFile(fd)} />

            <FileList files={files} />
        
    </div>
  );
}

