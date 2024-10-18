import React, { useState } from 'react';
import './SurveyForm.css';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    race: '',
    zipCode: '',
    pregnant: '',
    weeksPregnant: '',
    previousPregnancies: '',
    complications: '',
    chronicConditions: '',
    medications: '',
    healthInsurance: '',
    referralSource: '',
    desiredHealthcareServices: '',
    difficultyAccessingHealthcare: '',
    healthcareChallenges: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="thank-you-message">
        <h2>Thank you for completing the survey!</h2>
        <button onClick={handleReset}>Reset Survey</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="survey-form">
      <h2>General Questions</h2>
      
      {/* Date of Birth */}
      <div className="question-block">
        <p>Date of Birth</p>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="date-input"
        />
      </div>

      {/* Gender */}
      <div className="question-block">
        <p>Gender</p>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Race */}
      <div className="question-block">
        <p>Race</p>
        <select name="race" value={formData.race} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="White">White</option>
          <option value="Black or African American">Black or African American</option>
          <option value="Asian">Asian</option>
          <option value="Native American">Native American</option>
          <option value="Hispanic or Latino">Hispanic or Latino</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Zip code */}
      <div className="question-block">
        <p>Zip Code</p>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="text-input"
        />
      </div>

      <h2>Medical History</h2>

      {/* Pregnant */}
      <div className="question-block">
        <p>Are you pregnant?</p>
        <select name="pregnant" value={formData.pregnant} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Weeks pregnant - shown conditionally if pregnant */}
      {formData.pregnant === 'Yes' && (
        <div className="question-block">
          <p>If so, how many weeks pregnant?</p>
          <input
            type="number"
            name="weeksPregnant"
            value={formData.weeksPregnant}
            onChange={handleChange}
            className="number-input"
          />
        </div>
      )}

      {/* Previous pregnancies */}
      <div className="question-block">
        <p>How many pregnancies have you had before?</p>
        <input
          type="number"
          name="previousPregnancies"
          value={formData.previousPregnancies}
          onChange={handleChange}
          className="number-input"
        />
      </div>

      {/* Complications */}
      <div className="question-block">
        <p>Have you experienced any complications in previous pregnancies?</p>
        <select name="complications" value={formData.complications} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="N/A">N/A</option>
        </select>
      </div>

      {/* Chronic conditions */}
      <div className="question-block">
        <p>Do you have any chronic medical conditions (e.g., diabetes, hypertension)?</p>
        <input
          type="text"
          name="chronicConditions"
          value={formData.chronicConditions}
          onChange={handleChange}
          className="text-input"
        />
      </div>

      {/* Medications */}
      <div className="question-block">
        <p>Are you taking any medications or supplements?</p>
        <input
          type="text"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          className="text-input"
        />
      </div>

      <h2>Healthcare Access</h2>

      {/* Health insurance */}
      <div className="question-block">
        <p>Do you have health insurance?</p>
        <select name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Uncertain">Uncertain</option>
        </select>
      </div>

      {/* Referral source */}
      <div className="question-block">
        <p>How did you hear about our services?</p>
        <select name="referralSource" value={formData.referralSource} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Referral">Referral</option>
          <option value="Social Media">Social Media</option>
          <option value="Friend/Family">Friend/Family</option>
          <option value="Internet Search">Internet Search</option>
        </select>
      </div>

      {/* Healthcare services */}
      <div className="question-block">
        <p>What healthcare services are you interested in?</p>
        <select name="healthcareServices" value={formData.healthcareServices} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Prenatal care">Prenatal care</option>
          <option value="Postpartum care">Postpartum care</option>
          <option value="Lactation support">Lactation support</option>
          <option value="Doula services">Doula services</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Mental Health">Mental Health</option>
        </select>
      </div>

      {/* Difficulty accessing healthcare */}
      <div className="question-block">
        <p>Have you had difficulty accessing healthcare in the past?</p>
        <select name="difficultyAccessingHealthcare" value={formData.difficultyAccessingHealthcare} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Healthcare challenges - shown conditionally if difficulty accessing healthcare */}
      {formData.difficultyAccessingHealthcare === 'Yes' && (
        <div className="question-block">
          <p>If yes, what were the challenges? (e.g., Cost, Location, Insurance, Availability)</p>
          <input
            type="text"
            name="healthcareChallenges"
            value={formData.healthcareChallenges}
            onChange={handleChange}
            className="text-input"
          />
        </div>
      )}

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default SurveyForm;
