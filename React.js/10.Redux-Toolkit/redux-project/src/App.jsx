import { useSelector, useDispatch, } from 'react-redux';
import './App.css';
import { decrement, increment } from './functions/counter/counterSlice';

const App = () => {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrementClick = () => {
    dispatch(increment());
  }

  const handleDecrementClick = () => {
    dispatch(decrement());
  }

  // const resetBtn = () => {
  //   count = 0;
  // }

  return (
    <>
      <div className='w-full h-screen bg-slate-800 text-white flex items-center justify-center'>
        <div className='flex gap-1 flex-col'>
          <p className='text-3xl text-center font-bold'>Counter</p>
          <p className='bg-gray-900 hover:bg-gray-950 rounded w-full h-10 text-2xl flex items-center justify-center'>{count}</p>

          <div className='flex gap-4 text-2xl mt-1 justify-between'>
            <button onClick={handleIncrementClick} className='bg-gray-900 hover:bg-gray-950 rounded w-10 h-10 flex items-center justify-center'>+</button>
            <button onClick={handleDecrementClick} className='bg-gray-900 hover:bg-gray-950 rounded w-10 h-10 flex items-center justify-center'>-</button>
          </div>

          <button onClick={resetBtn} className='bg-gray-900 hover:bg-gray-950 rounded w-full h-8 mt-1 flex items-center justify-center'>Reset</button>
        </div>
      </div>
    </>
  )
}

export default App;