import './App.css';
// import LotteryTicket from './components/LotteryTicket';
import TicketNum from './components/TicketNum';
import Ticket from './components/Ticket';

function App() {

  return (
    <div className='w-full h-screen flex items-center flex-col'>
      <Ticket ticket={[1, 2, 3, 4, 5]} />
      <Ticket ticket={[1, 2, 3]} />
      <Ticket ticket={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
  )
}

export default App
