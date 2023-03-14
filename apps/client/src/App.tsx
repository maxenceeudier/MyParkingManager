import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import ParkingPage from './pages/ParkingPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/Home' Component={Home}/>
        <Route path='/parking/:name/:numOfNiv' Component={ParkingPage}/>
        <Route path='/tickets' Component={TicketsPage}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
      </Routes>
    </Router>
  )
}
export default App;