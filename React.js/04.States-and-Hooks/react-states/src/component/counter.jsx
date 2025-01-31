import { useState } from "react";

function Counter() {
    let n = 0;

    // let [stateVariable, setStateVariable] = useState(0);
    let [number, setNumber] = useState(n);

    let count = () => {
        setNumber(number + 1);
        console.log(number);
    }

    return (
        <div>
            <h2>States in React</h2>
            <button onClick={count}>Counter: {number}</button>
        </div>

    );
}

export default Counter;