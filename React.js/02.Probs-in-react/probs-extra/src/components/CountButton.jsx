import React from 'react'

function CountButton(probs) {
  return (

    <div>
        {probs.children}
        <button onClick={probs.handleClick}>
            {probs.text}
        </button>
    </div>
  )
}

export default CountButton;
