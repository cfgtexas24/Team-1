import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

const CustomDay = ({ highlightedDays, day, outsideCurrentMonth, ...other }) => {
  // Get counts for this specific day
  const dayStr = day.format('YYYY-MM-DD');
  const appointmentCount = highlightedDays.appointments[dayStr] || 0;
  const classCount = highlightedDays.classes[dayStr] || 0;

  // Only show badge if there are events and the day is in the current month
  const shouldShowBadge = !outsideCurrentMonth && (appointmentCount > 0 || classCount > 0);

  // create seperate badges for appointments and classes scheduled on a day
  const badgeContent = shouldShowBadge ? (
    <div className="flex flex-col items-center text-xs">
      {appointmentCount > 0 && (
        <span className="bg-blue-500 text-white px-1 rounded-sm mb-0.5">
          {appointmentCount}
        </span>
      )}
      {classCount > 0 && (
        <span className="bg-green-500 text-white px-1 rounded-sm">
          {classCount}
        </span>
      )}
    </div>
  ) : undefined;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

const PatientCalendar = ({ appointments = [], classes = [] }) => {
  const [highlightedDays, setHighlightedDays] = useState({
    appointments: {},
    classes: {}
  });

  useEffect(() => {
    // Create objects to store counts by date
    const appointmentCounts = {};
    const classCounts = {};

    // Count appointments per day
    appointments.forEach(apt => {
      const dateStr = dayjs(apt.date).format('YYYY-MM-DD');
      appointmentCounts[dateStr] = (appointmentCounts[dateStr] || 0) + 1;
    });

    // Count classes per day
    classes.forEach(cls => {
      const dateStr = dayjs(cls.date).format('YYYY-MM-DD');
      classCounts[dateStr] = (classCounts[dateStr] || 0) + 1;
    });

    setHighlightedDays({
      appointments: appointmentCounts,
      classes: classCounts
    });
  }, [appointments, classes]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{
          day: CustomDay
        }}
        slotProps={{
          day: {
            highlightedDays
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default PatientCalendar;