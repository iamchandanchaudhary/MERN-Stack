function handdleClick() {
    console.log("Clicked");
}

function handdleNonClick() {
    console.log("Enterd");
}

function handdleDblClick() {
    console.log("Double Clicked");
}

function Button() {
    return ( // Click event & non-click event
        <div>
            
            <button onClick={handdleClick}>Click me!</button>
            <p onMouseOver={handdleNonClick}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur maiores illum adipisci repellat totam cupiditate animi recusandae nulla magni cum eum, incidunt iure? Dolor alias, voluptatem commodi reprehenderit repellat earum!</p>
            <button onDoubleClick={handdleDblClick}>Click me!</button>
        </div>
    );
}

export default Button;