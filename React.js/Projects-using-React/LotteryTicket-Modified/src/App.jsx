import './App.css';
// import LotteryTicket from './components/LotteryTicket';
import TicketNum from './components/TicketNum';
import Ticket from './components/Ticket';

function App() {

  return (
    <>
      <Ticket ticket={[1, 2, 3]} />
    </>
  )
}

export default App
