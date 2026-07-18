import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-extrabold">
            Find & Book Amazing Events
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Concerts, Workshops, Sports, Tech Meetups and much more —
            all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Events Found
            </h3>

            <p className="mt-3 text-gray-500">
              Create your first event to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;