const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router
  .route("/")
  .post(protect, adminOnly, addEvent)
  .get(getAllEvents);

router.get("/:id", getEventById);

router.put("/:id", protect, adminOnly, updateEvent);

router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;