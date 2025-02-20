export default function Button({action}) {
    return (
        <button className="border-2 border-blue-800 text-white bg-blue-400 rounded-md px-3 py-1"
            onClick={action}>Buy Ticket</button>
    );
}