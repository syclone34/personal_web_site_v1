const express = require('express');
const router = express.Router();
const {
  getAllTables,
  getTableById,
  updateTableAvailability
} = require('../controllers/tableController');

// GET all tables
router.get('/', getAllTables);

// GET table by ID
router.get('/:id', getTableById);

// PUT update table availability
router.put('/:id/availability', updateTableAvailability);

module.exports = router;
