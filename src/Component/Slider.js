import { Carousel } from 'flowbite-react';
import React from 'react';
import nagad from '../assets/img/slider.jpg';
import rocket from '../assets/img/slider3.jpg';
const Slider = () => {
    return (
        <div>
 <div className="h-20 lg:h-72 xl:h-96 2xl:h-96 rounded-none">
  <Carousel slideInterval={5000}>
    <img
      src={nagad}
      alt="..."
    />
    <img
      src={rocket}
      alt="..."
    />

  </Carousel>
</div>
        </div>
    );
};

export default Slider;