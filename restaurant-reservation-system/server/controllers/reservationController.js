const db = require('../config/database');

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const sql = `
      SELECT 
        r.reservation_id, r.reservation_date, r.reservation_time, 
        r.party_size, r.status, r.special_requests,
        c.first_name, c.last_name, c.email, c.phone,
        t.table_number, t.capacity, t.location
      FROM reservations r
      JOIN customers c ON r.customer_id = c.customer_id
      LEFT JOIN tables t ON r.table_id = t.table_id
      ORDER BY r.reservation_date DESC, r.reservation_time DESC
    `;
    const rows = await db.allAsync(sql);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT 
        r.*, 
        c.first_name, c.last_name, c.email, c.phone,
        t.table_number, t.capacity, t.location
      FROM reservations r
      JOIN customers c ON r.customer_id = c.customer_id
      LEFT JOIN tables t ON r.table_id = t.table_id
      WHERE r.reservation_id = ?
    `;
    const row = await db.getAsync(sql, [id]);
    
    if (!row) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(row);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
};

// Create new reservation
const createReservation = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, reservationDate, reservationTime, partySize, specialRequests } = req.body;
    
    // Check if customer exists
    const customerCheck = await db.getAsync('SELECT customer_id FROM customers WHERE email = ?', [email]);
    
    let customerId;
    if (!customerCheck) {
      // Create new customer
      const result = await db.runAsync(
        'INSERT INTO customers (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, phone]
      );
      customerId = result.lastID;
    } else {
      customerId = customerCheck.customer_id;
    }
    
    // Find available table
    const availableTable = await db.getAsync(`
      SELECT table_id FROM tables 
      WHERE capacity >= ?
      AND is_available = 1
      AND table_id NOT IN (
        SELECT table_id FROM reservations 
        WHERE reservation_date = ?
        AND reservation_time = ?
        AND status IN ('pending', 'confirmed')
        AND table_id IS NOT NULL
      )
      ORDER BY capacity ASC
      LIMIT 1
    `, [partySize, reservationDate, reservationTime]);
    
    const tableId = availableTable ? availableTable.table_id : null;
    
    // Create reservation
    const result = await db.runAsync(`
      INSERT INTO reservations 
      (customer_id, table_id, reservation_date, reservation_time, party_size, special_requests, status)
      VALUES (?, ?, ?, ?, ?, ?, 'confirmed')
    `, [customerId, tableId, reservationDate, reservationTime, partySize, specialRequests]);
    
    res.status(201).json({ 
      message: 'Reservation created successfully', 
      reservation_id: result.lastID
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

// Update reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservationDate, reservationTime, partySize, status, specialRequests } = req.body;
    
    const updates = [];
    const params = [];
    
    if (reservationDate) {
      updates.push('reservation_date = ?');
      params.push(reservationDate);
    }
    if (reservationTime) {
      updates.push('reservation_time = ?');
      params.push(reservationTime);
    }
    if (partySize) {
      updates.push('party_size = ?');
      params.push(partySize);
    }
    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (specialRequests !== undefined) {
      updates.push('special_requests = ?');
      params.push(specialRequests);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    params.push(id);
    const sql = `UPDATE reservations SET ${updates.join(', ')} WHERE reservation_id = ?`;
    
    const result = await db.runAsync(sql, params);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

// Cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.runAsync(
      "UPDATE reservations SET status = 'cancelled' WHERE reservation_id = ?",
      [id]
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ error: 'Failed to cancel reservation' });
  }
};

// Get available time slots for a date
const getAvailableSlots = async (req, res) => {
  try {
    const { date, partySize } = req.query;
    
    // Define restaurant hours (11:00 AM - 10:00 PM)
    const timeSlots = [];
    for (let hour = 11; hour < 22; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00:00`);
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30:00`);
    }
    
    // Check availability for each time slot
    const availableSlots = [];
    for (const time of timeSlots) {
      const result = await db.getAsync(`
        SELECT COUNT(*) as available_tables FROM tables 
        WHERE capacity >= ?
        AND table_id NOT IN (
          SELECT table_id FROM reservations 
          WHERE reservation_date = ?
          AND reservation_time = ?
          AND status IN ('pending', 'confirmed')
          AND table_id IS NOT NULL
        )
      `, [partySize, date, time]);
      
      if (result.available_tables > 0) {
        availableSlots.push(time);
      }
    }
    
    res.json({ date, partySize, availableSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  cancelReservation,
  getAvailableSlots
};
