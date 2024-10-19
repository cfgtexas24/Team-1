import React, { useState } from 'react';

const ProviderDashboard = () => {
  // track patient data
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    bloodPressure: '',
    notes: '',
    abdomenMeasurement: '',   // Measuring abdomen of patient
    nutrition: '',            // Nutrition notes
    exercise: '',             // Exercise notes
    prenatalTesting: '',      // Prenatal testing options (apparently google says they do this)
    concerns: '',             // Potential concerns from midwife or mom 
    emotionalWellBeing: '',   // Emotional well-being status
    birthPlan: '',            // Birth plan preferences atm 
  });

  // handle input changes
  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  // handle the submission of the data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder to send it to the backend. not sure how to do that rn 
    console.log('Submitting patient data:', patientData);
  };
//text stuff 
  return (
    <div>
      <h1>Provider Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Patient Weight:</label>
          <input
            type="text"
            name="weight"
            value={patientData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Blood Pressure:</label>
          <input
            type="text"
            name="bloodPressure"
            value={patientData.bloodPressure}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Abdomen Measurement:</label>
          <input
            type="text"
            name="abdomenMeasurement"
            value={patientData.abdomenMeasurement}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nutrition:</label>
          <textarea
            name="nutrition"
            value={patientData.nutrition}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Exercise:</label>
          <textarea
            name="exercise"
            value={patientData.exercise}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prenatal Testing Options:</label>
          <textarea
            name="prenatalTesting"
            value={patientData.prenatalTesting}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Potential Concerns:</label>
          <textarea
            name="concerns"
            value={patientData.concerns}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Emotional Well-Being:</label>
          <textarea
            name="emotionalWellBeing"
            value={patientData.emotionalWellBeing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birth Plan Preferences:</label>
          <textarea
            name="birthPlan"
            value={patientData.birthPlan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={patientData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProviderDashboard;
