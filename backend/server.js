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

const updateMedicalRecordField = async (req, res, field) => {
  const name = req.body.name; // Get the patient's name (document ID)
  const newValue = req.body.newValue; // The new value for the field

  try {
    const recordRef = db.collection('medicalRecords').doc(name);

    // Get the patient's medical record document
    const doc = await recordRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No medical records found for this patient' });
    }

    // Update the specific field with the new value
    await recordRef.update({ [field]: newValue });

    res.status(200).json({ message: `Field '${field}' updated successfully` });
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    res.status(500).json({ error: `Error updating ${field}` });
  }
};

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
    await db.collection('medicalRecords').doc(userID).set({"weight": 0, "bloodPressure": 0, "notes": "", "abdomenMeasurement": 0, "nutrition": "", "exercise": "", "prenatalTesting": "", "concerns": "", "emotionalWellBeing": "", "birthPlan": "" , "successfulBirth": "", "birthComplications": "", "servicesAccessed": ""});
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

    if (!doc.exists) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.json(doc.data());
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
// app.get('/patient/lab-report', async (req, res) => {
//   try{

//   } catch(error) {
//     console.error('Error fetching data from database:', error);
//     res.status(500).json({ error: 'Error fetching data from database' });
//   }
// });

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

// POST to a specific patient's blood pressure
app.post('/patient/record/update/bloodPressure', (req, res) => {
  updateMedicalRecordField(req, res, 'bloodPressure');
});

// Route to update nutrition
app.post('/patient/record/update/nutrition', (req, res) => {
  updateMedicalRecordField(req, res, 'nutrition');
});

// Route to update weight
app.post('/patient/record/update/weight', (req, res) => {
  updateMedicalRecordField(req, res, 'weight');
});

// Add similar routes for other fields like exercise, concerns, etc.
app.post('/patient/record/update/exercise', (req, res) => {
  updateMedicalRecordField(req, res, 'exercise');
});

app.post('/patient/record/update/birthPlan', (req, res) => {
  updateMedicalRecordField(req, res, 'birthPlan');
});

app.post('/patient/record/update/abdomenMeasurement', (req, res) => {
  updateMedicalRecordField(req, res, 'abdomenMeasurement');
});

app.post('/patient/record/update/concerns', (req, res) => {
  updateMedicalRecordField(req, res, 'concerns');
});

app.post('/patient/record/update/emotionalWellBeing', (req, res) => {
  updateMedicalRecordField(req, res, 'emotionalWellBeing');
});

app.post('/patient/record/update/notes', (req, res) => {
  updateMedicalRecordField(req, res, 'notes');
});

app.post('/patient/record/update/prenatalTesting', (req, res) => {
  updateMedicalRecordField(req, res, 'prenatalTesting');
});

app.post('/patient/record/update/successfulBirth', (req, res) => {
  updateMedicalRecordField(req, res, 'successfulBirth');
});

app.post('/patient/record/update/birthComplications', (req, res) => {
  updateMedicalRecordField(req, res, 'birthComplications');
});

app.post('/patient/record/update/servicesAccessed', (req, res) => {
  updateMedicalRecordField(req, res, 'servicesAccessed');
});


// app.post('patient/record/update/bloodPressure', async(req, res) => {
//   const name = req.body.name;
//   // const fieldToUpdate = req.params.field;
//   const newValue = req.body.newValue;
//   console.log(newValue);

  // Validate input
  // if (!name || newValue === undefined || newValue === null) {
  //   return res.status(400).json({ error: 'Name and new value for the field are required' });
  // }

  // try {
  //   const recordRef = db.collection('medicalRecords').doc(name);
    
  //   // Check if the document exists
  //   const doc = await recordRef.get();
  //   if (!doc.exists) {
  //     return res.status(404).json({ message: 'No medical records found for this patient' });
  //   }

  //   // Prepare update object dynamically
  //   let updateData = {};
  //   updateData[fieldToUpdate] = newValue;

  //   // Update the specified field in the document
  //   await recordRef.update(updateData);

  //   res.status(200).json({ message: `Field '${fieldToUpdate}' updated successfully` });
  // } catch (error) {
  //   console.error('Error updating patient records:', error);
  //   res.status(500).json({ error: 'Error updating record' });
  // }
// });


// ADMIN
// GET successful birth count
app.get('/admin/successfulBirths', async (req, res) => {
  try {
    const snapshot = await db.collection('medicalRecords').where('successfulBirth', '==', true).get();

    if (snapshot.empty) {
      return res.status(200).json({ successfulBirthCount: 0});
    }

    const successfulBirthCount = snapshot.size;

    res.status(200).json({ successfulBirthCount });
  } catch (error) {
    console.error('Error counting successful births:', error);
    res.status(500).json({ error: 'Error counting successful births' });
  }
});

// GET birth complications
app.get('/admin/birthComplications', async (req, res) => {
  try {
    // Fetch all documents in the 'medicalRecords' collection
    const snapshot = await db.collection('medicalRecords').get();

    if (snapshot.empty) {
      return res.status(200).json({ birthComplications: [] });
    }

    // Initialize an array to store birth complications
    const birthComplications = [];

    // Iterate through the documents
    snapshot.forEach(doc => {
      const data = doc.data();

      // Check if birthComplications field exists and is not an empty string
      if (data.birthComplications && data.birthComplications.trim() !== '') {
        birthComplications.push(data.birthComplications);
      }
    });

    // Return the array of birth complications
    res.status(200).json({ birthComplications });

  } catch (error) {
    console.error('Error fetching birth complications:', error);
    res.status(500).json({ error: 'Error fetching birth complications' });
  }
});


// Start the server
const port = 8008;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});