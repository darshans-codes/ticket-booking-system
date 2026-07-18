import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  Calendar,
  MapPin,
  Ticket,
  Smartphone,
  Clock,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";

import API from "../services/api";
import Button from "../components/Button";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const event = state?.event;
  const numberOfTickets = state?.numberOfTickets || 1;

  const upiId = import.meta.env.VITE_UPI_ID;
  const payeeName = import.meta.env.VITE_PAYEE_NAME;

  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Invalid Payment Request</h2>
      </div>
    );
  }

  const totalAmount = event.price * numberOfTickets;

  const upiLink = useMemo(() => {
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${totalAmount}&cu=INR`;
  }, [upiId, payeeName, totalAmount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Payment session expired.");
          navigate("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      toast.success("UPI ID copied.");
    } catch {
      toast.error("Unable to copy UPI ID.");
    }
  };

  const verifyPayment = async () => {
    if (!paid) {
      toast.warning("Please confirm that you've completed the payment.");
      return;
    }

    try {
      setLoading(true);

      // Fake payment verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        "/bookings",
        {
          eventId: event._id,
          numberOfTickets,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Payment Successful!");

      navigate("/my-bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {/* Payment Summary */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold text-slate-800">
            Payment Summary
          </h1>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Ticket className="text-indigo-600" />
              <span className="font-medium">{event.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-600" />
              <span>{event.venue}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-600" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>

            <hr />

            <div className="flex justify-between">
              <span>Tickets</span>
              <span>{numberOfTickets}</span>
            </div>

            <div className="flex justify-between">
              <span>Price / Ticket</span>
              <span>₹{event.price}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-indigo-700">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <Smartphone
              size={52}
              className="mx-auto text-indigo-600"
            />

            <h2 className="mt-4 text-2xl font-bold">
              Pay via UPI
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Scan the QR code using any UPI app
            </p>

            <div className="mx-auto mt-8 flex w-fit rounded-2xl border bg-white p-4 shadow">
              <QRCode value={upiLink} size={220} />
            </div>

            <div className="mt-6 rounded-xl bg-indigo-50 p-4">
              <p className="text-sm text-gray-500">UPI ID</p>

              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="font-semibold text-slate-700">
                  {upiId}
                </span>

                <button
                  onClick={copyUpiId}
                  className="rounded-lg bg-indigo-600 p-2 text-white transition hover:bg-indigo-700"
                >
                  <Copy size={18} />
                </button>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Payee : {payeeName}
              </p>
            </div>

            <a
              href={upiLink}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <ExternalLink size={18} />
              Pay via UPI App
            </a>

            <div className="mt-8 flex items-center justify-center gap-2 text-red-600">
              <Clock size={20} />

              <span className="text-lg font-bold">
                {minutes}:{seconds}
              </span>
            </div>

            <label className="mt-8 flex cursor-pointer items-center justify-center gap-3">
              <input
                type="checkbox"
                checked={paid}
                onChange={() => setPaid(!paid)}
                className="h-5 w-5"
              />

              <span>I have completed the payment.</span>
            </label>

            <div className="mt-8">
              <Button
                onClick={verifyPayment}
                disabled={!paid || loading}
                loading={loading}
              >
                Verify Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;