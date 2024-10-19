import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  // Example data for the bar chart (general patient statistics)
  const patientData = [
    { category: "Age", value: 25 }, // Replace with actual data
    { category: "Pregnant", value: 10 }, // Replace with actual data
    { category: "Previous Pregnancies", value: 3 }, // Replace with actual data
    { category: "Miscarriages", value: 1 }, // Replace with actual data
    { category: "Postpartum", value: 5 }, // Replace with actual data
    { category: "Health Insurance", value: 20 }, // Replace with actual data
    { category: "Unhoused", value: 8 }, // Replace with actual data
    { category: "Food Stamps", value: 15 }, // Replace with actual data
  ];

  // Example data for the pie chart (patients by race)
  const raceData = [
    { name: 'White', value: 400 }, // Replace with actual data
    { name: 'Black', value: 300 }, // Replace with actual data
    { name: 'Asian', value: 300 }, // Replace with actual data
    { name: 'Hispanic', value: 200 }, // Replace with actual data
    { name: 'Other', value: 100 }, // Replace with actual data
  ];

  // Example data for weeks into pregnancy
  const pregnancyData = [
    { week: "1-4", count: 15 }, // Replace with actual data
    { week: "5-8", count: 20 }, // Replace with actual data
    { week: "9-12", count: 25 }, // Replace with actual data
    { week: "13-16", count: 18 }, // Replace with actual data
    { week: "17-20", count: 22 }, // Replace with actual data
    { week: "21-24", count: 10 }, // Replace with actual data
    { week: "25-28", count: 5 }, // Replace with actual data
    { week: "29-32", count: 7 }, // Replace with actual data
    { week: "33-36", count: 3 }, // Replace with actual data
    { week: "37-40", count: 2 }, // Replace with actual data
  ];

  // Example data for services used
  const serviceData = [
    { service: "Postpartum Care", count: 30 }, // Replace with actual data
    { service: "Prenatal Care", count: 45 }, // Replace with actual data
    { service: "Doula Assistance", count: 20 }, // Replace with actual data
    { service: "Mental Health Support", count: 15 }, // Replace with actual data
    { service: "Nutritional Counseling", count: 10 }, // Replace with actual data
  ];

  // Example data for successful childbirths (as of October 2024)
  const successfulChildbirths = 128; // Replace with actual data

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Metric for successful childbirths */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        marginBottom: '20px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Successful Childbirths (As of October 2024)</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{successfulChildbirths}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
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

      <h2>Patient Distribution by Race</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={raceData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
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

      <h2>Patients by Weeks into Pregnancy</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={pregnancyData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Services Used by Patients</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={serviceData}
          layout="vertical" // Set the layout to vertical for horizontal bars
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="service" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
