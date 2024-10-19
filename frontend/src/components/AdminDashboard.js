import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Example data
  const patientData = [
    {
      category: "Age",
      value: 25, // Replace with actual data
    },
    {
      category: "Pregnant",
      value: 10, // Replace with actual data
    },
    {
      category: "Previous Pregnancies",
      value: 3, // Replace with actual data
    },
    {
      category: "Miscarriages",
      value: 1, // Replace with actual data
    },
    {
      category: "Postpartum",
      value: 5, // Replace with actual data
    },
    {
      category: "Health Insurance",
      value: 20, // Replace with actual data
    },
    {
      category: "Unhoused",
      value: 8, // Replace with actual data
    },
    {
      category: "Food Stamps",
      value: 15, // Replace with actual data
    },
  ];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ResponsiveContainer width="105%" height={400}>
        <BarChart
          data={patientData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
