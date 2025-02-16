import { useState } from 'react';
import './DOM.css';

function DOM() {
    const [isSquare, setIsSquare] = useState(true);

    let changeShape = () => {
        setIsSquare(!isSquare);
    }

    let condition = isSquare ? "square" : "circle";

    return (
        <div className='main-box h-screen w-full flex items-center justify-center flex-col'>
            <div className={`w-52 h-52 border-2 border-black bg-pink-500 ${condition} transition-all duration-500 ease-linear`}>

            </div>

            <button onClick={ changeShape }
            className='bg-blue-500 text-white px-2 py-1 rounded-md mt-4'>Change Shape</button>
        </div>
    );
}

export default DOM;