import { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contacts from './components/Contacts';
import Profile from './components/Profile';
import Main from './AnotherPage/Main';

function App() {

  return (
    <>
      {/* <Home /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='/main-page' element={<Main />} />

      </Routes>
    </>
  )
}

export default App;
