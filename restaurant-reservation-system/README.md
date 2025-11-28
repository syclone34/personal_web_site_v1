# Restaurant Reservation System

A full-stack restaurant reservation system built with **React**, **Node.js**, **Express**, and **SQLite**.

## 🎯 Features

### Customer Features
- **Easy Booking**: Simple and intuitive reservation form
- **Real-time Availability**: Check available time slots before booking
- **Instant Confirmation**: Get immediate confirmation of reservations
- **Contact Information**: Save customer details for future bookings

### Admin Features
- **Dashboard**: View all reservations in one place
- **Status Management**: Update reservation status (pending, confirmed, completed, cancelled)
- **Filtering**: Filter reservations by status
- **Real-time Updates**: Refresh to see latest reservations
- **Summary Statistics**: Quick overview of reservation counts

### System Features
- **Automatic Table Assignment**: System assigns best available table based on party size
- **Conflict Prevention**: Prevents double-booking of tables
- **Time Slot Management**: Restaurant hours from 11:00 AM - 10:00 PM
- **Auto-initialization**: Database and tables created automatically on first run

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn package manager

**That's it!** SQLite is built into Node.js - no separate database installation needed! 🎉

## 🚀 Installation & Setup

### 1. Navigate to Project Directory
```powershell
cd c:\Users\syclo\personal_web_site_v1\restaurant-reservation-system
```

### 2. Backend Setup

```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# The database will be automatically created when you start the server!
```

### 3. Frontend Setup

```powershell
# Open a new terminal, navigate to client directory
cd client

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Start Backend Server (Terminal 1)
```powershell
cd server
npm run dev
```

You should see:
```
Server is running on port 5000
Database connected successfully
Database schema initialized
```

### Start Frontend Application (Terminal 2)
```powershell
cd client
npm start
```

The React app will automatically open at `http://localhost:3000` 🚀

## 📁 Project Structure

```
restaurant-reservation-system/
├── server/                      # Backend (Node.js/Express)
│   ├── config/
│   │   ├── database.js         # SQLite connection & initialization
│   │   └── schema.sql          # Database schema
│   ├── controllers/
│   │   ├── reservationController.js
│   │   └── tableController.js
│   ├── routes/
│   │   ├── reservations.js
│   │   └── tables.js
│   ├── restaurant.db           # SQLite database (auto-created)
│   ├── server.js               # Express server entry point
│   └── package.json
│
└── client/                      # Frontend (React)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js         # Landing page
    │   │   ├── NewReservation.js  # Booking form
    │   │   └── AdminDashboard.js  # Admin panel
    │   ├── services/
    │   │   └── api.js          # API calls to backend
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🗄️ Database Information

### SQLite Benefits
- ✅ **Zero Configuration**: No database server to install or configure
- ✅ **Automatic Setup**: Database and tables created automatically
- ✅ **File-Based**: All data stored in a single `restaurant.db` file
- ✅ **Perfect for Development**: Great for learning and prototyping
- ✅ **Easy Backup**: Just copy the `.db` file

### Database Schema
- **tables**: Restaurant table information (table_number, capacity, location)
- **customers**: Customer contact information
- **reservations**: Reservation details with foreign keys to customers and tables

### Sample Data
The database comes pre-populated with 8 restaurant tables:
- 2-person tables at window seats
- 4-person tables in main dining area
- 6-person table
- 8-person private table
- Bar seating and patio options

## 🔌 API Endpoints

### Reservations
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/:id` - Get reservation by ID
- `GET /api/reservations/available-slots?date=YYYY-MM-DD&partySize=N` - Get available time slots
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Tables
- `GET /api/tables` - Get all tables
- `GET /api/tables/:id` - Get table by ID
- `PUT /api/tables/:id/availability` - Update table availability

## 🎨 Tech Stack

### Frontend
- React 18
- React Router DOM (routing)
- Axios (HTTP client)
- CSS3 (styling)

### Backend
- Node.js
- Express.js (web framework)
- SQLite3 (database)
- dotenv (environment variables)
- cors (cross-origin requests)

## 📝 Usage Guide

### Making a Reservation
1. Click "Make a Reservation" on the home page
2. Fill in your contact information
3. Select date and party size
4. Click "Check Available Times" to see available slots
5. Select a time slot
6. Add any special requests (optional)
7. Click "Confirm Reservation"

### Managing Reservations (Admin)
1. Go to Admin Dashboard
2. View all reservations in the table
3. Use status filter to view specific reservation types
4. Click action buttons to:
   - Confirm pending reservations
   - Mark confirmed reservations as completed
   - Cancel reservations

## 🔧 Development Tips

### Backend Development Mode
```powershell
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development Mode
```powershell
cd client
npm start  # Hot reload enabled
```

### View Database Contents
You can use any SQLite viewer:
- **DB Browser for SQLite**: https://sqlitebrowser.org/
- **VS Code Extension**: SQLite Viewer
- **Command Line**:
  ```powershell
  sqlite3 server/restaurant.db
  .tables
  SELECT * FROM reservations;
  .exit
  ```

### Reset Database
Simply delete the database file and restart the server:
```powershell
cd server
Remove-Item restaurant.db
npm run dev  # Database will be recreated
```

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, Render, or AWS
- The SQLite database file will be included
- Set `PORT` environment variable

### Frontend Deployment
- Build: `npm run build`
- Deploy to Netlify, Vercel, or AWS S3
- Update API URL for production

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

ISC

## 👤 Author

**Cole Fuller**
- Email: crfuller34@gmail.com
- Location: Minneapolis, MN

---

Built with ❤️ using React, Node.js, Express, and SQLite
