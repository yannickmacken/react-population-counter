import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(''); // To store the current input number
  const [numbersList, setNumbersList] = useState([]); // To store the list of numbers

  // Function to handle submitting the number to backend
  const handleSubmitNumber = async () => {
    try {
      // Assuming you have a backend endpoint '/submitNumber' to POST the number
      await fetch('/submitNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
      });

      setNumber(''); // Clear the input after submitting
    } catch (err) {
      console.error('Error submitting number:', err);
    }
  };

  // Function to fetch all submitted numbers from backend
  const handleFetchNumbers = async () => {
    try {
      const response = await fetch('/getNumbers');
      const data = await response.json();
      setNumbersList(data.numbers || []); // Assuming the backend returns an object with a 'numbers' property
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
          {numbersList.map((num, idx) => (
            <li key={idx}>{num}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
