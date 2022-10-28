import React, {useState, useEffect} from "react";
import countries from "i18n-iso-countries";
// Country list downloaded via https://www.npmjs.com/package/i18n-iso-countries
// Additional reference: https://javascript.plainenglish.io/create-a-country-select-component-with-react-2021-a259bd0350d5

function LuckGame() {
    const [country, setCountry] = useState("");
    const [pic, setPic] = useState(false);

function handleClick(e) {
    // Have to register the languages you want to use
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    // To get an object of all the countries and store it in countryObj
    const countryObj = countries.getNames("en", { select: "official" });

    console.log(countryObj);

    // Use Object.entries(countryObj) to return an array of key-value pairs (Need an array to map)
    // The same as iterating with a for...in loop
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
        country: value,
        code: key,
        };
    });

    let result = countryArr[Math.floor(Math.random() * 251)]
    setCountry(result.country);

    console.log(countryArr[Math.floor(Math.random() * 251)]);
};

function handleChangeView(pic) {
    setPic(true);
}
 
// QUESTION 1: Can I input this?
let countryflag = `https://www.sciencekids.co.nz/images/pictures/flags680/${country}.jpg`

// QUESTION 2: How do I toggle between?

  return (
    <div className="CountryDropDown">
        <img src="https://img.freepik.com/premium-vector/feeling-lucky-today-poster_105554-149.jpg?w=740">
            </img>
            <button onClick={handleClick}>Where to next?</button>
      <div>
        {country}
      </div>

      <img src=""></img>
    </div>
  );
}

export default LuckGame;