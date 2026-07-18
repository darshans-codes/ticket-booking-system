import { Link } from "react-router-dom";
import { CalendarDays, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={30} className="text-indigo-400" />

              <h2 className="text-2xl font-bold text-white">
                EventHub
              </h2>
            </div>

            <p className="mt-4 leading-7 text-gray-400">
              Discover amazing events, book tickets instantly,
              and manage all your bookings with a smooth and
              modern experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="hover:text-indigo-400 transition"
              >
                Home
              </Link>

              <Link
                to="/my-bookings"
                className="hover:text-indigo-400 transition"
              >
                My Bookings
              </Link>

              <Link
                to="/create-event"
                className="hover:text-indigo-400 transition"
              >
                Create Event
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>your@email.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {year} EventHub. Built with React, Node.js, Express &
          MongoDB.
        </div>
      </div>
    </footer>
  );
}

export default Footer;