import React from "react";
import "./CarouselItem.css";

function CarouselItem(props) {

  return (
    <div className="CarouselItem" onMouseEnter={props.stopSlideCb} onMouseOut={props.startSlideCb}>
        <img src={props.file.url}/>
           </div>
  );
}

export default CarouselItem;