import { useEffect, useState } from "react";
import API from "../services/api";
import {
  CalendarDays,
  Users,
  Ticket,
  IndianRupee,
  Armchair,
} from "lucide-react";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const { data } = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setDashboard(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        No dashboard data found.
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: dashboard.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Events",
      value: dashboard.totalEvents || 0,
      icon: CalendarDays,
      color: "bg-green-500",
    },
    {
      title: "Total Bookings",
      value: dashboard.totalBookings || 0,
      icon: Ticket,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `₹${(dashboard.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-yellow-500",
    },
    {
      title: "Available Seats",
      value: dashboard.availableSeats || 0,
      icon: Armchair,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white ${card.color}`}
                >
                  <Icon size={24} />
                </div>

                <p className="text-gray-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Recent Events */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold">
            Recent Events
          </h2>

          {dashboard.recentEvents?.length > 0 ? (
            <div className="space-y-4">
              {dashboard.recentEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {event.venue}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{event.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold">
            Recent Bookings
          </h2>

          {dashboard.recentBookings?.length > 0 ? (
            <div className="space-y-4">
              {dashboard.recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {booking.user?.name || "Unknown User"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {booking.event?.title || "Event Deleted"}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{booking.totalPrice || 0}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No bookings found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;