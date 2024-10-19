import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    gender: '',
    race: '',
    primaryLanguage: '',
    zipCode: '',
    pregnant: false,
    weeksPregnant: '',
    postpartum: false,
    weeksSinceBirth: '',
    seizures: false,
    preeclampsia: false,
    healthInsurance: false,
    unhoused: false,
    foodStamps: false,
  });

  // Dummy data for table and chart
  const dummyData = [
    {
      username: 'jdoe',
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      race: 'White',
      primaryLanguage: 'English',
      zipCode: '12345',
      pregnant: false,
      weeksPregnant: '',
      postpartum: false,
      weeksSinceBirth: '',
      seizures: false,
      preeclampsia: false,
      healthInsurance: true,
      unhoused: false,
      foodStamps: false,
    },
    {
      username: 'jsmith',
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      race: 'Asian',
      primaryLanguage: 'Mandarin',
      zipCode: '67890',
      pregnant: true,
      weeksPregnant: 12,
      postpartum: false,
      weeksSinceBirth: '',
      seizures: false,
      preeclampsia: true,
      healthInsurance: true,
      unhoused: false,
      foodStamps: true,
    },
    // Add more dummy data as needed
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Filter the dummyData based on the filters
  const filterData = () => {
    return dummyData.filter((item) => {
      // Filter logic for each input field
      return (
        (filters.name === '' || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.age === '' || item.age === parseInt(filters.age)) &&
        (filters.gender === '' || item.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (filters.race === '' || item.race.toLowerCase() === filters.race.toLowerCase()) &&
        (filters.primaryLanguage === '' || item.primaryLanguage.toLowerCase() === filters.primaryLanguage.toLowerCase()) &&
        (filters.zipCode === '' || item.zipCode === filters.zipCode) &&
        (filters.pregnant === false || item.pregnant === filters.pregnant) &&
        (filters.weeksPregnant === '' || item.weeksPregnant === parseInt(filters.weeksPregnant)) &&
        (filters.postpartum === false || item.postpartum === filters.postpartum) &&
        (filters.weeksSinceBirth === '' || item.weeksSinceBirth === parseInt(filters.weeksSinceBirth)) &&
        (filters.seizures === false || item.seizures === filters.seizures) &&
        (filters.preeclampsia === false || item.preeclampsia === filters.preeclampsia) &&
        (filters.healthInsurance === false || item.healthInsurance === filters.healthInsurance) &&
        (filters.unhoused === false || item.unhoused === filters.unhoused) &&
        (filters.foodStamps === false || item.foodStamps === filters.foodStamps)
      );
    });
  };

  const filteredData = filterData();

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <h2>Filter Data</h2>
        <form className="filter-form">
          {/* Text Inputs */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={filters.age}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Race</label>
            <input
              type="text"
              name="race"
              value={filters.race}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Primary Language</label>
            <input
              type="text"
              name="primaryLanguage"
              value={filters.primaryLanguage}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={filters.zipCode}
              onChange={handleInputChange}
            />
          </div>

          {/* Checkbox Inputs */}
          <div className="input-group">
            <label>Pregnant</label>
            <input
              type="checkbox"
              name="pregnant"
              checked={filters.pregnant}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Weeks Pregnant</label>
            <input
              type="number"
              name="weeksPregnant"
              value={filters.weeksPregnant}
              onChange={handleInputChange}
              disabled={!filters.pregnant}
            />
          </div>

          <div className="input-group">
            <label>Postpartum</label>
            <input
              type="checkbox"
              name="postpartum"
              checked={filters.postpartum}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Weeks Since Birth</label>
            <input
              type="number"
              name="weeksSinceBirth"
              value={filters.weeksSinceBirth}
              onChange={handleInputChange}
              disabled={!filters.postpartum} 
            />
          </div>

          {/* More checkboxes */}
          <div className="input-group">
            <label>Seizures</label>
            <input
              type="checkbox"
              name="seizures"
              checked={filters.seizures}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Preeclampsia</label>
            <input
              type="checkbox"
              name="preeclampsia"
              checked={filters.preeclampsia}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Health Insurance</label>
            <input
              type="checkbox"
              name="healthInsurance"
              checked={filters.healthInsurance}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Unhoused</label>
            <input
              type="checkbox"
              name="unhoused"
              checked={filters.unhoused}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Food Stamps</label>
            <input
              type="checkbox"
              name="foodStamps"
              checked={filters.foodStamps}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>

      {/* Data Table */}
      <div className="data-table">
        <h2>Filtered Data</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Race</th>
              <th>Primary Language</th>
              <th>Zip Code</th>
              <th>Pregnant</th>
              <th>Weeks Pregnant</th>
              <th>Postpartum</th>
              <th>Weeks Since Birth</th>
              <th>Seizures</th>
              <th>Preeclampsia</th>
              <th>Health Insurance</th>
              <th>Unhoused</th>
              <th>Food Stamps</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                  <td>{row.gender}</td>
                  <td>{row.race}</td>
                  <td>{row.primaryLanguage}</td>
                  <td>{row.zipCode}</td>
                  <td>{row.pregnant ? 'Yes' : 'No'}</td>
                  <td>{row.weeksPregnant}</td>
                  <td>{row.postpartum ? 'Yes' : 'No'}</td>
                  <td>{row.weeksSinceBirth}</td>
                  <td>{row.seizures ? 'Yes' : 'No'}</td>
                  <td>{row.preeclampsia ? 'Yes' : 'No'}</td>
                  <td>{row.healthInsurance ? 'Yes' : 'No'}</td>
                  <td>{row.unhoused ? 'Yes' : 'No'}</td>
                  <td>{row.foodStamps ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15">No data matches the filters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
