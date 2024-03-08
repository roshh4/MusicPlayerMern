// OptionsPopup.js
import React from 'react';

function OptionsPopup({ playlists, showPlaylists, handleOption1, handleOption2, handleOption3, handleCloseOptions, handlePlaylistClick, selectedSong }) {
  return (
    <div className="popup">
      <div className="popup-options">
        {handleOption1 && (
          <button className="popup-option" onClick={() => handleOption1(selectedSong)}>
            Option 1
          </button>
        )}
        {handleOption2 && (
          <button className="popup-option" onClick={handleOption2}>
            Option 2
          </button>
        )}
        {handleOption3 && (
          <button className="popup-option" onClick={handleOption3}>
            Option 3
          </button>
        )}
      </div>
      
      {/* Display playlists only when Option 1 is clicked */}
      {showPlaylists && (
        <div>
          <h3>All Playlists</h3>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist._id} onClick={() => handlePlaylistClick(playlist._id)}>
                {playlist.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleCloseOptions}>Close Options</button>
    </div>
  );
}

export default OptionsPopup;
