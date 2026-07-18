import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  Calendar,
  MapPin,
  IndianRupee,
  Ticket,
  Plus,
  Minus,
} from "lucide-react";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load event");
      }
    };

    fetchEvent();
  }, [id]);

  const proceedToPayment = () => {
    if (!user) {
      toast.warning("Please login first!");
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        event,
        numberOfTickets,
      },
    });
  };

  if (!event) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center text-white">
          <Ticket size={70} className="mx-auto mb-4" />

          <h1 className="text-5xl font-bold">{event.title}</h1>

          <p className="mt-4 text-lg text-blue-100">
            {event.description}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-3">
        {/* Event Information */}
        <div className="rounded-2xl bg-white p-8 shadow-lg lg:col-span-2">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Event Details
          </h2>

          <div className="space-y-6 text-lg text-gray-700">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" />
              <span>{event.venue}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-3">
              <IndianRupee className="text-green-600" />
              <span className="font-semibold">
                ₹{event.price} per ticket
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Ticket className="text-purple-600" />
              <span>
                {event.availableSeats} / {event.totalSeats} seats available
              </span>
            </div>

            {event.availableSeats > 0 ? (
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                Available
              </span>
            ) : (
              <span className="inline-block rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Booking Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            Book Tickets
          </h2>

          <p className="mb-3 text-gray-600">
            Select number of tickets
          </p>

          <div className="mb-8 flex items-center justify-center gap-5">
            <button
              onClick={() =>
                setNumberOfTickets(Math.max(1, numberOfTickets - 1))
              }
              className="rounded-full bg-gray-200 p-3 transition hover:bg-gray-300"
            >
              <Minus size={20} />
            </button>

            <span className="text-3xl font-bold">
              {numberOfTickets}
            </span>

            <button
              onClick={() =>
                setNumberOfTickets(
                  Math.min(event.availableSeats, numberOfTickets + 1)
                )
              }
              disabled={event.availableSeats === 0}
              className="rounded-full bg-gray-200 p-3 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="mb-6 rounded-xl bg-blue-50 p-4">
            <p className="text-gray-700">
              Total Price
            </p>

            <h3 className="text-3xl font-bold text-blue-700">
              ₹{event.price * numberOfTickets}
            </h3>
          </div>

          <button
            onClick={proceedToPayment}
            disabled={event.availableSeats === 0}
            className={`w-full rounded-xl py-4 text-lg font-semibold text-white transition ${
              event.availableSeats > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {event.availableSeats > 0
              ? "Proceed to Payment"
              : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;