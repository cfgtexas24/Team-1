import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  // Example data
  const patientData = [
    { category: "Age", value: 25 },
    { category: "Pregnant", value: 10 },
    { category: "Previous Pregnancies", value: 3 },
    { category: "Miscarriages", value: 1 },
    { category: "Postpartum", value: 5 },
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
    { service: "Postpartum Care", count: 30 },
    { service: "Prenatal Care", count: 45 },
    { service: "Doula Assistance", count: 20 },
    { service: "Mental Health Support", count: 15 },
    { service: "Nutritional Counseling", count: 10 },
  ];

  const instabilityData = [
    { instability: "Homelessness", count: 8 },
    { instability: "Food Stamps", count: 15 },
    { instability: "No Insurance", count: 20 },
  ];

  const successfulChildbirths = 128;

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
<div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="metrics-box">
        <div>
          <h2>Successful Childbirths (As of October 2024)</h2>
          <p>{successfulChildbirths}</p>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-box bar-chart">
          <h2>General Patient Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00b894" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box pie-chart">
          <h2>Patient Distribution by Race</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={raceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {raceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box bar-chart">
          <h2>Patients by Weeks into Pregnancy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pregnancyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box bar-chart">
          <h2>Services Used by Patients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData} layout="vertical" margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="service" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" className="bar-services" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box bar-chart">
          <h2>Instabilities Faced by Patients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={instabilityData} layout="vertical" margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="instability" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" className="bar-instabilities" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
