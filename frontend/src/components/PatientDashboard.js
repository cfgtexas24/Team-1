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
      date: '2024-11-25T20:10:45.000Z',
      info: 'appointment info goes here'
    },
    {
      date: '2024-09-03T20:10:45.000Z',
      info: 'appointment info goes here'
    }

  ])

  const [classes, setClasses] = useState([
    {
      date: '2024-11-12T20:10:45.000Z',
      title: 'Pre-natal Education Class',
      info: 'info about the class'
    }
  ])

  const [availableClasses, setAvailableClasses] = useState([
    {
      date: '2024-10-12T20:10:45.000Z',
      title: 'Pre-natal Education Class',
      info: 'info about the class'
    }
  ])

  const [allEvents, setAllEvents] = useState([])

  const [surveyQuestion, setSurveyQuestion] = useState('');
  const [surveyAnswer, setSurveryAnswer] = useState('');

  // for useEffect()
  // requests:
  // get patient demographic data
  // get appointments of patient
  // get currently signed up classes
  // get available classes to attend
  useEffect(() => {
    // sort all events (classes and appointments) by date 
    const combined = [
      ...classes.map(c => ({ ...c, type: 'class' })),
      ...upcomingAppointments.map(a => ({ ...a, type: 'appointment' }))
    ];
    const sortedCombined = combined.sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log(sortedCombined)
    setAllEvents(sortedCombined)
  }, []);

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className="flex flex-col h-screen w-1/4 bg-slate-700 justify-center items-center text-white">
        <h1>Hello, <span><b> {patient.name}</b></span></h1>
        <ul className='flex flex-col gap-8'>
          <li><button onClick={() => scrollTo(notificationsRef)}>Notifications</button></li>
          <li><button onClick={() => scrollTo(labReportsRef)}>Lab Report</button></li>
          <li><button onClick={() => scrollTo(appointmentsRef)}>Appointments</button></li>
          <li><button onClick={() => scrollTo(calendarRef)}>Calendar</button></li>
        </ul>
      </div>
      <div id="content" className="flex flex-col gap-12 h-screen w-full bg-gray-300 p-8">
        <div>
          <h2 ref={notificationsRef} className='font-bold text-xl'>Notifications</h2>
        </div>
        <div>
          <h2 ref={labReportsRef} className='font-bold text-xl'>Your Latest lab reports:</h2>
          <div className='flex flex-col'>
            {labs.map(lab => (
              <LabReport lab={lab} />
            ))}
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <h2 ref={labReportsRef} className='font-bold text-xl'>Calendar</h2>
          <div className='flex flex-row gap-4'>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <PatientCalendar
                appointments={upcomingAppointments}
                classes={classes}
              />
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md w-full'>
              <h2 className="mb-4"><b>Scheduled Events</b></h2>
              {allEvents.map(event => (
                <div className={event.type === 'class' ? 'text-blue-500' : event.type === 'appointment' ? 'text-green-500' : ''}>
                  <h2><b>{event.type === 'class' ? event.title : 'Appointment'}</b></h2>
                  <p className='mb-4'>{new Date(event.date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                  </p>
                </div>
              ))}
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md w-full'>
              <div>

              </div>
              <h2 className="mb-4"><b>Available Classes</b></h2>
              {availableClasses.map(availableClass => (
                <div className='flex flex-row'>
                  <div className='w-full'>
                    <h2><b>{availableClass.title}</b></h2>
                    <p>{new Date(availableClass.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                    </p>
                    <p className='mb-4'>{availableClass.info}</p>
                  </div>
                  <button className='w-18'>Sign Up</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;