const Event = require("../models/Event");

// Add Event
const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      price,
      totalSeats,
      availableSeats,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      price,
      totalSeats,
      availableSeats,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Event By ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  getEventById,
};