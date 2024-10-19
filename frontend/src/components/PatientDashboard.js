import React from 'react'
import { useState, useEffect } from 'react'


const PatientDashboard = () => {

  const [patient, setPatient] = useState(
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
    }
  )

  const [labs, setLabs] = useState ([])

  const [latestAppointment, setLatestAppointment] = useState (

  )

  const [input, setInput] = useState();

  // useEffect();
  
  return (
    <div className='flex flex-row w-full'>
      <div className="flex h-full w-[900px] bg-slate-700" >Hello </div>
      {patient.firstName}, {patient.lastName}
    </div>
  )
}

export default PatientDashboard