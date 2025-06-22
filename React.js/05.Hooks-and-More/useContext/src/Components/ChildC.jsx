import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { UserContext } from '../App';
// import UserContextProvider, { UserContext } from '../Context/UserContext';

function ChildC() {

    const user = useContext(UserContext);
    // const {user} = useContext(UserContext);

    const theme = useContext(ThemeContext);

  return (
    <div>
      {user.name}
      <br />
      {theme}
    </div>
  )
}

export default ChildC;
