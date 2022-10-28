import React, {useState} from "react";
import "./CarouselControls.css";

function CarouselControls() {
  

  return (
    <div className="carousel-control">
        <button className="left">Prev</button>
        <button className="right">Next</button>
    </div>
  );
}

export default CarouselControls;