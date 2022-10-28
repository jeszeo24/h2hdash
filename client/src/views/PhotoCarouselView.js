import React, {useState, useEffect} from "react";
import CarouselItem from "../components/CarouselItem";
import CarouselControls from "../components/CarouselControls";
import "./PhotoCarouselView.css";

function PhotoCarouselView() {
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
         "https://picsum.photos/id/251/367/267",
         "https://picsum.photos/id/256/367/267",
         "https://picsum.photos/id/264/367/267",
    ]

    //NOTE: Every 3 seconds slide will change (through the index) if it's less than slides length, if false reverts to first image
    // NOTE: Without transiton on carousel-inner div, image flashes/changes one by one
//    useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
//     }, 3000);

//       return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
//   }, [])

  return (
    <div className="PhotoCarousel">
       <div className="carousel">
           <div 
           className="carousel-inner"
           style={{ transform: `translateX(${-currentSlide * 100}%)`}}>
                   {slides.map((slide, index) => (
                         <CarouselItem slide={slide} key={index} />
                   ))}
           </div>
           <CarouselControls />
        </div>  
    </div>
  );
}

export default PhotoCarouselView;