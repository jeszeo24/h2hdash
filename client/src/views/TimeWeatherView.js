import React from "react";
import CityField from "../components/CityField";
import TimeWeather from "../components/TimeWeather";

function TimeWeatherView(props) {

    return (
        <div>
            <CityField 
            getCitiesCb2={props.getCitiesCb} 
            /> 
            
            <TimeWeather cities2={props.cities} />
            
        </div>
        
    )
}

export default TimeWeatherView;