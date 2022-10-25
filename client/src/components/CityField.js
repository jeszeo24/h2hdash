import React, { useState } from "react";
import "./CityField.css";
import { Country, State, City }  from 'country-state-city';
// Country-state-city list downloaded via https://www.npmjs.com/package/country-state-city


function CityField(props) {
    const [city, setCity] = useState("");

    function handleChange(e) {
        setCity(e.target.value);
    };

    function handleSubmit(e) {
      e.preventDefault();
      props.getCitiesCb(city);
      props.getWeatherCb(city);
      props.getTimeCb(city);
      setCity("");
    }

  return (
    <div className="CityField">
     <form onSubmit={handleSubmit}>
       <label className="city">
         Input city:
         <input
         type="text"
         name="city"
         value={city}
         onChange={handleChange} 
         />
       </label>
       <button type="submit">Submit</button>
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
