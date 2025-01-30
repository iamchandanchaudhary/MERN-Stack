function doSomething() {
    console.log("Clicked");
}

function clickEvent() {
    return (
        <>
            <button onClick={doSomething}>Click me!</button>    
        </>
    );
}

export default clickEvent;