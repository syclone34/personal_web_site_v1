import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Welcome to Our Restaurant
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '2rem' }}>
          Reserve your table in seconds and enjoy an unforgettable dining experience
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary" 
            style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            onClick={() => navigate('/new-reservation')}
          >
            Make a Reservation
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            onClick={() => navigate('/admin')}
          >
            View All Reservations
          </button>
        </div>
      </div>

      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>⏰ Quick Booking</h3>
          <p style={{ color: '#7f8c8d' }}>
            Reserve your table in less than 2 minutes with our easy-to-use booking system
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>✓ Instant Confirmation</h3>
          <p style={{ color: '#7f8c8d' }}>
            Get immediate confirmation of your reservation via email
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>🪑 Best Tables</h3>
          <p style={{ color: '#7f8c8d' }}>
            We automatically assign the best available table for your party size
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '3rem', backgroundColor: '#ecf0f1' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Opening Hours</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#34495e' }}>Monday - Friday</p>
            <p style={{ color: '#7f8c8d' }}>11:00 AM - 10:00 PM</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#34495e' }}>Saturday - Sunday</p>
            <p style={{ color: '#7f8c8d' }}>11:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
