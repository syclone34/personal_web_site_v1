const express = require('express');
const router = express.Router();
const {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  cancelReservation,
  getAvailableSlots
} = require('../controllers/reservationController');

// GET all reservations
router.get('/', getAllReservations);

// GET available time slots
router.get('/available-slots', getAvailableSlots);

// GET reservation by ID
router.get('/:id', getReservationById);

// POST create new reservation
router.post('/', createReservation);

// PUT update reservation
router.put('/:id', updateReservation);

// DELETE/cancel reservation
router.delete('/:id', cancelReservation);

module.exports = router;
