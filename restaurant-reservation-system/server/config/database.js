const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.join(__dirname, '..', 'restaurant.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully');
    initializeDatabase();
  }
});

// Initialize database with schema
function initializeDatabase() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the entire schema as one script
    db.exec(schema, (err) => {
      if (err) {
        console.error('Schema error:', err.message);
      } else {
        console.log('Database schema initialized');
      }
    });
  }
}

// Promisify database methods for async/await
db.runAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

db.getAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.allAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = db;
