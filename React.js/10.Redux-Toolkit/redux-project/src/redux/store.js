import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../functions/counter/counterSlice.jsx';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});