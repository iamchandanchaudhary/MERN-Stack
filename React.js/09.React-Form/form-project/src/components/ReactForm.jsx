import { useState } from "react";
import { useForm } from "react-hook-form";

function ReactForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // let [firstName, setFullName] = useState("Chandan");
    // let [lastName, setFirstName] = useState("Chaudhary");
    // let [password, setPassword] = useState("");

    // let handleValue = (event) => {
    //     console.log(event.target.value);
    //     setFullName(event.target.value);
    // }

    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name: </label>
                    <input type="text" placeholder="Enter firstName" {...register("firstName", { required: true, minLength: 4, maxLength: 20 })} />
                    {errors.firstName && <p style={{color: "red"}}>First name is required.</p>}
                </div>
                <br />

                <div>
                    <label>Last Name: </label>
                    <input type="text" placeholder="Enter lastName" {...register("lastName", { required: true, minLength: 4, maxLength: 20 })} />
                    {errors.lastName && <p style={{color: "red"}}>{errors.lastName.message}</p>}
                </div>
                <br />

                <div>
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password" {...register("password", { required: {value: true, message: "required field."}, minLength: {value: 4, message: "min 4 length is possible."}, maxLength: {value: 12, message: "max 12 length is possible."} })} />
                    {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
                </div>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReactForm;