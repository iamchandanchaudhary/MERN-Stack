import TicketNum from "./TicketNum";

export default function Ticket({ticket}) {
    return (
        <div className="text-[#292d33] bg-white w-max h-max text-center rounded-md mt-4 shadow-lg py-1 border-2 border-black">
            {
                ticket.map((num, idx) => (
                    <TicketNum num={num} key={idx} />
                ))
            }
        </div>
    );
}