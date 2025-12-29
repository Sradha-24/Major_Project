import React, { useState } from "react";
import "../styles/Dashboard.css";

function DiabetesForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    family_history: "not sure",
    tired: false,
    thirst: false,
    frequent_urination: false
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          family_history: formData.family_history,
          tired: formData.tired,
          thirst: formData.thirst,
          frequent_urination: formData.frequent_urination
        })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="dashboard-box">
      <h2 className="dashboard-subtitle">Diabetes Risk Prediction</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="form-input"
          required
        />

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-select"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Family History of Diabetes</label>
        <select
          name="family_history"
          value={formData.family_history}
          onChange={handleChange}
          className="form-select"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not sure">Not Sure</option>
        </select>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="tired"
              checked={formData.tired}
              onChange={handleChange}
            />
            Feeling tired
          </label>

          <label>
            <input
              type="checkbox"
              name="thirst"
              checked={formData.thirst}
              onChange={handleChange}
            />
            Frequent thirst
          </label>

          <label>
            <input
              type="checkbox"
              name="frequent_urination"
              checked={formData.frequent_urination}
              onChange={handleChange}
            />
            Frequent urination
          </label>
        </div>

        <button type="submit" className="form-button">
          Predict
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {result && result.explanation && (
        <div className="result-card">
          <h3>Result</h3>

          <p>
            <strong>Prediction:</strong>{" "}
            {result.prediction === 1 ? "High Risk" : "Low Risk"}
          </p>

          <p>
            <strong>Probability:</strong>{" "}
            {(result.probability * 100).toFixed(2)}%
          </p>

          <div>
            <strong>Factors increasing your risk:</strong>
            <ul>
              {result.explanation.increase.length > 0 ? (
                result.explanation.increase.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>No major risk-increasing factors detected.</li>
              )}
            </ul>
          </div>

          <div>
            <strong>Factors reducing your risk:</strong>
            <ul>
              {result.explanation.decrease.length > 0 ? (
                result.explanation.decrease.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>No strong protective factors identified.</li>
              )}
            </ul>
          </div>

          <div>
            <strong>Other contributing factors:</strong>
            <ul>
              {result.explanation.other.length > 0 ? (
                result.explanation.other.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>No additional factors noted.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiabetesForm;
