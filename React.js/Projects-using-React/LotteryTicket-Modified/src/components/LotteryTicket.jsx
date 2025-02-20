import { useState } from "react";
import { genTicket, sum } from "./Generator.js";
import Ticket from "./Ticket.jsx";
import Button from "./Button.jsx";

export default function LotteryTicket({n = 3, winCondition}) {

    let [ticket, setTicket] = useState(genTicket(n));

    
    let isWinning = winCondition(ticket);
    let arrSum = sum(ticket);

    let buyTicket = () => {
        setTicket(genTicket(n));
    } 

    return (
        <div className="flex items-center flex-col gap-4 bg-[#292d33] text-white px-24 py-8 rounded-lg">
            <h1 className="text-6xl font-bold">Lottery Ticket</h1>
            <div>
                <Ticket ticket={ticket} />
            </div>

            <p className="text-2xl">Sum: {arrSum}</p>

            <Button action={buyTicket} />

            <p>{isWinning && "Congratulations, you won!"} {!isWinning && "You Lost, try again!"}</p>
        </div>
    );
}