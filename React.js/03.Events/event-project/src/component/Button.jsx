function handleClick(event) {
    console.log("Clicked");
    console.log(event);
}

function handleNonClick() {
    console.log("Enterd");
}

function handleDblClick() {
    console.log("Double Clicked");
}

function Button() {
    return ( // Click event & non-click event
        <div>
            
            <button onClick={handleClick}>Click me!</button>
            <p onMouseOver={handleNonClick}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur maiores illum adipisci repellat totam cupiditate animi recusandae nulla magni cum eum, incidunt iure? Dolor alias, voluptatem commodi reprehenderit repellat earum!</p>
            <button onDoubleClick={handleDblClick}>Click me!</button>
        </div>
    );
}

export default Button;