import { useState } from "react";

function ReactForm() {

    let [fullName, setFullName] = useState("Chandan");

    let handleName = (event) => {
        // console.log(event.target.value);
        setFullName(event.target.value);
    }

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Enter name" value={fullName} onChange={handleName} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReactForm;