import './App.css';
import Information from "./components/Information.jsx";
// import { Information } from "./components/Information.jsx";

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
    </>
  );
}

export default App;
