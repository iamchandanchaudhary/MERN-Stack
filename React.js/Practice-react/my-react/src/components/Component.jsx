import { useState } from "react";

function Component() {

    let [counter, setCounter] = useState(0);

    let click = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
            <button onClick={click}
            className="text-white bg-pink-600 py-1 px-2 rounded mt-4 ml-4">Counter + {counter}</button>
        </div>
    );
}

export default Component;