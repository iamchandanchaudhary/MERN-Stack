import React, { createContext, useState } from 'react';
import App from '../App';

const UserContext = createContext();

export default function UserContextProvider() {

    const [user, setUser] = useState({name:"Chandan"});

    const value = {
      user
    }

  return (
    <div>
      <UserContext.Provider value={value}>
        {probs.children}
      </UserContext.Provider>
    </div>
  )
}

export {UserContext};
