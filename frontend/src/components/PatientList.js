import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Fetch patients from backend
  useEffect(() => {
    fetch('http://localhost:8008/patients') // Fetch from your backend API on port 8008
      .then(response => response.json())
      .then(data => {
        console.log('Fetched patients:', data); // Log the fetched data
        setPatients(data); // Set the patient data
      })
      .catch(error => {
        console.error('Error fetching patients:', error); // Log any error if it occurs
      });
  }, []);

  // Filter the patients based on the search query
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Patient List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* Patient Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>
                <Link to={`/provider-dashboard/${patient.id}`}>View Medical Record</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;