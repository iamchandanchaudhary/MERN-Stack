import React, { createContext, useState } from 'react';
export const userContext = createContext();

export default function UserContextProvider(probs) {

  return (
    <div>
      <userContext.Provider>
        {probs.children}
      </userContext.Provider>
    </div>
  )
}
