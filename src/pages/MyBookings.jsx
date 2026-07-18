import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";

import {
  Calendar,
  MapPin,
  Ticket,
  IndianRupee,
  BadgeCheck,
  Ban,
} from "lucide-react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const res = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openCancelModal = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowModal(true);
  };

  const handleCancelBooking = async () => {
    try {
      setCancelLoading(selectedBooking);

      const token = JSON.parse(localStorage.getItem("user")).token;

      await API.put(
        `/bookings/${selectedBooking}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking cancelled successfully!");

      setShowModal(false);
      setSelectedBooking(null);

      await fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cancellation failed"
      );
    } finally {
      setCancelLoading(null);
    }
  };

  const validBookings = bookings.filter(
    (booking) => booking.event
  );

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={showModal}
        title="Cancel Booking?"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep Booking"
        onConfirm={handleCancelBooking}
        onCancel={() => {
          setShowModal(false);
          setSelectedBooking(null);
        }}
        loading={cancelLoading !== null}
      />

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-center text-4xl font-bold">
            My Bookings
          </h1>

          <p className="mb-10 text-center text-gray-500">
            View and manage all your booked events.
          </p>

          {validBookings.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
              <Ticket
                className="mx-auto mb-4 text-gray-400"
                size={60}
              />

              <h2 className="mb-2 text-2xl font-semibold">
                No Bookings Yet
              </h2>

              <p className="text-gray-500">
                Book your first event and it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {validBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border bg-white shadow-lg transition duration-300 hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
                    <h2 className="text-xl font-bold">
                      {booking.event.title}
                    </h2>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin
                        size={18}
                        className="text-indigo-600"
                      />
                      <span>{booking.event.venue}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar
                        size={18}
                        className="text-indigo-600"
                      />
                      <span>
                        {new Date(
                          booking.event.date
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Ticket
                        size={18}
                        className="text-indigo-600"
                      />
                      <span>
                        {booking.numberOfTickets} Ticket
                        {booking.numberOfTickets > 1
                          ? "s"
                          : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <IndianRupee
                        size={18}
                        className="text-green-600"
                      />
                      <span>₹{booking.totalPrice}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {booking.bookingStatus ===
                      "Cancelled" ? (
                        <>
                          <Ban
                            size={18}
                            className="text-red-500"
                          />
                          <span className="font-semibold text-red-600">
                            Cancelled
                          </span>
                        </>
                      ) : (
                        <>
                          <BadgeCheck
                            size={18}
                            className="text-green-500"
                          />
                          <span className="font-semibold text-green-600">
                            Confirmed
                          </span>
                        </>
                      )}
                    </div>

                    {booking.bookingStatus !==
                      "Cancelled" && (
                      <button
                        onClick={() =>
                          openCancelModal(booking._id)
                        }
                        className="mt-4 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyBookings;