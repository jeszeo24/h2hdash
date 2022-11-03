import React, { useState } from "react";
<<<<<<< HEAD:client/src/components/CityField.js
import { MdSearch } from "react-icons/md";
||||||| d3e480d:client/src/components/CityField.js
=======
import { MdSearch } from "react-icons/md"
>>>>>>> test:client/src/components/TimeWeather/CityField.js
import "./CityField.css";


function CityField(props) {
    const [city, setCity] = useState("");
    const [pic, setPic] = useState(false);

    function handleChange(e) {
        setCity(e.target.value);
    };

    function handleSubmit(e) {
      e.preventDefault();
      props.getCitiesCb2(city);
      setCity("");

      setPic(true);
      props.pic(pic);
    }

  return (
    <div className="CityField container-fluid">
     <form onSubmit={handleSubmit}>
<<<<<<< HEAD:client/src/components/CityField.js
       <label className="city">
       <MdSearch className="search-icons" size="1em" />
||||||| d3e480d:client/src/components/CityField.js
       <label className="city">
         Input city:
=======
     <MdSearch className="search-icons" size="2em" />
>>>>>>> test:client/src/components/TimeWeather/CityField.js
         <input
         type="text"
         name="city"
         placeholder="   type in city and click submit to display weather and time..."
         value={city}
         onChange={handleChange}
         placeholder="input city of choice here to view time and weather..." 
         />
<<<<<<< HEAD:client/src/components/CityField.js
       </label>
       <button type="submit">Click</button>
||||||| d3e480d:client/src/components/CityField.js
       </label>
       <button type="submit">Submit</button>
=======
         <div>
          <button type="submit">Submit</button>
        </div>
>>>>>>> test:client/src/components/TimeWeather/CityField.js
     </form>

     {/* <select onChange={handleChange}>
        {cityArr.map(({ country, code }) => (
            // since code is unique, can be used as key
          <option key={code} value={code}>
            {country}
          </option>
          ))}
          </select> */}
    </div>
  );
}

export default CityField;
