import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SongResults.css';

function SongResults({ results, playSong }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/playlists');
        if (response.ok) {
          const data = await response.json();
          setPlaylists(data.playlists);
        } else {
          console.error('Failed to fetch playlists:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleOption1 = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    const popupTop = buttonRect.bottom + window.scrollY;
    const popupLeft = buttonRect.left + window.scrollX;
    setPopupPosition({ top: popupTop, left: popupLeft });
    setShowPlaylists(true);
  };
  
  const handleOption2 = async (result) => {
    try {
      const response = await axios.post('http://localhost:3002/api/likedSongs/addSong', {
        songId: result._id,
      });
  
      if (response.status === 200) {
        console.log('Song added to LikedSongs');
      } else {
        console.error('Failed to add song to LikedSongs:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while adding song to LikedSongs:', error);
    }
  };

  const handlePlaylistClick = async (playlistId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/playlists/${playlistId}/addSong`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: selectedSong._id }),
      });

      if (response.ok) {
        console.log(`Song added to playlist ${playlistId}`);
      } else {
        console.error('Failed to add song to playlist:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while adding song to playlist:', error);
    }
  };

  const closePlaylistsPopup = () => {
    setShowPlaylists(false);
  };

  const handlePlaylistNameClick = (playlistId) => {
    handlePlaylistClick(playlistId);
    closePlaylistsPopup();
  };

  return (
    <div>
      {results.length === 0 ? (
        null
      ) : (
        <table className="song-table">
          <tbody>
            {results.slice(0, 3).map((result) => ( 
              <tr key={result._id}>
                <td className="play">
                  <img src={`/images/playbu.PNG`} alt="Play" onClick={() => playSong(result)} />
                </td>
                <td className='image'>
                  <img src={`/images/${result.imageURL}`} alt={result.name} />
                </td>
                <td className='name'>{result.name}</td>
                <td className="play">
                <img src={`/images/icons8-music-heart-96.PNG`} alt="Play" onClick={() => handleOption2(result)} />
                </td>
                <td className='artist'>{result.artist}</td>
                <td className='album'>{result.album}</td>
                <td className="play">
                  <img src={`/images/icons8-add-song-96.PNG`} alt="Play" onClick={handleOption1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{showPlaylists && (
        <div
          className="playlist-popup-overlay"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="playlist-popup-content">
            <span className="close-popup" onClick={closePlaylistsPopup}>close</span>
            <h3>All Playlists</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist._id} onClick={() => handlePlaylistNameClick(playlist._id)}>
                  {playlist.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


export default SongResults;
