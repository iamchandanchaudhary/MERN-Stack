import './App.css';
import Product from './component/Product';

function App() {
  let fruit2 = "Mango";
  let clr = ["Green, ", "Yellow, ", "Red"];
  let feature = {a:"circle", b:"small", c:"multiple"};

  return ( // Using Probs
    <> 
      <Product title="Apple" desc="A red sweet fruit" amount={15} />
      <Product title={fruit2} desc="A yellow tasty fruit" amount={25} colors={clr} />
      <Product title="Grapes" desc="A green sweet fruit" amount={20} feature={feature} />
    </>
  )
}

export default App;
