import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(""); // To store the current input number
  const [numbersList, setNumbersList] = useState([]); // To store the list of numbers

  // Base URL from the .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Function to handle submitting the number to backend
  const handleSubmitNumber = async () => {
    
    // Handle invalid inputs
    if (number < 0 || number > 20) {
      alert('Please enter a number between 0 and 20.');
      setNumber("");
      return;
    }

    try {
      await fetch(`${BASE_URL}/submit/`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: number,
        }),
      });

      setNumber(""); // Clear the input after submitting
    } catch (err) {
      console.error("Error submitting number:", err);
    }
  };

  // Function to fetch all submitted numbers from backend
  const handleFetchNumbers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/readings/`, { mode: "cors" });
      const data = await response.json();
      setNumbersList(data || []);
    } catch (err) {
      console.error("Error fetching numbers:", err);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Submit population count</h2>
        <div>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number"
          />
          <button onClick={handleSubmitNumber}>Submit count</button>
        </div>
        <button onClick={handleFetchNumbers}>
          Get population count factorials
        </button>
        {numbersList.length > 0 && (
          <div className="numbers-list" data-testid='numbers-list'>
            {numbersList.map((entry, idx) => (
              <div key={idx} className="number-entry">
                <span className="factorial">{entry.factorial || "..."}</span>
                <span className="value">Value: {entry.value}</span>
                <span className="timestamp">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
