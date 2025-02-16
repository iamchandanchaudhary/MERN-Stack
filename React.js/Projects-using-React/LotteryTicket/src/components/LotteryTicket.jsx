import { useState } from "react";
import { genTicket, sum } from "./Generator.js";

export default function LotteryTicket() {

    let [ticket, setTicket] = useState([0, 0, 0]);

    // console.log(genTicket(3));
    let generate = () => {
        setTicket(genTicket(3));
    } 

    let isWinning = (sum(ticket) === 15);
    // let isStart = (sum(ticket) === 0);
    // console.log(sum(ticket));
    let arrSum = sum(ticket);

    // setArrSum(sum(ticket));

    function check () {
        if(sum(ticket) === 15) {
            return "Congratulations, you won!";
        }
        else if(sum(ticket) === 0) {
            return "---";
        } else {
            return "You Lost!";
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <div className="bg-[#292d33] text-white w-max px-24 py-8 flex flex-col items-center gap-4 rounded-lg shadow-lg">
                <h1 className="text-6xl font-bold">Lottery Ticket</h1>
                <div className="text-4xl flex bg-white text-[#292d33] mt-4 border-black border-2 rounded transition-all duration-200 ease-in-out">
                    <span className="border-e-2 border-black px-4 py-1">{ticket[0]}</span>
                    <span className="border-e-2 border-black px-4 py-1">{ticket[1]}</span>
                    <span className=" px-4 py-1">{ticket[2]}</span>
                </div>

                <p className="text-2xl">Sum: {arrSum}</p>

                <button className="border-[2px] border-[#202124] text-xl text-[#292d33] bg-white rounded-md px-4 py-1"
                onClick={generate}>Generate</button>

                {/* <p>{isStart && "---"} {isWinning && "Congratulations, you won!"} {!isWinning && "You Lost!"}</p> */}
                <p>{check()}</p>

            </div>
        </div>
    );
}