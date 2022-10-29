import React from "react";
import "./CarouselIndicators.css";

function CarouselIndicators(props) {
  
  return (
    <div className="carousel-indicators">
        {/* _ used in instead of slide, as slide not used below (_ stands for any parameter) */}
        {props.slides.map((_, index) => (
            <button key={index} className={`carousel-indicator-item ${
                props.currentIndex === index ? "active" : ""
            }`}
            onClick={() => props.switchIndexCb(index)}
            ></button>
        ))}
        
       
    </div>
  );
}

export default CarouselIndicators;