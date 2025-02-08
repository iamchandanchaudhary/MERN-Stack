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

    return (
        <div>
            <h1>Lottery Ticket</h1>
            <div>
                <span>{ticket[0]}</span>
                <span>{ticket[1]}</span>
                <span>{ticket[2]}</span>
            </div>

            <p>Sum: {arrSum}</p>

            <button className="border-[1px] border-black text-white bg-blue-400 rounded-md px-2"
            onClick={generate}>Generate</button>

            <p>{isWinning && "Congratulations, you won!"}</p>
        </div>
    );
}