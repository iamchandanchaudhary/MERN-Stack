import React from 'react';
import { useState } from 'react';
import './App.css';
import UserContextProvider from './context/UserContextProvider';
import Profile from './components/Profile';
import Login from './components/Login';

const App = () => {

  return (
    <UserContextProvider>
      <h2>Hello 👋, from Chandan Chaudhary</h2>

      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App;
