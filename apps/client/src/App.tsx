import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import ParkingPage from './pages/ParkingPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home';


function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/parking/:name' Component={ParkingPage}/>
        <Route path='/tickets' Component={TicketsPage}/>
      </Routes>
    </Router>
  )
}
export default App;