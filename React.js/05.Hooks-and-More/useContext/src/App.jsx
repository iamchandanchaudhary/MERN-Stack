import { createContext, useContext, useState } from 'react';
import './App.css';
import ChildA from './Components/ChildA';
// import { UserContext } from './Context/UserContext';
import ChildC from './Components/ChildC';

const UserContext = createContext();
const ThemeContext = createContext();

function App() {

  const [user, setUser] = useState({name:"Chandan"});
  // const user = useContext(UserContext);

  const [theme, setTheme] = useState('Dark');

  return (
    <>
      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={theme}>
          <ChildA />
        </ThemeContext.Provider>

          {/* <ChildA /> */}
      </UserContext.Provider>

      {/* <ChildA value={user} /> */}
      {/* {user.name} */}
      {/* <ChildC /> */}

      {/* <ThemeContext.Provider value={theme}>
        <ChildA />
      </ThemeContext.Provider> */}
    </>
  )
}

export default App;
export {UserContext};
export {ThemeContext};
