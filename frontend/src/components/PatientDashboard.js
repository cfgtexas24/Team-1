import React, { useState, useRef } from 'react';
import LabReport from './common/LabReport';

const PatientDashboard = () => {
  const notificationsRef = useRef(null);
  const labReportsRef = useRef(null);
  const appointmentsRef = useRef(null);
  const calendarRef = useRef(null);

  const scrollTo = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const [patient, setPatient] = useState({
    name: "Jane Doe",
    age: 28,
  });

  const [labs, setLabs] = useState([
    'Lab 1: Details about lab report 1.',
    'Lab 2: Details about lab report 2.',
  ]);

  const [upcomingAppointment, setUpcomingAppointment] = useState({
    date: '08/08/2025',
    info: 'Appointment details go here.',
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-800 text-white p-8 flex flex-col items-center">
        <h1 className="text-2xl mb-4">Hello, <b>{patient.name}</b></h1>
        <ul className="space-y-4">
          <li><button onClick={() => scrollTo(notificationsRef)} className="hover:underline">Notifications</button></li>
          <li><button onClick={() => scrollTo(labReportsRef)} className="hover:underline">Lab Report</button></li>
          <li><button onClick={() => scrollTo(appointmentsRef)} className="hover:underline">Appointments</button></li>
          <li><button onClick={() => scrollTo(calendarRef)} className="hover:underline">Calendar</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <section ref={notificationsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <p>No new notifications at this time.</p>
        </section>

        <section ref={labReportsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Latest Lab Reports:</h2>
          <div className="space-y-4">
            {labs.map((lab, index) => (
              <LabReport key={index} lab={lab} />
            ))}
          </div>
        </section>

        <section ref={appointmentsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointment</h2>
          <p>
            You have an appointment on <b>{upcomingAppointment.date}</b>.
          </p>
          <p>{upcomingAppointment.info}</p>
        </section>

        <section ref={calendarRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <p>Here you can find your latest appointments and scheduled services.</p>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;