import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProviderDashboard = () => {
  const { id } = useParams();  // Get the patient ID from the URL
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    bloodPressure: '',
    notes: '',
    abdomenMeasurement: '',
    nutrition: '',
    exercise: '',
    prenatalTesting: '',
    concerns: '',
    emotionalWellBeing: '',
    birthPlan: '',
  });
  const [labReports, setLabReports] = useState([]);
  const [selectedLabType, setSelectedLabType] = useState('Pregnancy result'); // Default dropdown option
  const [labResult, setLabResult] = useState(''); // State for the result text input

  // Fetch the specific patient's data when the component loads
  useEffect(() => {
    fetch(`http://localhost:8008/patients/${id}`) // Replace with the actual API endpoint
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        setLabReports(data.labReports || []); // assuming labReports are part of patient data
      })
      .catch(error => console.error('Error fetching patient data:', error));
  }, [id]);

  // Handle input changes for editable patient data
  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submitting updated patient data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8008/patients/${id}`, {  // Send updated data to backend
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Patient data updated successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error updating the data.');
      });
  };

  // Add a new lab report
  const addLabReport = () => {
    if (labResult) {
      const newLabReport = `${selectedLabType}: ${labResult}`; // Combines the selected type with the text result
      const updatedReports = [...labReports, newLabReport];
      setLabReports(updatedReports);
      setPatientData({ ...patientData, labReports: updatedReports });

      // Send the new report to the backend
      fetch(`http://localhost:8008/api/patients/${id}/lab-reports`, {  // Replace with the actual API endpoint or
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ report: newLabReport }),
      })
        .then(response => response.json())
        .then(data => console.log('Lab report added:', data))
        .catch((error) => console.error('Error adding lab report:', error));

      // Clear the input fields after submission
      setLabResult('');
      setSelectedLabType('Pregnancy result'); // Reset dropdown to default
    }
  };

  return (
    <div>
      <h1>Medical Record for {patientData.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={patientData.name} onChange={handleChange} />

        <label>Weight:</label>
        <input type="text" name="weight" value={patientData.weight} onChange={handleChange} />

        <label>Blood Pressure:</label>
        <input type="text" name="bloodPressure" value={patientData.bloodPressure} onChange={handleChange} />

        <label>Abdomen Measurement:</label>
        <input type="text" name="abdomenMeasurement" value={patientData.abdomenMeasurement} onChange={handleChange} />

        <label>Nutrition:</label>
        <textarea name="nutrition" value={patientData.nutrition} onChange={handleChange} />

        <label>Exercise:</label>
        <textarea name="exercise" value={patientData.exercise} onChange={handleChange} />

        <label>Prenatal Testing:</label>
        <textarea name="prenatalTesting" value={patientData.prenatalTesting} onChange={handleChange} />

        <label>Concerns:</label>
        <textarea name="concerns" value={patientData.concerns} onChange={handleChange} />

        <label>Emotional Well-Being:</label>
        <textarea name="emotionalWellBeing" value={patientData.emotionalWellBeing} onChange={handleChange} />

        <label>Birth Plan Preferences:</label>
        <textarea name="birthPlan" value={patientData.birthPlan} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>

      {/* Lab Reports Section */}

      <h2>Lab Reports</h2>
      <ul>
        {labReports.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>
      {/* Dropdown for Lab Type */}
      <label htmlFor="labType">Select Lab Report Type:</label>
      <select
        id="labType"
        value={selectedLabType}
        onChange={(e) => setSelectedLabType(e.target.value)}
      >
        <option value="Pregnancy result">Pregnancy result</option>
        <option value="Ultrasound result">Ultrasound result</option>
        <option value="Blood test result">Blood test result</option>
        <option value="Other">Other</option>
      </select>

      {/* Text field for Lab Result */}
      <label htmlFor="labResult">Lab Report Details:</label>
      <textarea
        id="labResult"
        value={labResult}
        onChange={(e) => setLabResult(e.target.value)}
        placeholder="Enter lab result details here"
      />
      <button onClick={addLabReport}>Add Lab Report</button>
    </div>
  );
};

export default ProviderDashboard;