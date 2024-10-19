const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin Initialization
const serviceAccount = require('./abide-6ec6e-firebase-adminsdk-khvbi-7a4ca1a8ba.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();

// Route for testing server
app.get('/', (req, res) => {
  res.send('Firebase Auth Server Running');
});

// API Route: Verify Firebase ID token
app.post('/verify-token', async (req, res) => {
  const idToken = req.body.idToken;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ success: true, uid: decodedToken.uid });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Fetch patient data by ID
app.get('/patients/:id', async (req, res) => {
    const patientId = req.params.id;
    
    try {
      const patientRef = db.collection('patients').doc(patientId);
      const doc = await patientRef.get();
      
      if (!doc.exists) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      const patientData = doc.data();
      res.json(patientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      res.status(500).json({ error: 'Error fetching patient data' });
    }
});

// Update patient data by ID
app.put('/patients/:id', async (req, res) => {
    const patientId = req.params.id;
    const updatedData = req.body;
  
    try {
      const patientRef = db.collection('patients').doc(patientId);
      await patientRef.update(updatedData);
  
      res.json({ message: 'Patient data updated successfully' });
    } catch (error) {
      console.error('Error updating patient data:', error);
      res.status(500).json({ error: 'Error updating patient data' });
    }
});

// Fetch all patients data
app.get('/patients', async (req, res) => {
    try {
      const snapshot = await db.collection('patients').get();
      const patients = snapshot.docs.map(doc => doc.data());
  
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients data:', error);
      res.status(500).json({ error: 'Error fetching patients data' });
    }
});
  
// Initial Patient Form
app.post('/patients/initial-form', async (req, res) => {
  let patientInitialData = {};
  try {
    patientInitialData = req.body;
    console.log(patientInitialData);
  } catch(error) {
    console.error('Error fetching patients initial data:', error);
    res.status(500).json({ error: 'Error fetching patients initial data' });
  }
  try {
    await db.collection('patients').add(patientInitialData);
    res.status(200).json({ message: 'Data fetched and added to database successfully'});
  } catch(error) {
    console.error('Error adding data to database:', error);
    res.status(500).json({ error: 'Error adding data to database' });
  }
});

// Fetch all patients data
app.get('/patients', async (req, res) => {
  try {
    const snapshot = await db.collection('patients').get();
    const patients = snapshot.docs.map(doc => doc.data());

    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients data:', error);
    res.status(500).json({ error: 'Error fetching patients data' });
  }
});

app.get('/providers/patient-records', async (req, res) => {
  try {
    const providerSnapshot = await db.collection('providers').get();
    const allPatientRecords = [];

    for (const doc of providerSnapshot.docs) {
      const providerData = doc.data();
      const patients = providerData.patients;
      console.log(patients);

      for (const patient of patients) {

        const medicalRecordsSnapshot = await db.collection('medicalRecords').get(patient);
        console.log(medicalRecordsSnapshot);

        medicalRecordsSnapshot.forEach(recordDoc => {
          allPatientRecords.push(recordDoc.data());
        });
      }
    }
    res.json(allPatientRecords);

  } catch(error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ error: 'Error fetching patients records' });
  }
});

// Start the server
const port = 8008;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});