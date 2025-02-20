import './App.css';
import TicketNum from './components/TicketNum';
import Ticket from './components/Ticket';
import LotteryTicket from './components/LotteryTicket';
import { sum } from './components/Generator';

function App() {

  let winCondition = (ticket) => {
    return sum(ticket) === 15;
    // return ticket.every((num) => num === ticket[0]);
    // return ticket[0] === 0;
  }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>

      <LotteryTicket n={3} winCondition={winCondition} />

      {/* <Ticket ticket={[1, 2, 3, 4, 5]} />
      <Ticket ticket={[1, 2, 3]} />
      <Ticket ticket={[1, 2, 3, 4, 5, 6, 7]} />
      <Ticket ticket={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} /> */}
    </div>
  )
}

export default App;
