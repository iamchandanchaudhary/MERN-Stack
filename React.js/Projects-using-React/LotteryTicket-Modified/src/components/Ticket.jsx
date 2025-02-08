import TicketNum from "./TicketNum";

export default function Ticket({ticket}) {
    return (
        <div>
            <TicketNum num={ticket[1]} />
        </div>
    );
}