import './App.css';
import PasswordGenerator from './components/Password-Generator';
import DarkLightMode from './components/DarkLightMode';
import { useState } from 'react';

function App() {

  return (
    <main className='h-screen w-full'>
      <PasswordGenerator />
      <DarkLightMode />
    </main>
  )
}

export default App;