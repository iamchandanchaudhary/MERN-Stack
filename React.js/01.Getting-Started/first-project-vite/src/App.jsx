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
    <div>
      <h1>This is my Custom Component.</h1>
      <Information/>
      <Title/>
    </div>
  );
}

export default App;
