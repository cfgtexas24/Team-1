const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const { getFirestore, doc, collection, addDoc } = require('firebase/firestore');
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

// PATIENTS
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
  let userID = "";
  try {
    patientInitialData = req.body;
    userID = patientInitialData.name;
    console.log(patientInitialData);
  } catch(error) {
    console.error('Error fetching patients initial data:', error);
    res.status(500).json({ error: 'Error fetching patients initial data' });
  }
  try {
    await db.collection('patients').doc(userID).set(patientInitialData);
    await db.collection('medicalRecords').doc(userID).set({});
    await db.collection('appointments').doc(userID).set({"appointments": [""]});
    await db.collection('classes').doc(userID).set({"classes": [""]});
    res.status(200).json({ message: 'Data fetched and added to database successfully'});
  } catch(error) {
    console.error('Error adding data to database:', error);
    res.status(500).json({ error: 'Error adding data to database' });
  }
});

// POST to classes if patient signs up for a class
// app.post('/classes/add', async(req, res) => {
//   const name = req.body.name;
//   const newClass = req.body.newClass;

//   try {
//     const classesRef = db.collection('classes').doc(name);
//     console.log(classesRef);

//     const doc = await classesRef.get();
//     console.log(doc);
//     if (!doc.exists) {
//       return res.status(404).json({ message: 'No classes found for this patient' });
//     }
    
//     await classesRef.update({
//       classes: admin.firestore.FieldValue.arrayUnion(newClass)
//     });

//     res.status(200).json({ message: 'Class added successfully' });
//   } catch (error) {
//     console.error('Error adding class:', error);
//     res.status(500).json({ error: 'Error adding class' });
//   }
// });


// POST to appts if patient signs up for an appt


// GET to classes to fetch classes
app.get('/classes/get', async(req, res) => {
  let name = req.body.name;
  
  try {
    const classesRef = db.collection('classes').doc(name);
    const doc = await classesRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No classes found for this patient' });
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Error fetching class' });
  }
})


// GET to appts to fetch appts
app.get('/appointments/get', async(req, res) => {
  let name = req.body.name;
  
  try {
    const apptsRef = db.collection('appointments').doc(name);
    const doc = await apptsRef.get();
    console.log(doc.data())

    // convert date from nasty Firebase format to ISO
    const milliseconds = doc.data().date.seconds * 1000 + Math.floor(doc.data().date.nanoseconds / 1000);
    const isoDateString = new Date(milliseconds).toISOString();
    const normalizedData = {...doc.data(), date: isoDateString}

    if (!doc.exists) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.json(normalizedData);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
})

// Patient View Information

// Specific Patient Medical Records
app.get('/patients/medical-records', async (req, res) => {
  let username = {};
  try {
    username = req.body;
    console.log(username);
  } catch(error) {
    console.error('Error fetching patients username:', error);
    res.status(500).json({ error: 'Error patients username' });
  }
  try {
    const userID = await db.collection('patients').get();
    //const labReports = await db.collection('medicalRecords').get();
    //const patients = snapshot.docs.map(doc => doc.data());
  
    res.status(200).json(userID);
  } catch(error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

// Patient Lab Report
app.get('/patient/lab-report', async (req, res) => {
  try{

  } catch(error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

// PROVIDERS
// Get all patients data
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

// GET a specific patient's medical records
app.get('/patient/record', async (req, res) => {
  const name = req.body.name;

  try {
    const recordRef = db.collection('medicalRecords').doc(name);
    const doc = await recordRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No medical records found for this patient' });
    }

    res.json(doc.data());

  } catch (error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ error: 'Error fetching record' });
  }
});

// POST to a specific patient's medical records
// app.post('patient/record/update', async(req, res) => {
//   const name = req.body.name;
//   const updatedFields = req.body;
//   console.log(updatedFields)

//   try {
//     const recordRef = db.collection('medicalRecords').doc(name);

//     const doc = await recordRef.get();
//     if (!doc.exists) {
//       return res.status(404).json({ message: 'No medical records found for this patient' });
//     }

//     await recordRef.update(updatedFields);

//     res.status(200).json({ message: 'Medical records updated successfully' });
//   } catch (error) {
//     console.error('Error updating patient records:', error);
//     res.status(500).json({ error: 'Error updating records' });
//   }
// })


// Start the server
const port = 8008;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});