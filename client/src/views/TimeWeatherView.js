import React from "react";
import CityField from "../components/TimeWeather/CityField";
import TimeWeather from "../components/TimeWeather/TimeWeather";
import "./TimeWeatherView.css";

// map through the cities and render TimeWeather component for each city
function TimeWeatherView(props) {

    return (
        <div className="TimeWeatherView">
            {/* <div className="container"> */}
                <CityField 
                getCitiesCb2={props.getCitiesCb} 
                /> 
            
                {/* second parameter in map function is the index, passing index so that a unique id can be sent to TimeWeather to access each individual compile array object */}
                <div className="cities">
                <table className="row">
                {props.cities.map((c, index) => (
                    <td key={c.id} className="col">
                    <TimeWeather 
                    compile={props.compile}
                    cities={props.cities}
                    index={index}
                    time={props.time}
                    />

                    </td>
                    ))}
                </table>
                </div>
            {/* </div> */}
        </div>
        
    )
}

export default TimeWeatherView;
