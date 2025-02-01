import { useState } from "react";

function CallBack() {
    
    let [number, setNumber] = useState(0);  // Initialization
    console.log("Counter:", number);

    let count = () => {
        setNumber((currNum) => {
            return currNum + 1;
        });

        setNumber((currNum) => {
            return currNum + 1;
        });

        setNumber((currNum) => {
            return currNum + 1;
        });
    }

    return (
        <div>
            <button onClick={count}>Syachronous Counter: {number}</button>
        </div>

    );
}

export default CallBack;