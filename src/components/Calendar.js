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

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYearInput(e.target.value);
  const handleYearBlur = () => {
    setYear(parseInt(yearInput) || year);
    setIsEditingYear(false);
  };

  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const nextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  const prevYear = () => setYear((prev) => prev - 1);
  const nextYear = () => setYear((prev) => prev + 1);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const daysArray = Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(d => d + 1));

  return (
    <div className="calendar-container">
      <h1 id="calendar-heading">Calendar</h1>

      <div className="calendar-controls">
        <button id="prev-year" onClick={prevYear}>« Year</button>
        <button id="prev-month" onClick={prevMonth}>‹ Month</button>

        <select id="month-select" value={month} onChange={handleMonthChange}>
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
            autoFocus
          />
        ) : (
          <span id="year-text" onDoubleClick={() => setIsEditingYear(true)}>
            {year}
          </span>
        )}

        <button id="next-month" onClick={nextMonth}>Month ›</button>
        <button id="next-year" onClick={nextYear}>Year »</button>
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(daysArray.length / 7) }, (_, row) => (
            <tr key={row}>
              {daysArray.slice(row * 7, row * 7 + 7).map((day, i) => (
                <td key={i}>{day || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
