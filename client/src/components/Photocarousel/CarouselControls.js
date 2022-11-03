import React from "react";
import "./CarouselControls.css";

function CarouselControls(props) {
  
  return (
    <div className="carousel-control">
        {/* Received prevCb and nextCb(functions) as props from parent PhotoCarouselView */}
        <button className="left" onClick={props.prevCb}>Prev</button>
        <button className="right" onClick={props.nextCb}>Next</button>
    </div>
  );
}

export default CarouselControls;