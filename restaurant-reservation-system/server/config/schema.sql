-- SQLite Schema for Restaurant Reservation System

-- Tables table (restaurant tables/seating)
CREATE TABLE IF NOT EXISTS tables (
    table_id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_number INTEGER UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    location TEXT,
    is_available INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    table_id INTEGER,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    special_requests TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES tables(table_id) ON DELETE SET NULL,
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Insert sample tables
INSERT OR IGNORE INTO tables (table_number, capacity, location) VALUES
(1, 2, 'window'),
(2, 2, 'window'),
(3, 4, 'main'),
(4, 4, 'main'),
(5, 6, 'main'),
(6, 8, 'private'),
(7, 2, 'bar'),
(8, 4, 'patio');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_customer ON reservations(customer_id);
CREATE INDEX IF NOT EXISTS idx_reservations_table ON reservations(table_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Trigger to automatically update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_reservations_updated_at 
AFTER UPDATE ON reservations
FOR EACH ROW
BEGIN
    UPDATE reservations SET updated_at = CURRENT_TIMESTAMP WHERE reservation_id = NEW.reservation_id;
END;
