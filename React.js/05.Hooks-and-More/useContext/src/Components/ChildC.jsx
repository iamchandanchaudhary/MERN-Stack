import React, { useContext } from 'react'
import { UserContext } from '../App';
// import UserContextProvider from '../Context/UserContext';

function ChildC() {

    const user = useContext(UserContext);

  return (
    <div>
      {user.name}
    </div>
  )
}

export default ChildC;
