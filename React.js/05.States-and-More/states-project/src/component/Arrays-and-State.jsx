import { useState } from "react";

function Arrays() {
    let [arr, setArr] = useState(["0"]);

    let updateArr = () => {
        // arr.push(" +1");

        // setArr([...arr, " +1"]);
        setArr((prevArr) => { return [...prevArr, " +1"] } ); // Applying CallBack
        console.log(arr);
    }

    return (
        <div>
            <h2>Arrays & State</h2>
            
            <p>List: {arr}</p>
            <button onClick={updateArr} className="" style={{backgroundColor: "purple", color: "#fff"}}>+1</button>
        </div>
    );
}

export default Arrays;