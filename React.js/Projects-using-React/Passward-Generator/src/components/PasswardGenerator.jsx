import { useState, useCallback, useEffect } from "react";

function PasswardGenerator() {

    let [length, setLength] = useState(4);
    let [numberAllowed, setNumberAllowed] = useState(true);
    let [alphaAllowed, setAlphaAllowed] = useState(false);
    let [charAllowed, setCharAllowed] = useState(false);

    let [passward, setPassward] = useState("");

    let generator = useCallback( () => {
        let pass = "";
        let str = "1234567890"
        if(alphaAllowed) str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        
        if(charAllowed) str+= "!@#$%^&*_-+={}[]`~"
        

        for(let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(char);

        }
        setPassward(pass);

    }, [length, numberAllowed, alphaAllowed, charAllowed, setPassward]);

    useEffect(() => {
    generator()
    }, [length, numberAllowed, alphaAllowed, charAllowed, generator]);
    
    return (
        <div className="h-screen w-full flex items-center flex-col text-white">
            <div className="w-max p-12 flex flex-col items-center bg-[#28403a] rounded-lg mt-5 shadow-xl">
                <h1 className="text-5xl font-bold">Random Password Generator</h1>
                <p className="my-4">Create strong and secure passwords to keep your account safe online.</p>

                {/* Inp area */}
                <div className="">
                    <input type="text" placeholder="passward" readOnly value={passward}
                    className="w-[350px] bg-white py-2 px-3 my-4 rounded-s-md border-y-[1.5px] border-s-[1.5px] border-black shadow-lg text-center outline-none" />

                    <button
                    className="bg-blue-600 hover:bg-blue-500 transition-all duration-150 ease-in-out text-[#fff] py-2 px-4 my-4 rounded-e-md border-y-[1.5px] border-e-[1.5px] border-black shadow-lg">Copy</button>
                </div>

                {/* Range */}
                <div className="flex flex-col items-center gap-2 mt-4 p-2">
                    <input type="range" min={4} max={30} value={length} 
                    className="cursor-pointer w-52"
                    onChange={ (e) => {setLength(e.target.value)}} />
                    <label htmlFor="">Passward Length: {length}</label>

                </div>

                {/* Select Option */}
                <div className="">
                    <input type="checkbox"
                    defaultChecked={numberAllowed}
                    id="numberInput"
                    onChange={() => {
                        setNumberAllowed((prev) => {!prev});
                    }} />

                    <label htmlFor="numberInput">123</label>

                    <input type="checkbox"
                    defaultChecked={alphaAllowed}
                    id="alphaInput"
                    onChange={() => {
                        setAlphaAllowed((prev) => {!prev});
                    }} />

                    <label htmlFor="alphaInput">abc</label>

                    <input type="checkbox"
                    defaultChecked={charAllowed}
                    id="charInput"
                    onChange={() => {
                        setCharAllowed((prev) => {!prev});
                    }} />

                    <label htmlFor="charInput">@&$</label>
                </div>

            </div>
        </div>
    );
}

export default PasswardGenerator;