import { useState } from "react";
import { genTicket, sum } from "./Generator.js";
import Ticket from "./Ticket.jsx";

export default function LotteryTicket(n, winningSum) {

    let [ticket, setTicket] = useState(genTicket(n));

    let buyTicket = () => {
        setTicket(genTicket(3));
    } 

    let isWinning = (sum(ticket) === winningSum);
    let arrSum = sum(ticket);

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
            onClick={buyTicket}>Generate</button>

            <p>{isWinning && "Congratulations, you won!"}</p>
        </div>
    );
}