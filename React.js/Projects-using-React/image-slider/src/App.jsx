import React, { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';

import SliderLong from './conmonents/SliderLong';
import SliderShort from './conmonents/SliderShort';
import Slider from './conmonents/Slider';


export default function App() {
  return (
    <>
      <SliderLong />
      {/* <SliderShort /> */}
      {/* <Slider /> */}
    </>
  );
}
