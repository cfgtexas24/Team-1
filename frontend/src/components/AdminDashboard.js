import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

  // New state to toggle filters visibility
  const [showFilters, setShowFilters] = useState(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Example data (unchanged)
  const patientData = [
    { category: "Age", value: 25 },
    { category: "Pregnant", value: 10 },
    { category: "Postpartum", value: 5 },
    { category: "Seizures", value: 3 },
    { category: "Preeclampsia", value: 2 },
    { category: "Health Insurance", value: 20 },
    { category: "Unhoused", value: 8 },
    { category: "Food Stamps", value: 15 },
  ];

  const raceData = [
    { name: 'White', value: 400 },
    { name: 'Black', value: 300 },
    { name: 'Asian', value: 300 },
    { name: 'Hispanic', value: 200 },
    { name: 'Other', value: 100 },
  ];

  const pregnancyData = [
    { week: "1-4", count: 15 },
    { week: "5-8", count: 20 },
    { week: "9-12", count: 25 },
    { week: "13-16", count: 18 },
    { week: "17-20", count: 22 },
    { week: "21-24", count: 10 },
    { week: "25-28", count: 5 },
    { week: "29-32", count: 7 },
    { week: "33-36", count: 3 },
    { week: "37-40", count: 2 },
  ];

  const serviceData = [
    { service: "Prenatal Care", count: 45 },
    { service: "Postpartum Care", count: 30 },
    { service: "Seizure Management", count: 15 },
    { service: "Preeclampsia Monitoring", count: 10 },
    { service: "Mental Health Support", count: 25 },
  ];

  const instabilityData = [
    { instability: "Homelessness", count: 8 },
    { instability: "Food Stamps", count: 15 },
    { instability: "No Insurance", count: 20 },
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  // Dummy data for filtering (expanded)
  const dummyData = [
    { 
      name: 'John Doe', 
      age: 25, 
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
      foodStamps: false
    },
    // Add more dummy data as needed
  ];

  const filterData = (data) => {
    return data.filter((item) =>
      Object.keys(filters).every((key) => {
        if (filters[key] === '' || filters[key] === false) return true;
        if (typeof filters[key] === 'boolean') return item[key] === filters[key];
        return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
      })
    );
  };

  const filteredData = filterData(dummyData);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

        {/* Toggle button for hiding/showing filters */}
        <button
          onClick={toggleFilters}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Conditionally render the filters section */}
        {showFilters && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Filter Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Object.keys(filters).map((filter) => (
                <div key={filter} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700 capitalize">
                    {filter.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {typeof filters[filter] === 'boolean' ? (
                    <input
                      type="checkbox"
                      name={filter}
                      checked={filters[filter]}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  ) : (
                    <input
                      type="text"
                      name={filter}
                      value={filters[filter]}
                      onChange={handleInputChange}
                      className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      placeholder={`Enter ${filter.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6">Filtered Data</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                {Object.keys(filters).map((key) => (
                  <th key={key} className="py-3 px-6 text-left">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    {Object.keys(filters).map((key) => (
                      <td key={key} className="py-3 px-6 text-left whitespace-nowrap">
                        {typeof row[key] === 'boolean' ? (row[key] ? 'Yes' : 'No') : row[key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={Object.keys(filters).length} className="py-3 px-6 text-center">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Data Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">General Patient Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Patient Distribution by Race</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={raceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {raceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Pregnancy Week Data</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pregnancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Service Usage Data</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Instability Data</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={instabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="instability" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;