import { useState } from 'react';
import './App.css';
import DestructuredProb from './components/DestructuredProb';
import Probs from './components/Probs';
import CountButton from './components/CountButton';

function App() {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <>
      <Probs name="Chandan">
        <h1>Hello from children of probs.</h1>
        <p>I can pass through parent to child.</p>
      </Probs>

      <hr />

      <Probs>
        <p>I'm a children.</p>
      </Probs>

      <hr />

      <Probs children="Hello from children.">
      </Probs>

      <hr />

      <DestructuredProb fullName="Chandan Chaudhary" />

      <hr />

      <CountButton text="Click me" handleClick={handleClick}>
        <h2>{count}</h2>
      </CountButton>
    </>
  )
}

export default App
