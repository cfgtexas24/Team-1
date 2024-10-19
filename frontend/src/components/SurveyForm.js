import React, { useState } from "react";
import './SurveyForm.css';

const SurveyForm = () => {
  // Initialize state for each question
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [pregnant, setPregnant] = useState("");
  const [weeksPregnant, setWeeksPregnant] = useState("");
  const [previousPregnancies, setPreviousPregnancies] = useState("");
  const [miscarriages, setMiscarriage] = useState("");
  const [postpartum, setPostpartum] = useState("");
  const [weeksSinceBirth, setWeeksSinceBirth] = useState("");
  const [seizures, setSeizures] = useState("");
  const [preeclampsia, setPreeclampsia] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [unhoused, setUnhoused] = useState("");
  const [foodStamps, setFoodStamps] = useState("");

  // Submit handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the survey data
    const surveyData = {
      username,
      name,
      age,
      gender,
      race,
      zipCode,
      pregnant,
      weeksPregnant,
      previousPregnancies,
      miscarriages,
      postpartum,
      weeksSinceBirth,
      seizures,
      preeclampsia,
      healthInsurance,
      unhoused,
      foodStamps
    };

    try {
      // Send data to the backend using fetch
      const response = await fetch("/patient-initial-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        console.log("Survey submitted successfully!");
      } else {
        console.log("Error submitting the survey");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="survey-form">
      <h2>General Questions</h2>
      <div className="form-group">
        <label>Enter your username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Enter your full name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Race</label>
        <select value={race} onChange={(e) => setRace(e.target.value)} required>
          <option value="">Select Race</option>
          <option value="asian">Asian</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="hispanic">Hispanic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Zip Code</label>
        <input
          type="number"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>

      <h2>Medical History</h2>
      <div className="form-group">
        <label>Are you pregnant?</label>
        <select value={pregnant} onChange={(e) => setPregnant(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>If so, how many weeks pregnant?</label>
        <input
          type="number"
          value={weeksPregnant}
          onChange={(e) => setWeeksPregnant(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>How many pregnancies have you had before?</label>
        <input
          type="number"
          value={previousPregnancies}
          onChange={(e) => setPreviousPregnancies(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Are you postpartum?</label>
        <select value={postpartum} onChange={(e) => setPostpartum(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>If postpartum, how many weeks since birth?</label>
        <input
          type="number"
          value={weeksSinceBirth}
          onChange={(e) => setWeeksSinceBirth(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Have you ever had a miscarriage?</label>
        <select value={miscarriages} onChange={(e) => setMiscarriage(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>Have you experienced any seizures in the past?</label>
        <select value={seizures} onChange={(e) => setSeizures(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="na">N/A</option>
        </select>
      </div>

      <div className="form-group">
        <label>Have you experienced preeclampsia in the past?</label>
        <select value={preeclampsia} onChange={(e) => setPreeclampsia(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="na">N/A</option>
        </select>
      </div>

      <h2>Healthcare Access</h2>
      <div className="form-group">
        <label>Do you have health insurance?</label>
        <select value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="uncertain">Uncertain</option>
        </select>
      </div>

      <div className="form-group">
        <label>What is your current housing situation?</label>
        <select value={unhoused} onChange={(e) => setUnhoused(e.target.value)} required>
          <option value="">Select</option>
          <option value="stable">Stable Housing Situation</option>
          <option value="unstable">Unstable Housing Situation</option>
        </select>
      </div>

      <div className="form-group">
        <label>Are you currently on food stamps?</label>
        <select value={foodStamps} onChange={(e) => setFoodStamps(e.target.value)} required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
