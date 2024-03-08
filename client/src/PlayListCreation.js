import React, { useState } from 'react';
import axios from 'axios';

const PlaylistCreation = ({ onClose }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/playlists', {
        name: playlistName,
      });

      if (response.status === 201) {
        console.log('Playlist created successfully');
        onClose(); 
      } else {
        console.error('Failed to create playlist');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="playlist-creation">
      <div className="close-btn" onClick={onClose}>
        &times;
      </div>
      <h2>Create Playlist</h2>
      <label htmlFor="playlistName">Playlist Name:</label>
      <input
        type="text"
        id="playlistName"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <br />
      <button onClick={handleCreatePlaylist}>Create</button>
    </div>
  );
};

export default PlaylistCreation;