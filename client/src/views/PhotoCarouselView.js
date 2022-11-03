// NOTE: Referenced from https://www.youtube.com/watch?v=gtZevjgUkcY&ab_channel=TutsPrime

import React, {useState, useEffect, useRef} from "react";
import CarouselItem from "../components/Photocarousel/CarouselItem";
import CarouselControls from "../components/Photocarousel/CarouselControls";
import CarouselIndicators from "../components/Photocarousel/CarouselIndicators";
import "./PhotoCarouselView.css";
import UploadForm from '../components/Photocarousel/UploadForm';

function PhotoCarouselView(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef();
  let files = props.files;
  console.log(files);

    // If index of current slide is more than 0, -1 from index to get previous if not show the last slide
    function prev() {
        startSlideTimer();
        const index = currentSlide > 0 ? currentSlide - 1 : files.length - 1;
        setCurrentSlide(index);
    }

    // If index of current slide is less than index of last slide, add one to index to get next slide, if not next slide will be the first (index 0)
    function next() {
        startSlideTimer();
        const index = currentSlide < files.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    }

    function switchIndex(index) {
        startSlideTimer();
        setCurrentSlide(index);
    }

    function startSlideTimer() {
        if (props.autoPlay) {
            stopSlideTimer();
            slideInterval.current = setInterval(() => {
                setCurrentSlide(currentSlide => currentSlide < files.length - 1 ? currentSlide + 1 : 0)
            }, props.interval)
        }
    }

    function stopSlideTimer() {
        if(props.autoPlay && slideInterval.current) {
            // clearInterval() method cancels a timed, repeating action which was previously established by a call to setInterval()
            clearInterval(slideInterval.current)
        }
    }

<<<<<<< HEAD
    // Every tine the page rerenders
||||||| d3e480d
    // Every tine the page rerendersm 
=======
    // Every time the page rerenders 
>>>>>>> test
    useEffect(() => {
        startSlideTimer();
          return () => stopSlideTimer() // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])

    //NOTE as REFERENCE useEffect below: Every 3 seconds slide will change (through the index) if it's less than slides length, if false reverts to first image
    // NOTE: Without transiton on carousel-inner div, image flashes/changes one by one
//    useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
//     }, 3000);

//       return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
//   }, [])


  return (
      <div className="PhotoCarouselView">
    <div className="PhotoCarousel">
       <div className="carousel" style={{ maxWidth : props.width }}>
           <div 
           className="carousel-inner"
           // the below "transform: translateX by -100%" moves each slide completely to the left
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

            <div>
                {/*Parent app passes uploadCb to PhotoCarouselView (props.uploadCb) which then passes it to UploadForm */}
                <UploadForm uploadCb={props.uploadCb} />
            </div>
        </div>
    </div>
    </div>
  );
}

export default PhotoCarouselView;