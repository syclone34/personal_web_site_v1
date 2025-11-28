import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationAPI } from '../services/api';

function NewReservation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reservationDate: '',
    reservationTime: '',
    partySize: 2,
    specialRequests: ''
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset time selection when date or party size changes
    if (name === 'reservationDate' || name === 'partySize') {
      setFormData(prev => ({ ...prev, reservationTime: '' }));
      setShowTimeSlots(false);
    }
  };

  const fetchAvailableSlots = async () => {
    if (!formData.reservationDate || !formData.partySize) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await reservationAPI.getAvailableSlots(
        formData.reservationDate,
        formData.partySize
      );
      setAvailableSlots(response.data.availableSlots);
      setShowTimeSlots(true);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch available time slots' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.reservationTime) {
      setMessage({ type: 'error', text: 'Please select a time slot' });
      return;
    }
    
    try {
      setLoading(true);
      await reservationAPI.create(formData);
      setMessage({ type: 'success', text: 'Reservation created successfully!' });
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to create reservation' 
      });
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h2>Make a Reservation</h2>
        
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
                min={getTodayDate()}
                required
              />
            </div>

            <div className="form-group">
              <label>Party Size *</label>
              <select
                name="partySize"
                value={formData.partySize}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                  <option key={size} value={size}>{size} {size === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.reservationDate && formData.partySize && (
            <div style={{ marginBottom: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={fetchAvailableSlots}
                disabled={loading}
              >
                {loading ? 'Checking Availability...' : 'Check Available Times'}
              </button>
            </div>
          )}

          {showTimeSlots && (
            <div className="form-group">
              <label>Select Time *</label>
              {availableSlots.length > 0 ? (
                <div className="time-slots">
                  {availableSlots.map(time => (
                    <div
                      key={time}
                      className={`time-slot ${formData.reservationTime === time ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, reservationTime: time }))}
                    >
                      {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit' 
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#e74c3c', marginTop: '1rem' }}>
                  No available time slots for the selected date and party size. Please try a different date.
                </p>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              placeholder="Any allergies, dietary restrictions, or special occasions?"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !formData.reservationTime}
            >
              {loading ? 'Creating...' : 'Confirm Reservation'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewReservation;
