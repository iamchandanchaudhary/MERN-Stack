export default function Button({action}) {
    return (
        <button className="text-lg border-2 border-black text-[#292d33] bg-white rounded-md px-4 py-1"
            onClick={action}>Buy Ticket</button>
    );
}