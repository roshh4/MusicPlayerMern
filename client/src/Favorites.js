import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favorites({ setSelectedSong }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/likedSongs');
        if (response.status === 200) {
          setLikedSongs(response.data.likedSongs);
        } else {
          console.error('Failed to fetch liked songs:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching liked songs:', error);
      }
    };

    fetchLikedSongs();
  }, []);

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

  const handlePlaySong = (song) => {
    setSelectedSong(song.songId); 
  };

  const handleDeleteSong = async (songId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/likedSongs/${songId}`);

      if (response.status === 200) {
        setLikedSongs((prevLikedSongs) => prevLikedSongs.filter((song) => song._id !== songId));
      } else {
        console.error('Failed to delete song:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while deleting song:', error);
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      {likedSongs.length > 0 ? (
        <table className="favorites-table">
          <tbody>
            {likedSongs.map((likedSong) => (
              <tr key={likedSong._id}>
                <td className='play'>
                  <img src={`/images/play.PNG`} alt="Play" onClick={() => handlePlaySong(likedSong)} />
                </td>
                <td className='image'>
                  <img src={`/images/${likedSong.songId.imageURL}`} alt={likedSong.songId.name} />
                </td>
                <td>{likedSong.songId.name}</td>
                <td>{likedSong.songId.artist}</td>
                <td>{likedSong.songId.album}</td>
                <td>{likedSong.songId.duration}</td>
                <td className='play'>
                  <img src={`/images/delete1.PNG`} alt="del" onClick={() => handleDeleteSong(likedSong._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No liked songs yet.</p>
      )}
    </div>
  );
}

export default Favorites;
