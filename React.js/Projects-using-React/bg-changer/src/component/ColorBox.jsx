import { useState } from "react";

function ColorBox() {

    let [color, setColor] = useState("#242424");

    return (
        
        <div className="w-full h-screen transition-all duration-150 ease-in-out" style={{backgroundColor: color}}>
            <div className="lg:w-max text-black flex flex-wrap justify-center py-3 px-4 sm:px-8 bg-[#fff] gap-5 absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]">
                <button className="bg-[#ff0000] rounded-xl outline-none px-4 py-1 text-base text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("red") }}>Red</button>
                <button className="bg-[#008000] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("green") }}>Green</button>
                <button className="bg-[#0000ff] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("blue") }}>Blue</button>
                <button className="bg-[#808080] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("gray") }}>Gray</button>
                <button className="bg-[#808000] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("olive") }}>Olive</button>
                <button className="bg-orange-500 rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("#fa7516") }}>Orange</button>
                <button className="bg-[#ffff00] rounded-xl outline-none px-4 py-1 text-[#111] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("yellow") }}>Yellow</button>
                <button className="bg-[#800080] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("purple") }}>Purple</button>
                <button className="bg-[deeppink] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("deeppink") }}>Pink</button>
                <button className="bg-[#fff] rounded-xl outline-none px-4 py-1 text-[#111] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("white") }}>White</button>
                <button className="bg-[#111] rounded-xl outline-none px-4 py-1 text-[#fff] shadow-[0.5px_1px_5px_1px_rgba(0,0,0,0.5)]" onClick={ () => { setColor("black") }}>Black</button>
            </div>
        </div>


    );
}

export default ColorBox;