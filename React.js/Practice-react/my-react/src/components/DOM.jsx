import { useState } from 'react';
import './DOM.css';

function DOM() {
    const [isSquare, setIsSquare] = useState(true);

    let changeShape = () => {
        setIsSquare(!isSquare);
    }

    return (
        <div className='main-box h-screen w-full flex items-center justify-center flex-col'>
            <div className={isSquare ? "square" : "circle"}>

            </div>

            <button onClick={ changeShape }
            className='bg-blue-500 text-white px-2 py-1 rounded-lg mt-4'>Change Shape</button>
        </div>
    );
}

export default DOM;