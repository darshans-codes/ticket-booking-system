const express = require("express");
const router = express.Router();
const {
  bookTickets,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");
const { protect,adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, bookTickets);
router.get("/my-bookings", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;