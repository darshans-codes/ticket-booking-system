import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  Calendar,
  FileText,
  IndianRupee,
  MapPin,
  Ticket,
  Type,
} from "lucide-react";

import Button from "../components/Button";
import InputField from "../components/InputField";

function CreateEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    totalSeats: "",
    availableSeats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "totalSeats") {
      setFormData((prev) => ({
        ...prev,
        totalSeats: value,
        availableSeats: value,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.venue ||
      !formData.price ||
      !formData.totalSeats
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("user")).token;

      await API.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event created successfully!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold">
            Create New Event
          </h1>

          <p className="mt-2 text-indigo-100">
            Fill in the details below to publish your event.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          <InputField
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            icon={Type}
            required
          />

          <InputField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            icon={FileText}
            rows={5}
            required
          />

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Date"
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              icon={Calendar}
              required
            />

            <InputField
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Event venue"
              icon={MapPin}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Ticket Price (₹)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="500"
              icon={IndianRupee}
              min={0}
              required
            />

            <InputField
              label="Total Seats"
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              placeholder="100"
              icon={Ticket}
              min={1}
              required
            />
          </div>

          <InputField
            label="Available Seats"
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            icon={Ticket}
            disabled
          />

          <Button
            type="submit"
            loading={loading}
          >
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;