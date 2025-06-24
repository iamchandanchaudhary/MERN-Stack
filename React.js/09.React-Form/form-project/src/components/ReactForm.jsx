import { useState } from "react";
import { useForm } from "react-hook-form";

function ReactForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    let [firstName, setFullName] = useState("Chandan");
    let [lastName, setFirstName] = useState("Chaudhary");
    let [password, setPassword] = useState("");

    let handleValue = (event) => {
        // console.log(event.target.value);
        setFullName(event.target.value);
    }

    return (
        <div>
            <form action="">
                <div>
                    <label>First Name: </label>
                    <input type="text" placeholder="Enter firstName" value={firstName} onChange={handleValue} {...register("example")} />
                </div>
                <br />

                <div>
                    <label>Last Name: </label>
                    <input type="text" placeholder="Enter lastName" value={lastName} onChange={handleValue} {...register("example")} />
                </div>
                <br />

                <div>
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password" value={password} onChange={handleValue} {...register("example")} />
                </div>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReactForm;