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
                    <input type="text" placeholder="Enter firstName" {...register("firstName", { required: {value: true, message: "required field."}, minLength: {value: 4, message: "min length is 4."}, maxLength: {value: 20, message: "max length is 20."} })} />
                    {errors.firstName && <p style={{color: "red"}}>{errors.firstName.message}</p>}
                </div>
                <br />

                <div>
                    <label>Last Name: </label>
                    <input type="text" placeholder="Enter lastName" {...register("lastName", { required: {value: true, message: "required field."}, minLength: {value: 4, message: "min length is 4."}, maxLength: {value: 20, message: "max length is 20."}} )} />
                    {errors.lastName && <p style={{color: "red"}}>{errors.lastName.message}</p>}
                </div>
                <br />

                <div>
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password" {...register("password", { required: {value: true, message: "required field."}, minLength: {value: 4, message: "min length is 4."}, maxLength: {value: 12, message: "max length is 20."}} )} />
                    {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
                </div>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReactForm;