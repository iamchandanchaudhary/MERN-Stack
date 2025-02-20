import TicketNum from "./TicketNum";

export default function Ticket({ticket}) {
    return (
        <div className="text-[#292d33] bg-white w-max h-max text-center mt-4 shadow-lg py-[3px] border-y-2 border-x-[1px] border-black">
            {
                ticket.map((num, idx) => (
                    <TicketNum num={num} key={idx} />
                ))
            }
        </div>
    );
}