import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(''); // To store the current input number
  const [numbersList, setNumbersList] = useState([]); // To store the list of numbers

  // Base URL from the .env file
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Function to handle submitting the number to backend
  const handleSubmitNumber = async () => {
    try {
      await fetch(`${BASE_URL}/submit/`, {
        mode:'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "value": number
        }),
      });

      setNumber(''); // Clear the input after submitting
    } catch (err) {
      console.error('Error submitting number:', err);
    }
  };

  // Function to fetch all submitted numbers from backend
  const handleFetchNumbers = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/readings/`,
        {mode:'cors'}
        );
      const data = await response.json();
      setNumbersList(data || []); 
    } catch (err) {
      console.error('Error fetching numbers:', err);
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
        <button onClick={handleFetchNumbers}>Get population count over time</button>
        <ul>
          {numbersList.map((entry, idx) => (
            <li key={idx}>
              Value: {entry.value}, Timestamp: {entry.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
