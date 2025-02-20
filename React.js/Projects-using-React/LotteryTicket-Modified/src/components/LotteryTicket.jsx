import { useState } from "react";
import { genTicket, sum } from "./Generator.js";
import Ticket from "./Ticket.jsx";

export default function LotteryTicket({n = 3, winningSum = 15}) {

    let [ticket, setTicket] = useState(genTicket(n));

    

    let isWinning = (sum(ticket) === winningSum);
    // let arrSum = sum(ticket);

    let buyTicket = () => {
        setTicket(genTicket(n));
    } 

    return (
        <div>
            <h1>Lottery Ticket</h1>
            <div>
                <Ticket ticket={ticket} />
            </div>

            {/* <p>Sum: {arrSum}</p> */}

            <button className="border-[1px] border-black text-white bg-blue-400 rounded-md px-2"
            onClick={buyTicket}>Buy Ticket</button>

            <p>{isWinning && "Congratulations, you won!"}</p>
        </div>
    );
}