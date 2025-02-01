import { useState } from "react";

function Counter() {
    // let n = 0;

    // let [stateVariable, setStateVariable] = useState(0);
    let [number, setNumber] = useState(0);  // Initialization
    console.log("Counter:", number);

    let count = () => {
        setNumber(number + 1);
        console.log("Counter inside:", number); // Always -1
    }

    return (
        <div>
            <h2>States in React</h2>
            <button onClick={count}>Counter: {number}</button>
        </div>

    );
}

export default Counter;