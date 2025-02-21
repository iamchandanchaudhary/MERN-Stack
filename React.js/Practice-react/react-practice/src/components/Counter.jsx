import { useState } from "react";

function Counter() {

    let [counter, setCounter] = useState(0);

    let click = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
            <button onClick={click}
            className="text-white bg-pink-600 py-1 px-2 rounded mt-4 ml-4">Counter+ {counter}</button>

            {/* <div className="relative flex flex-col items-center justify-center"> */}
                <botton className="relative ml-5 mt-5 bg-black w-max text-[#ff0000] rounded-full flex items-center justify-center p-3 group">
                    <span className="absolute w-max bg-blue-500 text-white px-2 py-1 rounded-lg text-xs top-2 group-hover:-top-10 left-1/2 -translate-x-1/2 after:content-[''] after:w-3 after:h-3 after:bg-inherit after:rotate-45 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 transition-all duration-150 ease-in-out">Chat Bot</span>
                    <i class="fa-solid fa-comment-medical text-3xl"></i>
                </botton>
            {/* </div> */}
        </div>
    );
}

export default Counter;