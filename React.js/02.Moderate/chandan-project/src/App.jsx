import './App.css';
import Product from './component/Product';

function App() {

  return ( // Using Probs
    <> 
      <Product title="Apple" desc="A red sweet fruit" amount={15} />
      <Product title="Mango" desc="A yellow tasty fruit" amount={25} />
    </>
  )
}

export default App
