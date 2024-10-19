import React from 'react'
import { useState, useEffect } from 'react'

// todo:
// list latest labs report
// list latest appointment
// form to request a new appointment
// survey sent by provider
// calendar of latest appointments
// list latest services - can also show on the calendar

const PatientDashboard = () => {

  const [patient, setPatient] = useState(
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
    }
  )

  const [labs, setLabs] = useState(['lab 1 file text here :)', 'lab 2 file text here again'])

  const [latestAppointment, setLatestAppointment] = useState(
    {
      date: '08/08/2025',
      info: 'appointment info goes here'
  
    }
  )

  const [input, setInput] = useState();

  // useEffect();

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className="flex h-full w-1/4 bg-slate-700 justify-center items-center text-white">
        <h1>Hello, <span><b> {patient.firstName} {patient.lastName}</b></span></h1>
      </div>
      <div className="flex flex-col h-full w-full bg-gray-300 p-8">
        <h2 className='font-bold text-xl'>Good day! Here are your latest lab reports:</h2>
        <div className='flex flex-row'>
          {labs.map((lab, index) => (
            <div key={index} className='p-2'>
              {lab}
            </div>
          ))}
        </div>
        <h2 className='text-xl pt-8'>You have an upcoming appointment at <span><b>{latestAppointment.date}</b></span> with the following information below</h2>
        <p>{latestAppointment.info}</p>
      </div>
      <form>
        <label></label>
      </form>
    </div>
  )
}

export default PatientDashboard