import TicketNum from "./TicketNum";

export default function Ticket({ticket}) {
    return (
        <div className="text-white bg-blue-400 px-4 py-2 font-bold w-max h-max text-center rounded-lg mt-4 shadow-lg">
            <p className="text-xl">Lottery Ticket</p>
            {
                ticket.map((num, idx) => (
                    <TicketNum num={num} key={idx} />
                ))
            }
            {/* <TicketNum num={ticket[1]} /> */}
        </div>
    );
}