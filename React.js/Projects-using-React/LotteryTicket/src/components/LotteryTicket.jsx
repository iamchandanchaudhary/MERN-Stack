import { useState } from "react";
import { genTicket, sum } from "./Generator.js";

export default function LotteryTicket() {

    let [ticket, setTicket] = useState([0, 0, 0]);

    // console.log(genTicket(3));
    let generate = () => {
        setTicket(genTicket(3));
    } 

    let isWinning = (sum(ticket) === 15);
    // console.log(sum(ticket));
    let arrSum = sum(ticket);

    // setArrSum(sum(ticket));

    // let check = () => {
    //     if(isWinning) {
    //         return "Congratulations, you won!";
    //     }
    //     else if(!isWinning) {
    //         return "You Lost!";
    //     }
    // }

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <div className="bg-blue-400 text-white w-max px-12 py-4 flex flex-col items-center gap-4 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold">Lottery Ticket</h1>
                <div className="text-xl flex bg-white text-blue-400  border-black border-2 rounded transition-all duration-200 ease-in-out">
                    <span className="border-e-2 border-black px-4 py-1">{ticket[0]}</span>
                    <span className="border-e-2 border-black px-4 py-1">{ticket[1]}</span>
                    <span className=" px-4 py-1">{ticket[2]}</span>
                </div>

                <p>Sum: {arrSum}</p>

                <button className="border-[2px] border-gray-600 text-blue-400 bg-white rounded-md px-4 py-1"
                onClick={generate}>Generate</button>

                <p>{isWinning && "Congratulations, you won!"} {!isWinning && "You Lost!"}</p>
                {/* <p>{check}</p> */}

            </div>
        </div>
    );
}