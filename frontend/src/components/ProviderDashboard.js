import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProviderDashboard.module.css';

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
  const [selectedLabType, setSelectedLabType] = useState('Pregnancy result');
  const [labResult, setLabResult] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8008/patients/${id}`)
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        setLabReports(data.labReports || []);
      })
      .catch(error => console.error('Error fetching patient data:', error));
  }, [id]);

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submitting updated patient data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the object for fields that have been modified
    let updatedData = { name: patientData.name };

    // Add only the fields that were modified
    if (patientData.weight) updatedData.weight = patientData.weight;
    if (patientData.bloodPressure) updatedData.bloodPressure = patientData.bloodPressure;
    if (patientData.abdomenMeasurement) updatedData.abdomenMeasurement = patientData.abdomenMeasurement;
    if (patientData.nutrition) updatedData.nutrition = patientData.nutrition;
    if (patientData.exercise) updatedData.exercise = patientData.exercise;
    if (patientData.prenatalTesting) updatedData.prenatalTesting = patientData.prenatalTesting;
    if (patientData.concerns) updatedData.concerns = patientData.concerns;
    if (patientData.emotionalWellBeing) updatedData.emotionalWellBeing = patientData.emotionalWellBeing;
    if (patientData.birthPlan) updatedData.birthPlan = patientData.birthPlan;
    updatedData.highRisk = patientData.highRisk; // Since this is a boolean field

    // Send a POST request to update the patient data
    fetch('http://localhost:8008/patient/record/update', {  // Use the correct API endpoint
        method: 'POST',  // Change to POST as expected by the backend
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),  // Send only the updated fields
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

  const addLabReport = () => {
    if (labResult) {
      const newLabReport = `${selectedLabType}: ${labResult}`;
      const updatedReports = [...labReports, newLabReport];
      setLabReports(updatedReports);
      setPatientData({ ...patientData, labReports: updatedReports });

      fetch(`http://localhost:8008/api/patients/${id}/lab-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ report: newLabReport }),
      })
        .then(response => response.json())
        .catch(error => console.error('Error adding lab report:', error));

      setLabResult('');
      setSelectedLabType('Pregnancy result');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Medical Record for {patientData.name}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Weight:</label>
        <input type="text" name="weight" value={patientData.weight} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Blood Pressure:</label>
        <input type="text" name="bloodPressure" value={patientData.bloodPressure} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Abdomen Measurement:</label>
        <input type="text" name="abdomenMeasurement" value={patientData.abdomenMeasurement} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Nutrition:</label>
        <textarea name="nutrition" value={patientData.nutrition} onChange={handleChange} className={styles.textarea} />

        <label className={styles.label}>Exercise:</label>
        <textarea name="exercise" value={patientData.exercise} onChange={handleChange} className={styles.textarea} />

        <label className={styles.label}>Prenatal Testing:</label>
        <textarea name="prenatalTesting" value={patientData.prenatalTesting} onChange={handleChange} className={styles.textarea} />

        <label className={styles.label}>Concerns:</label>
        <textarea name="concerns" value={patientData.concerns} onChange={handleChange} className={styles.textarea} />

        <label className={styles.label}>Emotional Well-Being:</label>
        <textarea name="emotionalWellBeing" value={patientData.emotionalWellBeing} onChange={handleChange} className={styles.textarea} />

        <label className={styles.label}>Birth Plan Preferences:</label>
        <textarea name="birthPlan" value={patientData.birthPlan} onChange={handleChange} className={styles.textarea} />

        <button type="submit" className={`${styles.button} ${styles['button-submit']}`}>Save</button>
      </form>

      <h2 className={styles['lab-reports-title']}>Lab Reports</h2>
      <ul>
        {labReports.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>

      <label htmlFor="labType" className={styles.label}>Select Lab Report Type:</label>
      <select
        id="labType"
        value={selectedLabType}
        onChange={(e) => setSelectedLabType(e.target.value)}
        className={styles.select}
      >
        <option value="Pregnancy result">Pregnancy result</option>
        <option value="Ultrasound result">Ultrasound result</option>
        <option value="Blood test result">Blood test result</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="labResult" className={styles.label}>Lab Report Details:</label>
      <textarea
        id="labResult"
        value={labResult}
        onChange={(e) => setLabResult(e.target.value)}
        placeholder="Enter lab result details here"
        className={styles.textarea}
      />

      <button onClick={addLabReport} className={`${styles.button} ${styles['button-lab-report']}`}>Add Lab Report</button>
    </div>
  );
};

export default ProviderDashboard;
