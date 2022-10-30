import React, { useState } from "react";
import { MdSearch } from "react-icons/md"
import "./CityField.css";

function CityField(props) {
    const [city, setCity] = useState("");

    function handleChange(e) {
        setCity(e.target.value);
    };

    function handleSubmit(e) {
      e.preventDefault();
      props.getCitiesCb2(city);
      setCity("");
    }

  return (
    <div className="CityField">
     <form onSubmit={handleSubmit}>
     <MdSearch className="search-icons" size="1em" />
         <input
         type="text"
         name="city"
         placeholder="type in city to display weather and time..."
         value={city}
         onChange={handleChange} 
         />
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
