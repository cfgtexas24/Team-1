import React, { useState } from "react";

const SurveyForm = () => {
  // Initialize state for each question
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [pregnant, setPregnant] = useState("");
  const [weeksPregnant, setWeeksPregnant] = useState("");
  const [previousPregnancies, setPreviousPregnancies] = useState("");
  const [complications, setComplications] = useState("");
  const [chronicConditions, setChronicConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [interestedServices, setInterestedServices] = useState("");
  const [accessDifficulty, setAccessDifficulty] = useState("");
  const [challenges, setChallenges] = useState("");

  // Submit handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the survey data
    const surveyData = {
      dob,
      gender,
      race,
      zipCode,
      pregnant,
      weeksPregnant,
      previousPregnancies,
      complications,
      chronicConditions,
      medications,
      healthInsurance,
      referralSource,
      interestedServices,
      accessDifficulty,
      challenges,
    };

    try {
      // Send data to the backend using fetch (or axios)
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
        // Optionally, clear the form after submission
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
      <label>Date of Birth</label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
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
        type="text"
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

      <label>Have you experienced any complications in previous pregnancies?</label>
      <select value={complications} onChange={(e) => setComplications(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="na">N/A</option>
      </select>

      <label>Do you have any chronic medical conditions (e.g., diabetes, hypertension)?</label>
      <input
        type="text"
        value={chronicConditions}
        onChange={(e) => setChronicConditions(e.target.value)}
        required
      />

      <label>Are you taking any medications or supplements?</label>
      <input
        type="text"
        value={medications}
        onChange={(e) => setMedications(e.target.value)}
        required
      />

      <h2>Healthcare Access</h2>
      <label>Do you have health insurance?</label>
      <select value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="uncertain">Uncertain</option>
      </select>

      <label>How did you hear about our services?</label>
      <select value={referralSource} onChange={(e) => setReferralSource(e.target.value)} required>
        <option value="">Select</option>
        <option value="referral">Referral</option>
        <option value="social-media">Social Media</option>
        <option value="friend-family">Friend/Family</option>
        <option value="internet-search">Internet Search</option>
      </select>

      <label>What healthcare services are you interested in?</label>
      <select value={interestedServices} onChange={(e) => setInterestedServices(e.target.value)} required>
        <option value="">Select</option>
        <option value="prenatal-care">Prenatal care</option>
        <option value="postpartum-care">Postpartum care</option>
        <option value="lactation-support">Lactation support</option>
        <option value="doula-services">Doula services</option>
        <option value="nutrition">Nutrition</option>
        <option value="mental-health">Mental Health</option>
      </select>

      <label>Have you had difficulty accessing healthcare in the past?</label>
      <select value={accessDifficulty} onChange={(e) => setAccessDifficulty(e.target.value)} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>If yes, what were the challenges?</label>
      <input
        type="text"
        value={challenges}
        onChange={(e) => setChallenges(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
