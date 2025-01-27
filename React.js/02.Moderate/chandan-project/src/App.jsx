import './App.css';
import Product from './component/Product';

function App() {
  let fruit2 = "Mango";
  // let amount3 = [22, 12, 43, 22, 32];
  // console.log(amount3);

  return ( // Using Probs
    <> 
      <Product title="Apple" desc="A red sweet fruit" amount={15} />
      <Product title={fruit2} desc="A yellow tasty fruit" amount={25} />
      <Product title="Grapes" desc="A green sweet fruit" amount={20} />
    </>
  )
}

export default App;
