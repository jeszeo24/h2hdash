import React, {useState} from "react";
import { useEffect } from "react";
import CarouselItem from "../components/CarouselItem";
import "./PhotoCarouselView.css";

function PhotoCarouselView() {
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
         "https://picsum.photos/id/251/367/267",
         "https://picsum.photos/id/256/367/267",
         "https://picsum.photos/id/264/367/267",
    ]

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
    }, 3000);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <div className="PhotoCarousel">
       <div className="carousel">
           <div 
           className="carousel-inner"
           style={{ transform: `translateX(${-currentSlide * 100}%)`}}>
               <div className="carousel-item">
                   {slides.map((slide, index) => (
                         <CarouselItem slide={slide} key={index} />
                   ))}
               </div>
           </div>
           </div>
    </div>
  );
}

export default PhotoCarouselView;