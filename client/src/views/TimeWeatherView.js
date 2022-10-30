import React from "react";
import CityField from "../components/CityField";
import TimeWeather from "../components/TimeWeather";
import Time from "../components/Time";
import "./TimeWeatherView.css";

// map through the cities and render TimeWeather component for each city
function TimeWeatherView(props) {

    return (
        <div className="TimeWeatherView">
            <CityField 
            getCitiesCb2={props.getCitiesCb} 
            /> 
            
            {/* second parameter in map function is the index, passing index so that a unique id can be sent to TimeWeather to access each individual compile array object */}
            <table className="cities">
            {props.cities.map((c, index) => (
                <td key={c.id}>
                <TimeWeather 
                compile={props.compile}
                cities={props.cities}
                index={index}
                time={props.time}
                 />

                 </td>
            ))}
            </table>

            <Time
                 compile={props.compile} 
                 />
            {/* <TimeWeather 
            cities2={props.cities}
            /> */}
            {/* // time passed as prop
            // creates new state running time
            // updated once a minute */}
            
        </div>
        
    )
}

export default TimeWeatherView;
