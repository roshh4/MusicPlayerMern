import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentlyPlayed.css';

function RecentlyPlayed({ setSelectedSong }) {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/recentlyplayed');
        if (response.status === 200) {
          const reversedRecentlyPlayed = response.data.recentlyPlayed.slice(0, 4);
          setRecentlyPlayed(reversedRecentlyPlayed);
        } else {
          console.error('Failed to fetch recently played songs:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching recently played songs:', error);
      }
    };
  
    fetchRecentlyPlayed();
  }, []);  

  const handleSongClick = (song) => {
    console.log(song);
    setSelectedSong(song);
  };

  return (
    <div>
      {recentlyPlayed.length > 0 ? (
        <div className="recently-played-tiles">
          {recentlyPlayed.map((recentlyPlayedItem) => (
            <div key={recentlyPlayedItem._id} className="recently-played-tile" onClick={() => handleSongClick(recentlyPlayedItem.songId)}>
              <img src={`images/${recentlyPlayedItem.songId.imageURL}`} alt={recentlyPlayedItem.songId.name} />
              <div className='text'>
                <p className='name'>{recentlyPlayedItem.songId.name}</p>
                <p className='artist'>{recentlyPlayedItem.songId.artist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recently played songs yet.</p>
      )}
    </div>
  );
}

export default RecentlyPlayed;
