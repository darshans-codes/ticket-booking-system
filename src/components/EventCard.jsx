import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import {
  Calendar,
  MapPin,
  IndianRupee,
  Ticket,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";

function EventCard({ event }) {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.user?.role === "admin";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${event._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Event deleted successfully.");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Banner */}
      <div className="flex h-44 items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <Ticket size={70} className="text-white" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            {event.title}
          </h3>

          {event.availableSeats > 0 ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Available
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
              Sold Out
            </span>
          )}
        </div>

        <p className="mb-5 line-clamp-3 text-gray-600">
          {event.description}
        </p>

        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee size={18} />
              <span className="font-semibold">{event.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <Ticket size={18} />
              <span>{event.availableSeats} Left</span>
            </div>
          </div>
        </div>

        <Link to={`/events/${event._id}`}>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
            View Details
            <ArrowRight size={18} />
          </button>
        </Link>

        {isAdmin && (
          <div className="mt-4 flex gap-3">
            <Link
              to={`/edit-event/${event._id}`}
              className="flex-1"
            >
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600">
                <Pencil size={18} />
                Edit
              </button>
            </Link>

            <button
              onClick={handleDelete}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;