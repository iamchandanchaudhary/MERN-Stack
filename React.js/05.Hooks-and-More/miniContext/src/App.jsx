import React from 'react';
import { useState } from 'react';
import './App.css';
import UserContextProvider from './context/UserContextProvider';

const App = () => {

  return (
    <UserContextProvider>
      <h2>Hello 👋, from Chandan Chaudhary</h2>
    </UserContextProvider>
  )
}

export default App;
