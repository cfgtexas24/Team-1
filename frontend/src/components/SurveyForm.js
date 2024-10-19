import React, { useState } from "react";

const SurveyForm = () => {
  // Initialize state for each question
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
        body: JSON.stringify(surveyData), // Convert the object to JSON string
      });

      if (response.ok) {
        // Handle successful response
        console.log("Survey submitted successfully!");
        // Optionally clear the form after submission
      } else {
        // Handle error response
        console.log("Error submitting the survey");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>General Questions</h2>
      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label>Gender</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
      </select>

      <label>Race</label>
      <select value={race} onChange={(e) => setRace(e.target.value)} required>
        <option value="">Select Race</option>
        <option value="asian">Asian</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="hispanic">Hispanic</option>
        <option value="other">Other</option>
      </select>

      <label>Zip Code</label>
      <input
        type="number"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />

      <h2>Medical History</h2>
      <label>Are you pregnant?</label>
      <select value={pregnant} onChange={(e) => setPregnant(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>If so, how many weeks pregnant?</label>
      <input
        type="number"
        value={weeksPregnant}
        onChange={(e) => setWeeksPregnant(e.target.value)}
      />

      <label>How many pregnancies have you had before?</label>
      <input
        type="number"
        value={previousPregnancies}
        onChange={(e) => setPreviousPregnancies(e.target.value)}
      />

      <label>Are you postpartum?</label>
      <select value={postpartum} onChange={(e) => setPostpartum(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>If postpartum, how many weeks since birth?</label>
      <input
        type="number"
        value={weeksSinceBirth}
        onChange={(e) => setWeeksSinceBirth(e.target.value)}
      />

      <label>Have you ever had a miscarriage?</label>
      <select value={pregnant} onChange={(e) => setMiscarriage(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Have you experienced any seizures in the past?</label>
      <select value={seizures} onChange={(e) => setSeizures(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="na">N/A</option>
      </select>

      <label>Have you experienced preeclampsia in the past?</label>
      <select value={preeclampsia} onChange={(e) => setPreeclampsia(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="na">N/A</option>
      </select>


      <h2>Healthcare Access</h2>
      <label>Do you have health insurance?</label>
      <select value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="uncertain">Uncertain</option>
      </select>

      <label>What is your current housing situation?</label>
      <select value={unhoused} onChange={(e) => setUnhoused(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Stable Housing Situation</option>
        <option value="no">Unstable Housing Situation</option>
      </select>

      <label>Are you currently on food stamps?</label>
      <select value={foodStamps} onChange={(e) => foodStamps(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
