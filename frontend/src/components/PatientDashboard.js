import React from 'react'
import { useState } from 'react'


const PatientDashboard = () => {

  const [patient, setPatient] = useState(
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
    }
  )
  
  return (
    <div className='flex flex-row'>
      <div></div>
      {patient.firstName}, {patient.lastName}
    </div>
  )
}

export default PatientDashboard