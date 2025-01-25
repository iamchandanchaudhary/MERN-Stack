import './App.css'

function Information() {
  return (
  <div>
      <h1>Chandan Chaudhary</h1>
      <p>Hello Everyone...</p>
      <button>Click me!</button>
  </div>
  );
}

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

export default App
