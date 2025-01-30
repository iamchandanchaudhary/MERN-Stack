function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form Submitted.");
}

export default function Form() {

    return (
        <div>
        <form action="" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Write something..." />
            <button>Submit!</button>
        </form>
        </div>    
    );
}