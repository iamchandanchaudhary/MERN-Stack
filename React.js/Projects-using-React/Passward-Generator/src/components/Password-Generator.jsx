import { useState, useCallback, useEffect, useRef } from "react";

function PasswordGenerator() {

    let [length, setLength] = useState(4);
    let [numberAllowed, setNumberAllowed] = useState(true);
    let [smallLetterAllowed, setSmallLetterAllowed] = useState(true);
    let [capitalLetterAllowed, setCapitalLetterAllowed] = useState(false);
    let [charAllowed, setCharAllowed] = useState(false);

    let [password, setPassword] = useState("");

    // useRef Hook
    let passwardRef = useRef(null);

    // Generating the password
    let generator = useCallback( () => {
        let pass = "";
        let str = "";
        if(numberAllowed) str+= "1234567890";
        if(smallLetterAllowed) {
            str+= "abcdefghijklmnopqrstuvwxyz";
        }

        if(capitalLetterAllowed) {
            str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        
        if(charAllowed) {
            str+= "!@#$%^&*_-+={}[]`~";
        }
        

        for(let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(char);

        }
        setPassword(pass);
        
    }, [length, numberAllowed, smallLetterAllowed, capitalLetterAllowed, charAllowed, setPassword]);

    // Copy password
    let copyPassword = useCallback(() => {
        passwardRef.current?.select();
        passwardRef.current?.setSelectionRange(0, 31);
        window.navigator.clipboard.writeText(password)
    }, [password]);
    
    
    useEffect(() => {
    generator();
    // console.log(password);
    }, [length, numberAllowed, smallLetterAllowed, capitalLetterAllowed, charAllowed, generator]);
    
    return (
            <div className="w-max px-12 py-8 mt-28 flex flex-col items-center bg-[#fff1e6] dark:bg-[#0a1338] rounded-lg drop-shadow-2xl groupdrop-shadow-[0_0px_30px_rgba(59,130,246,0.6)]">
                <h1 className="text-5xl font-bold">Strong Password Generator</h1>
                <p className="my-4 text-base">Create strong and secure passwords to become a safe user online or offline.</p>

                {/* Inp area */}
                <div className="">
                    <input type="text" value={password} placeholder="password" readOnly ref={passwardRef}
                    className="w-[350px] text-black bg-white py-2 px-3 my-4 rounded-s-md border-y-[1.5px] border-s-[1.5px] border-black shadow-lg text-center outline-none" />

                    <button onClick={copyPassword}
                    className="bg-[#1848a1] hover:bg-[#182fa1] transition-all duration-150 ease-in-out text-[#fff] py-2 px-4 my-4 rounded-e-md border-y-[1.5px] border-e-[1.5px] border-black shadow-lg">Copy</button>
                </div>

                {/* Range */}
                <div className="flex flex-col items-center gap-4 mt-4 p-2">
                    <input type="range" min={4} max={30} value={length} 
                    className="cursor-pointer w-52 accent-[#1848a1]"
                    onChange={ (e) => {setLength(e.target.value)}} />
                    <label htmlFor="" className="text-lg">Password Length: {length}</label>

                </div>

                {/* Select Option */}
                <div className="w-full flex gap-20 items-center justify-center mt-6">

                    {/* Number */}
                    <div className="flex items-center">
                        <input type="checkbox"
                        defaultChecked={numberAllowed}
                        id="numberInput"
                        className="w-6 h-6 accent-[#1848a1] mr-2"
                        onChange={() => {
                            setNumberAllowed((prev) => !prev);
                        }} />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>


                    {/* Uppercase */}
                    <div className="flex items-center">
                        <input type="checkbox"
                        defaultChecked={capitalLetterAllowed}
                        id="bigInput"
                        className="w-6 h-6 accent-[#1848a1] mr-2"
                        onChange={() => {
                            setCapitalLetterAllowed((prev) => !prev);
                        }} />
                        <label htmlFor="bigInput">Uppercase</label>

                    </div>

                    {/* Smallercase */}
                    <div className="flex items-center">
                        <input type="checkbox"
                        defaultChecked={smallLetterAllowed}
                        id="smallInput"
                        className="w-6 h-6 accent-[#1848a1] mr-2"
                        onChange={() => {
                            setSmallLetterAllowed((prev) => !prev);
                        }} />
                        <label htmlFor="smallInput">Lowercase</label>

                    </div>

                    {/* Symbols */}
                    <div className="flex items-center">
                        <input type="checkbox"
                        defaultChecked={charAllowed}
                        id="charInput"
                        className="w-6 h-6 accent-[#1848a1] mr-2"
                        onChange={() => {
                            setCharAllowed((prev) => !prev);
                        }} />
                        <label htmlFor="charInput">Symbols</label>

                    </div>
                </div>

                <button onClick={generator}
                className="bg-[#1848a1] hover:bg-[#182fa1] text-white px-28 py-3 mt-8 rounded-lg">
                    Generate</button>

            </div>
    );
}

export default PasswordGenerator;