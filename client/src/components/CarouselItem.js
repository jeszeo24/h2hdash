import React, {useState} from "react";
import "./CarouselItem.css";

function CarouselItem(props) {

  return (
    <div className="CarouselItem">
        <img src={props.slide}/>
           </div>
  );
}

export default CarouselItem;