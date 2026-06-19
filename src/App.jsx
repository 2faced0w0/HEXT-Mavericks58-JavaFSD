import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Vehicles from './pages/Vehicles';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RentalAgentDashboard from './pages/Agent/RentalAgentDashboard';
import ReservationCheckout from './pages/Customer/ReservationCheckout';
import MyReservations from './pages/Customer/MyReservations';
import Profile from './pages/Customer/Profile';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/checkout/:id" element={<ReservationCheckout />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agent" element={<RentalAgentDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
