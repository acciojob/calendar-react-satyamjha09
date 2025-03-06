import React, { useState } from "react";

const Calendar = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year);

  // Function to get days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of the month
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  // Handle year change
  const handleYearChange = (e) => {
    setYearInput(e.target.value);
  };

  // Confirm year change
  const handleYearBlur = () => {
    setYear(parseInt(yearInput) || year);
    setIsEditingYear(false);
  };

  // Navigate months
  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const nextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  // Navigate years
  const prevYear = () => setYear((prev) => prev - 1);
  const nextYear = () => setYear((prev) => prev + 1);

  // Generate days for the calendar
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const daysArray = Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(d => d + 1));

  return (
    <div className="flex flex-col items-center p-4">
      <h1 id="calendar-heading" className="text-2xl font-bold">Calendar</h1>

      <div className="flex gap-4 mt-4">
        <button id="prev-year" onClick={prevYear} className="p-2 border rounded">« Year</button>
        <button id="prev-month" onClick={prevMonth} className="p-2 border rounded">‹ Month</button>

        <select id="month-select" value={month} onChange={handleMonthChange} className="p-2 border rounded">
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={yearInput}
            onChange={handleYearChange}
            onBlur={handleYearBlur}
            className="p-2 border rounded w-20 text-center"
            autoFocus
          />
        ) : (
          <span id="year-text" className="p-2 border rounded cursor-pointer" onDoubleClick={() => setIsEditingYear(true)}>
            {year}
          </span>
        )}

        <button id="next-month" onClick={nextMonth} className="p-2 border rounded">Month ›</button>
        <button id="next-year" onClick={nextYear} className="p-2 border rounded">Year »</button>
      </div>

      <table id="calendar-table" className="border mt-4">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(daysArray.length / 7) }, (_, row) => (
            <tr key={row}>
              {daysArray.slice(row * 7, row * 7 + 7).map((day, i) => (
                <td key={i} className="border p-2 text-center">{day || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
