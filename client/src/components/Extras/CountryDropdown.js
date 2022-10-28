import React, { useState } from "react";
import "./CountryDropDown.css";
import countries from "i18n-iso-countries";
// Country list downloaded via https://www.npmjs.com/package/i18n-iso-countries
// Additional reference: https://javascript.plainenglish.io/create-a-country-select-component-with-react-2021-a259bd0350d5


function CountryDropdown(props) {
    const [country, setCountry] = useState("");

    function handleChange(e) {
        setCountry(e.target.value);
        props.getCountryCb(country)
    };

  // Have to register the languages you want to use
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  // To get an object of all the countries and store it in countryObj
  const countryObj = countries.getNames("en", { select: "official" });

  console.log(countryObj);

  // Math.floor(Math.random() * 101);

  // Use Object.entries(countryObj) to return an array of key-value pairs (Need an array to map)
  // The same as iterating with a for...in loop
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      country: value,
      code: key,
    };
  });

  let result = countryArr[Math.floor(Math.random() * 251)]

  console.log(countryArr[Math.floor(Math.random() * 251)]);

  let countryflag = `https://www.sciencekids.co.nz/images/pictures/flags680/${result.country}.jpg`
  return (
    <div className="CountryDropDown">
      <div>
        {result.country}
      </div>

      <img src=""></img>
      {/* <select onChange={handleChange}>
        {countryArr.map(({ country, code }) => (
            // since code is unique, can be used as key
          <option key={code} value={code}>
            {country}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default CountryDropdown;
