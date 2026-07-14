const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/")
  .post(protect,addEvent)
  .get(getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);


module.exports = router;