import './App.css';
import Information from "./components/Information.jsx";
// import { Information } from "./components/Information.jsx";
import Calculation from "./components/JSX with Curly Braces.jsx";

import ProductTab from './components/ProductTab.jsx';

function Title() {
  return (
    <p>This is another line.</p>
  );
}

function App() {

  return ( 
    <>
      <h1>This is my Custom Component.</h1>
      <Information/>
      <Title/>
      <Calculation/>

      <ProductTab/>
      <ProductTab/>
    </>
  );
}

export default App;
