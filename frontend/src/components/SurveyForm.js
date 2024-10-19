import React, { useState } from "react";
import './SurveyForm.css';
import { Link, useNavigate } from 'react-router-dom';

const SurveyForm = () => {
  // Initialize state for each question
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");
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

  const navigate = useNavigate();

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
          navigate("/patient-dashboard"); // Navigate to the patient dashboard
        } else {
          console.log("Error submitting the survey");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">General Questions</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Enter your username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Enter your full name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Race</label>
        <select value={race} onChange={(e) => setRace(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select Race</option>
          <option value="asian">Asian</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="hispanic">Hispanic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">What's your primary language?</label>
        <input
          type="text"
          value={primaryLanguage}
          onChange={(e) => setPrimaryLanguage(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Zip Code</label>
        <input
          type="number"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Medical History</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Are you pregnant?</label>
        <select value={pregnant} onChange={(e) => setPregnant(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">If so, how many weeks pregnant?</label>
        <input
          type="number"
          value={weeksPregnant}
          onChange={(e) => setWeeksPregnant(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">How many pregnancies have you had before?</label>
        <input
          type="number"
          value={previousPregnancies}
          onChange={(e) => setPreviousPregnancies(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Are you postpartum?</label>
        <select value={postpartum} onChange={(e) => setPostpartum(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">If postpartum, how many weeks since birth?</label>
        <input
          type="number"
          value={weeksSinceBirth}
          onChange={(e) => setWeeksSinceBirth(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Have you had seizures?</label>
        <select value={seizures} onChange={(e) => setSeizures(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Have you experienced preeclampsia?</label>
        <select value={preeclampsia} onChange={(e) => setPreeclampsia(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Additional Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Do you have health insurance?</label>
        <select value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Are you unhoused?</label>
        <select value={unhoused} onChange={(e) => setUnhoused(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Do you receive food stamps?</label>
        <select value={foodStamps} onChange={(e) => setFoodStamps(e.target.value)} required className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <button type="submit" className="mt-4 w-full bg-blue-400 text-white p-3 rounded-md hover:bg-blue-500 transition duration-300">
        Submit
      </button>
      <Link to="/" className="block text-center mt-4 text-blue-500 hover:underline">
        Go back to home
      </Link>
    </form>
  );
};

export default SurveyForm;
