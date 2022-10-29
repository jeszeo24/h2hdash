import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
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
       <label className="city">
       <MdSearch className="search-icons" size="1em" />
         <input
         type="text"
         name="city"
         value={city}
         onChange={handleChange}
         placeholder="input city of choice here to view time and weather..." 
         />
       </label>
       <button type="submit">Click</button>
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
