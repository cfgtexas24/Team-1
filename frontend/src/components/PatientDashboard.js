import React from 'react'
import { useState, useEffect, useRef } from 'react'

import LabReport from './common/LabReport'
import PatientCalendar from './common/PatientCalendar'

// todo:
// list latest labs report
// list upcoming appointment
// form to request a new appointment
// survey sent by provider
// calendar of latest appointments
// list latest services - can also show on the calendar
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

 // store patient state
 const [patient, setPatient] = useState(
  {
    name: "Jane Doe",
    age: 28,
  }
)

// state for lab objects
const [labs, setLabs] = useState(['lab 1 text here :)', 'lab 2 text here again'])


  // upcoming appointment information
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      date: '2024-10-25T20:10:45.000Z',
      info: 'appointment info goes here'
    }
  ])

  const [classes, setClasses] = useState([
    {
      date: '2024-10-25T20:10:45.000Z',
      info: 'classes'
    }

  ])

  const [upcomingAppointment, setUpcomingAppointment] = useState({
    date: '08/08/2025',
    info: 'Appointment details go here.',
  });

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className="flex flex-col h-full w-1/4 bg-slate-700 justify-center items-center text-white">
        <h1>Hello, <span><b> {patient.name}</b></span>
      </h1>
        <ul className='flex flex-col gap-8'>
          <li><button onClick={() => scrollTo(notificationsRef)}>Notifications</button></li>
          <li><button onClick={() => scrollTo(labReportsRef)}>Lab Report</button></li>
          <li><button onClick={() => scrollTo(appointmentsRef)}>Appointments</button></li>
          <li><button onClick={() => scrollTo(calendarRef)}>Calendar</button></li>
        </ul>
      </div>
      <div id="content" className="flex flex-col h-full w-full bg-gray-300 p-8">
        <h2 ref={notificationsRef} className='font-bold text-xl'>Notifications</h2>
        <h2 ref={labReportsRef} className='font-bold text-xl'>Your Latest lab reports:</h2>
        <div className='flex flex-col'>
          {labs.map(lab => (
            <LabReport lab={lab} />
          ))}
        </div>
        <h2 ref={appointmentsRef} className='text-xl pt-8'>
          You have an upcoming appointment at <span><b>{new Date(upcomingAppointments[0].date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}</b></span> with the following information below
        </h2>
        <p>{upcomingAppointments[0].info}</p>
        <h2 ref={labReportsRef} className='font-bold text-xl'>Calendar</h2>
        <div className='flex flex-row'>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <PatientCalendar
              appointments={upcomingAppointments}
              classes={classes}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;