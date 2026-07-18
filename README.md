# 🎟️ TicketHub - MERN Event Ticket Booking System

A full-stack Event Ticket Booking web application built using the MERN Stack. Users can browse events, book tickets, make a simulated UPI payment, and manage their bookings. Admins can create and manage events through a protected dashboard.

---

## 🚀 Features

### 👤 User
- User Registration & Login (JWT Authentication)
- Browse all events
- Search and filter events
- View event details
- Book tickets
- Simulated UPI payment with QR code
- View My Bookings
- Cancel bookings

### 👨‍💼 Admin
- Secure Admin Login
- Create new events
- Delete events
- Admin Dashboard
- View event statistics
- Protected admin routes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```
TicketHub/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/darshans-codes/ticket-booking-system.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Server (.env)

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

### Client (.env)

```env
VITE_UPI_ID=your-upi-id@upi
VITE_PAYEE_NAME=Your Name
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Event Details
- Payment Page
- My Bookings
- Create Event
- Admin Dashboard

---

## 📌 Future Improvements

- Edit Event
- Real Payment Gateway Integration
- Email Notifications
- Event Images Upload
- Deployment

---

## 👨‍💻 Author

**Darshan S**

GitHub: https://github.com/darshans-codes

---

## 📄 License

This project is created for learning and portfolio purposes.