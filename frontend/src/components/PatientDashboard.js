import React from 'react'
import { useState } from 'react'


const patientDashboard = () => {

  const [patient, setPatient] = useState(
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
    }
  )
  
  return (
    <div></div>
  )
}

export default patientDashboard