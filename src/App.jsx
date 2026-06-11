import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Vehicles from './pages/Vehicles';
import AdminDashboard from './pages/AdminDashboard';
import RentalAgentDashboard from './pages/RentalAgentDashboard';
import ReservationCheckout from './pages/ReservationCheckout';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/checkout/:id" element={<ReservationCheckout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<RentalAgentDashboard />} />
      </Routes>
    </>
  )
}

export default App;
