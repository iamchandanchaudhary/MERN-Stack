import { createContext, useState } from 'react';
import './App.css';
import ChildA from './Components/ChildA';

const UserContext = createContext();

function App() {

  const [user, setUser] = useState({name:"Chandan"});

  return (
    <>
      <UserContext.Provider value={user}>
        <ChildA />
        {/* <ChildC /> */}
      </UserContext.Provider>
      {/* <ChildA value={user} /> */}
    </>
  )
}

export default App;
export {UserContext};
