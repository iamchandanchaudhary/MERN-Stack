import React from 'react';
import { useState, useContext } from 'react';

import UserContext from '../context/UserContext';

const Profile = () => {

  const { user } = useContext(UserContext);

  if (!user) return (
    <div>Please Login</div>
  )

  return (
    <div>
      <p>Welcome {user.username}</p>
    </div>
  )
}

export default Profile;