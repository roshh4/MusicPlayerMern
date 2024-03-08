import React, { useState } from 'react';
import OptionsPopup from '../OptionsPopup';

function SongResults({ results, playSong }) {
  const [showOptions, setShowOptions] = useState(null);

  const handleShowOptions = (result) => {
    setShowOptions(result._id);
  };

  const handleCloseOptions = () => {
    setShowOptions(null);
  };

  const handleOption1 = () => {
    console.log("Option 1");
    // Implement your logic for Option 1
    handleCloseOptions();
  };

  const handleOption2 = () => {
    console.log("Option 2");
    // Implement your logic for Option 2
    handleCloseOptions();
  };

  const handleOption3 = () => {
    console.log("Option 3");
    // Implement your logic for Option 3
    handleCloseOptions();
  };

  return (
    <div>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <strong>Title:</strong> {result.name}, <strong>Artist:</strong> {result.artist}, <strong>Album:</strong>{' '}
            {result.album}
            <span onClick={() => playSong(result)}>▶️</span>
            <button onClick={() => handleShowOptions(result)}>Options</button>

            {/* Options popup for the selected song */}
            {showOptions === result._id && (
              <div>
                <button onClick={handleOption1}>Option 1</button>
                <button onClick={handleOption2}>Option 2</button>
                <button onClick={handleOption3}>Option 3</button>
                <button onClick={handleCloseOptions}>Close</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongResults;
