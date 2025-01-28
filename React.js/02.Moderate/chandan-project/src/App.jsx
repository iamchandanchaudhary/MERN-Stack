import './App.css';
import Product from './component/Product';

function App() {
  let fruit2 = "Mango";

  // Using arrays & objects
  let clr = ["Green, ", "Yellow, ", "Red"];
  let appleFtr = {a:"circlular", b:"big", c:"singular"};
  let mangoFtr = {a:"modrate", b:"small", c:"multiple"};
  let grapesFtr = {a:"circlular", b:"small", c:"multiple"};

  return ( // Using Probs
    <> 
      <Product title="Apple" desc="A red sweet fruit" amount={15} feature={appleFtr} />
      <Product title={fruit2} desc="A yellow tasty fruit" amount={25} colors={clr} feature={mangoFtr} />
      <Product title="Grapes" desc="A green sweet fruit" amount={20} feature={grapesFtr} />
    </>
  )
}

export default App;
