import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import img1 from "./images/car1.jpg";
import img2 from "./images/car2.jpg";
import img3 from "./images/car3.jpg";
import img4 from "./images/car4.jpg";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function SliderLong() {
  return (
    <>
      <div className='container'>       
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={img1} alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={img2} alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={img3} alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={img4} alt="" />
          </SwiperSlide>

          {/* <SwiperSlide>Slide 5</SwiperSlide> */}

        </Swiper>
      </div>
    </>
  );
}
