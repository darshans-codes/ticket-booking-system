const User = require("../models/user");
const Event = require("../models/Event");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalEvents = await Event.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "Confirmed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const seatsResult = await Event.aggregate([
      {
        $group: {
          _id: null,
          availableSeats: {
            $sum: "$availableSeats",
          },
        },
      },
    ]);

    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBookings = await Booking.find()
      .populate("user", "name")
      .populate("event", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalBookings,
      totalRevenue: revenueResult[0]?.totalRevenue || 0,
      availableSeats: seatsResult[0]?.availableSeats || 0,
      recentEvents,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};