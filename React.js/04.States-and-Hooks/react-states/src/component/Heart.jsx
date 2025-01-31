// import './App.css';

import { useState } from "react";

let styles = {color: "Red"};

function Heart() {
        let [count, setCount] = useState(0);

        let changeClr = () => {
            setCount(count + 1);
            console.log(count);
        }

    return (
        <div onClick={changeClr}>
            {count % 2 == 0 ? <i class="fa-solid fa-heart" style={styles}></i>
            : 
            <i class="fa-solid fa-heart"></i>}

            <p>Heart Pressed: {count}</p>
        </div>
    );
}

export default Heart;