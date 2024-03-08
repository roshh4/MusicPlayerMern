import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlaylistDisplay = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/playlists');
        if (response.status === 200) {
          setPlaylists(response.data.playlists);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchPlaylists();
  }, []); 

  return (
    <div className="playlist-display">
      <ul>
        {playlists.map((playlist) => (
          <p key={playlist._id}>
          <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
        </p>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;
