// import './App.css';

import { useState } from "react";

function Heart() {
        let state = false;
        let [count, setCount] = useState(0);
        let [isLike, setIsLike] = useState(state);

        let changeClr = () => {
            setIsLike(!isLike);
            setCount(count + 1);
            // console.log(count);
        }

        let styles = isLike ? {color: "Red"} : {color: ""};

    return (
        <div >
            <i className="fa-solid fa-heart" onClick={changeClr} style={styles}></i>

            <p>Heart Pressed: {count}</p>
        </div>
    );
}

export default Heart;