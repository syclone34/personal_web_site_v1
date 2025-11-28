import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewReservation from './pages/NewReservation';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-content">
            <h1>🍽️ Restaurant Reservations</h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/new-reservation">Make Reservation</Link>
              <Link to="/admin">Admin</Link>
            </nav>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-reservation" element={<NewReservation />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
