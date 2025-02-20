import { useState } from "react";

function ReactForm() {

    let [fullName, setFullName] = useState("Chandan");

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Enter name" value={fullName} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReactForm;