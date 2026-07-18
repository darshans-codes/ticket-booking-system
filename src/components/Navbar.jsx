import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.user?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-gray-700 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
          onClick={() => setMenuOpen(false)}
        >
          TicketHub
        </Link>

        {/* Navigation */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col bg-white shadow-md md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:shadow-none`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="mx-6 my-3 rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700 md:m-0"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
              >
                My Bookings
              </Link>

              {isAdmin && (
                <>
                  <Link
                    to="/admin-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/create-event"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
                  >
                    Create Event
                  </Link>

                  <Link
                    to="/all-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 font-medium text-gray-700 transition hover:text-blue-600 md:px-0 md:py-0"
                  >
                    All Bookings
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="mx-6 my-3 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 md:m-0"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;