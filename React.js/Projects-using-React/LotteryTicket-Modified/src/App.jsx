import './App.css';
import TicketNum from './components/TicketNum';
import Ticket from './components/Ticket';

function App() {

  return (
    <div className='w-full h-screen flex items-center flex-col'>
      <Ticket ticket={[1, 2, 3, 4, 5]} />
      <Ticket ticket={[1, 2, 3]} />
      <Ticket ticket={[1, 2, 3, 4, 5, 6, 7]} />
      <Ticket ticket={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} />
    </div>
  )
}

export default App;
