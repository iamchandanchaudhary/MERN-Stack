import { useState } from 'react';
import './App.css';
import ChildA from './Components/ChildA';
import ChildC from './Components/ChildC';

const UserContext = createContext();

function App() {

  const [user, setUser] = useState({name:"Chandan"});

  return (
    <>
      <UserContext.Provider value={user}>
        {/* <ChildA /> */}
        <ChildC />
      </UserContext.Provider>
    </>
  )
}

export default App;
export {UserContext};
