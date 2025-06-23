import { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contacts from './components/Contacts';
import Profile from './components/Profile';
import PramsComp from './components/PramsComp';
import NotFound from './components/NotFound';
import Courses from './components/NestedComponents/Courses';
import Reports from './components/NestedComponents/Reports';
import Test from './components/NestedComponents/Test';

function App() {

  return (
    <>
      {/* <Home /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />

        <Route path='/profile' element={<Profile />}> 
          <Route path='courses' element={<Courses />}/> 
          <Route path='test' element={<Test />}/> 
          <Route path='reports' element={<Reports />}/>
        </Route>

        <Route path='/key/:id' element={<PramsComp />} />

        {/* If the page was not found (due to wrong url) */}
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </>
  )
}

export default App;
