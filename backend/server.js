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

const updateMedicalRecordField = async (req, res, field, newValue) => {
  const name = req.body.name; // Get the patient's name (document ID)
  //const newValue = req.body.newValue; // The new value for the field

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

// Fetch a single patient's data by their name (or ID)
app.get('/patients/:id', async (req, res) => {
  const patientId = req.params.id;

  try {
    const patientRef = db.collection('patients').doc(patientId);
    const doc = await patientRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No patient data found' });
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).json({ error: 'Error fetching patient data' });
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
    await db.collection('classes').doc(userID).set({"classes": []});
    res.status(200).json({ message: 'Data fetched and added to database successfully'});
  } catch(error) {
    console.error('Error adding data to database:', error);
    res.status(500).json({ error: 'Error adding data to database' });
  }
});

// POST to classes if patient signs up for a class and decrement openings
app.post('/patient/class-sign-up', async (req, res) => {
  const body = req.body;
  const name = body.name;
  const className = body.className;
  console.log(className);

  try {
    const recordRef = db.collection('class_offerings').doc(className);

    // Get the patient's medical record document
    const doc = await recordRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Class does not exist' });
    }

    // Update to decrement the openings
    const data = doc.data();
    const openings = data.openings;
    const dateTime = data.time.toDate();
    console.log("dateTime", dateTime);
    const currentDateTime = new Date();
    console.log("currentDateTime", currentDateTime);

    if(dateTime < currentDateTime) {
      return res.status(400).json({ error: 'The sign-up period for this class has ended' });
    }
    
    // Error for no openings
    if(openings-1 < 0) {
      return res.status(400).json({ error: 'No openings available' });
    }

    // Update classes for the specific patient
    const recordRefPatientClasses = db.collection('classes').doc(name);
    const docPatientClasses = await recordRefPatientClasses.get();

    if (!docPatientClasses.exists) {
      return res.status(404).json({ error: 'Patient does not exist' });
    }

    const dataPatientClasses = docPatientClasses.data();
    const classesList = dataPatientClasses.classes || [];

    // Already signed up
    if(classesList.includes(className)) {
      return res.status(400).json({ error: 'Already signed up for this class' });
    }

    // Decrement openings now that we know class and patient are both valid
    await recordRef.update({ openings: openings-1 });

    // Update to add the class
    classesList.push(className);
    await recordRefPatientClasses.update({ classes: classesList });

    res.status(200).json({ message: `Signed up successfully` });
  } catch (error) {
    console.error(`Error signing up for class with className=${className}:`, error);
    res.status(500).json({ error: `Error signing up for class with className=${className}` });
  }
});

// POST to appts for patient signs up for an appt
app.post('/patient/appointment-sign-up', async (req, res) => {
  
});

// GET for class offerings
app.get('/classes/offered', async (req, res) => {
  try {
    const dictionary = {};
    const snapshot = await db.collection('class_offerings').get();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(data)
      
      // convert date from nasty Firebase format to ISO
      const normalizedData = {...doc.data(), date: data.time.toDate()}

      const currentDateTime = new Date();
      if(data.time.toDate() > currentDateTime) {
        dictionary[doc.id] = normalizedData;
      }
    });
    res.status(200).json(dictionary);
  } catch (error) {
    console.error('Error fetching class offerings data:', error);
    res.status(500).json({ error: 'Error fetching class offerings data' });
  }
});

// GET to classes to fetch classes for a specific patient
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
app.post('/appointments/get', async(req, res) => {
  let name = req.body.name;
  
  try {
    const apptsRef = db.collection('appointments').doc(name);
    const doc = await apptsRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    const data = doc.data().appointments;
    const appointmentList = [];
    data.forEach((appointment) => appointmentList.push({'time': appointment.time.toDate(), 'info': appointment.info}));
    console.log(appointmentList[0].time);
    res.status(200).json(appointmentList);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
})

// Patient View Information
app.get('/patients/demographics', async (req, res) => {
  let name = "";
  try {
    name = req.body.name;
    console.log(name);
  } catch(error) {
    console.error('Error fetching patients username:', error);
    res.status(500).json({ error: 'Error patients username' });
  }
  try {
    const recordRef = db.collection('patients').doc(name);
    const doc = await recordRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No demographic data found for this patient' });
    }

    res.json(doc.data());
  
  } catch(error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

app.get('/patients/:id', async (req, res) => {
  const patientId = req.params.id;

  try {
    const patientRef = db.collection('patients').doc(patientId);
    const doc = await patientRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No patient data found' });
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).json({ error: 'Error fetching patient data' });
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

// POST to a specific patient's blood pressure
/*app.post('/patient/record/update/bloodPressure', (req, res) => {
  updateMedicalRecordField(req, res, 'bloodPressure');
});*/
// Update Patient Record
app.post('/patient/record/update', (req, res) => {
  const body = req.body;
  console.log(body);
  const field = Object.keys(body)[1];
  console.log(field);
  console.log(body[field]);
  updateMedicalRecordField(req, res, field, body[field]);
});

// Add Patient Lab Report
app.post('/patient/lab-report/add', async (req, res) => {
  const body = req.body;
  const name = body.name;
  const newReport = body.newReport;
  console.log(newReport);

  
  try {
    const recordRef = db.collection('medicalRecords').doc(name);

    // Get the patient's medical record document
    const doc = await recordRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'No medical records found for this patient' });
    }

    // Update the specific field with the new report
    const data = doc.data();
    const currentReportsList = data.reports || [];
    currentReportsList.push(newReport);
    await recordRef.update({ reports: currentReportsList });

    res.status(200).json({ message: `Report added successfully` });
  } catch (error) {
    console.error(`Error adding ${newReport}:`, error);
    res.status(500).json({ error: `Error adding report` });
  }
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

// GET filtered search
// GET filtered search
app.get('/admin/filter', async (req, res) => {
    try {
      // const name = req.body.name;
      // const age = req.body.age;
      // const race = req.body.race;
      // const primaryLanguage = req.body.primaryLanguage;
      // const zipCode = req.body.zipCode;
  
      const { name, age, race, primaryLanguage, zipCode } = req.query;
      const patientsSnapshot = await db.collection('patients').get();
  
      if (patientsSnapshot.empty) {
        return res.status(200).json({ matches: [] });
      }
  
      const matches = [];
  
      for (const patientDoc of patientsSnapshot.docs) {
        const patientData = patientDoc.data();
        console.log(patientData.zipCode);
  
        const matchesDemographics =
          (!name || patientData.name.includes(name)) &&
          (!age || patientData.age === Number(age)) &&
          (!race || patientData.race === race) &&
          (!primaryLanguage || patientData.primaryLanguage === primaryLanguage) &&
          (!zipCode || patientData.zipCode === zipCode);
          // (patientData.zipCode === Number(zipCode));
  
        if (matchesDemographics) {
          console.log(patientData);
          matches.push(patientData);
        }
      }
  
      res.status(200).json({ matches });
  
    } catch (error) {
      console.error('Error filtering records:', error);
      res.status(500).json({ error: 'Error filtering records '});
    }
  });

// Start the server
const port = 8008;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});