import React, { useState } from "react";
import Calendar from "react-calendar";
import { HDate } from "hebcal";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const HebrewCalendar = () => {
  const [date, setDate] = useState(new Date()); // Store the selected date
  const [isHebrew, setIsHebrew] = useState(false); // Track if Hebrew calendar is active

  // Function to handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to toggle between Hebrew and Gregorian calendar
  const toggleCalendar = () => {
    setIsHebrew(!isHebrew);
  };

  // Function to get the Hebrew date
  const getHebrewDate = (date) => {
    const hebrewDate = new HDate(date);
    return hebrewDate.toString(); // Return Hebrew date string, e.g., "1 Tishrei 5784"
  };

  // Get formatted date based on calendar type (Hebrew or Gregorian)
  const formattedDate = isHebrew ? getHebrewDate(date) : date.toLocaleDateString();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>

      {/* Button to toggle between Hebrew and Gregorian calendars */}
      <button
        onClick={toggleCalendar}
        className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        {isHebrew ? "Switch to Gregorian" : "Switch to Hebrew"}
      </button>

      {/* Display the selected date */}
      <p>Selected Date: {formattedDate}</p>

      {/* Render the calendar component */}
      <Calendar
        onChange={handleDateChange}
        value={date}
        calendarType={isHebrew ? "Hebrew" : "Gregorian"}
      />
    </div>
  );
};

export default HebrewCalendar;
