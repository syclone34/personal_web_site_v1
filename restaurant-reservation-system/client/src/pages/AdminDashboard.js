import React, { useState, useEffect } from 'react';
import { reservationAPI } from '../services/api';

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await reservationAPI.getAll();
      setReservations(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch reservations' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reservationAPI.update(id, { status: newStatus });
      setMessage({ type: 'success', text: 'Reservation status updated' });
      fetchReservations();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update reservation' });
    }
  };

  const handleCancelReservation = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await reservationAPI.cancel(id);
        setMessage({ type: 'success', text: 'Reservation cancelled' });
        fetchReservations();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to cancel reservation' });
      }
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container">
      <div className="card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Reservations Dashboard</h2>
          <button 
            className="btn btn-primary"
            onClick={fetchReservations}
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ marginRight: '1rem', fontWeight: 'bold' }}>Filter by Status:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '2px solid #e0e0e0' }}
          >
            <option value="all">All Reservations</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading reservations...</div>
        ) : filteredReservations.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
            No reservations found
          </p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Party Size</th>
                  <th>Table</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map(reservation => (
                  <tr key={reservation.reservation_id}>
                    <td>#{reservation.reservation_id}</td>
                    <td>
                      {reservation.first_name} {reservation.last_name}
                    </td>
                    <td>
                      <div>{reservation.email}</div>
                      <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                        {reservation.phone}
                      </div>
                    </td>
                    <td>{formatDate(reservation.reservation_date)}</td>
                    <td>{formatTime(reservation.reservation_time)}</td>
                    <td>{reservation.party_size}</td>
                    <td>
                      {reservation.table_number ? (
                        <span>Table #{reservation.table_number}</span>
                      ) : (
                        <span style={{ color: '#e67e22' }}>Not assigned</span>
                      )}
                    </td>
                    <td>
                      <span className={getStatusClass(reservation.status)}>
                        {reservation.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {reservation.status === 'pending' && (
                          <button
                            className="btn btn-success"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => handleStatusChange(reservation.reservation_id, 'confirmed')}
                          >
                            Confirm
                          </button>
                        )}
                        {reservation.status === 'confirmed' && (
                          <button
                            className="btn btn-success"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => handleStatusChange(reservation.reservation_id, 'completed')}
                          >
                            Complete
                          </button>
                        )}
                        {reservation.status !== 'cancelled' && reservation.status !== 'completed' && (
                          <button
                            className="btn btn-danger"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => handleCancelReservation(reservation.reservation_id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '4px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>Total:</strong> {reservations.length}
            </div>
            <div>
              <strong>Pending:</strong> {reservations.filter(r => r.status === 'pending').length}
            </div>
            <div>
              <strong>Confirmed:</strong> {reservations.filter(r => r.status === 'confirmed').length}
            </div>
            <div>
              <strong>Completed:</strong> {reservations.filter(r => r.status === 'completed').length}
            </div>
            <div>
              <strong>Cancelled:</strong> {reservations.filter(r => r.status === 'cancelled').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
