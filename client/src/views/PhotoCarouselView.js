// NOTE: Referenced from https://www.youtube.com/watch?v=gtZevjgUkcY&ab_channel=TutsPrime

import React, {useState, useEffect, useRef} from "react";
import CarouselItem from "../components/CarouselItem";
import CarouselControls from "../components/CarouselControls";
import "./PhotoCarouselView.css";

function PhotoCarouselView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef();

    const slides = [
         "https://picsum.photos/id/251/600/267",
         "https://picsum.photos/id/256/600/267",
         "https://picsum.photos/id/264/600/267",
    ]

    // If index of current slide is more than 0, -1 from index to get previous if not show the last slide
    function prev() {
        startSlideTimer();
        const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        setCurrentSlide(index);
    }

    // If index of current slide is less than index of last slide, add one to index to get next slide, if not next slide will be the first (index 0)
    function next() {
        startSlideTimer();
        const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    }

    function startSlideTimer() {
        stopSlideTimer();
        slideInterval.current = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0)
        }, 3000)
    }

    function stopSlideTimer() {
        if(slideInterval.current) {
            // clearInterval() method cancels a timed, repeating action which was previously established by a call to setInterval()
            clearInterval(slideInterval.current)
        }
    }

    // Every tine the page rerendersm 
    useEffect(() => {
        startSlideTimer();
          return () => stopSlideTimer() // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])

    //NOTE useEffect below: Every 3 seconds slide will change (through the index) if it's less than slides length, if false reverts to first image
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
                         <CarouselItem 
                         slide={slide} 
                         key={index}
                         stopSlideCb={stopSlideTimer}
                         startSlidecb={startSlideTimer}
                         />
                   ))}
           </div>
           {/* Pass prev and next callback functions to child CarouselControls */}
           <CarouselControls 
           prevCb={prev} 
           nextCb={next}
           
           />  
        </div>  
    </div>
  );
}

export default PhotoCarouselView;