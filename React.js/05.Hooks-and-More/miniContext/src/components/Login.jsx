import React from 'react';
import { useState, useContext } from 'react';

import UserContext from '../context/UserContext';

const Login = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUser({ username, password });
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder='Username'
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      
      <button onClick={onSubmitHandler}>Submit</button>
    </div>
  )
}

export default Login;