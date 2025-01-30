function Counter() {
    let number = 0;
    function count() {
        number++;
        console.log(number);
    }

    return (
        <div>
            <h2>States in React</h2>
            <button onClick={count}>Counter: {number}</button>
        </div>

    );
}

export default Counter;