import React, { useState } from "react";
import Calendar from "react-calendar"; // Importing the calendar component
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

function CreateListing({ addPost }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    volunteersNeeded: 0,
    type: "bochur", // Default to "bochur" for new posts
  });

  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date
  const [calendarVisible, setCalendarVisible] = useState(false); // Track if the calendar is visible

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date change from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
    setFormData((prev) => ({ ...prev, date: date.toLocaleDateString() })); // Set the form data date
    setCalendarVisible(false); // Close the calendar after date is selected
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData); // Call addPost to add the new post to the board
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      volunteersNeeded: 0,
      type: "bochur",
    }); // Reset form after submitting
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>

      {/* Create Listing Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Select Type (Bochur/Girl)</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="bochur">Bochur</option>
            <option value="girl">Girl</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Display the Date Field */}
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date || selectedDate.toLocaleDateString()}
            onClick={toggleCalendar} // Open calendar when clicked
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Display Calendar when the user clicks on the Date input */}
        {calendarVisible && (
          <div className="absolute bg-white shadow-lg p-4 mt-2 rounded-lg">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        )}

        <div>
          <label className="block text-gray-700">Volunteers Needed</label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
