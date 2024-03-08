
import React, { useState, useEffect } from 'react';

function DisplaySongs({ onSongClick }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/getAllSongs');
        if (!response.ok) {
          throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);


  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => onSongClick(song)}>
            {song.name} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplaySongs;

