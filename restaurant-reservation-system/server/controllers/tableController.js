const db = require('../config/database');

// Get all tables
const getAllTables = async (req, res) => {
  try {
    const rows = await db.allAsync('SELECT * FROM tables ORDER BY table_number');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
};

// Get table by ID
const getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await db.getAsync('SELECT * FROM tables WHERE table_id = ?', [id]);
    
    if (!row) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.json(row);
  } catch (error) {
    console.error('Error fetching table:', error);
    res.status(500).json({ error: 'Failed to fetch table' });
  }
};

// Update table availability
const updateTableAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    
    const result = await db.runAsync(
      'UPDATE tables SET is_available = ? WHERE table_id = ?',
      [isAvailable ? 1 : 0, id]
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    res.json({ message: 'Table availability updated' });
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ error: 'Failed to update table' });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  updateTableAvailability
};
