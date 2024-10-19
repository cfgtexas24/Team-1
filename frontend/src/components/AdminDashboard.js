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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Example data
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

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full px-4 py-8 max-w-7xl mx-auto"> {/* Added max width */}
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

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
              {/* Render filtered data */}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Data Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Adjusted gap and layout */}
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

            {/* Additional charts */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
