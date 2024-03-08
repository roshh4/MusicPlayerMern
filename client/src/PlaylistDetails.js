import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaylistDetails.css';

const PlaylistDetails = ({ setSelectedSong }) => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/playlists/${playlistId}`);
        console.log('Playlist Details Response:', response);
        if (response.status === 200) {
          setPlaylist(response.data.playlist);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handleSongClick = (song) => {
    console.log(song);
    setSelectedSong(song);
  };

  const handlePlaySong = (song) => {
    setSelectedSong(song);
    console.log(`Playing ${song.name}`);
  };

  const handleRemoveSong = async (songId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/playlists/${playlistId}/removeSong/${songId}`);

      if (response.status === 200) {
        setPlaylist(response.data.playlist);
        window.location.reload(); 
      }
    } catch (error) {
      console.error('An error occurred while removing the song:', error);
    }
  };

  return (
    <div className="playlist-details">
      {playlist ? (
        <div>
          <p className='planame'>{playlist.name}</p>
          <p>Last Updated on {new Date(playlist.lastUpdated).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>          <table>
            <tbody>
            {playlist.tracks.map((track) => (
              <tr key={track._id}>
                <td className='play'>
                  <img src={`/images/play.PNG`} alt="Play" onClick={() => handlePlaySong(track)} />
                </td>
                <td className='image'>
                  <img src={`/images/${track.imageURL}`} alt={track.name} />
                </td>
                  <td className='name'>{track.name}</td>
                  <td className='artist'>{track.artist}</td>
                  <td>{track.duration}</td>
                <td>
                <td className='play'>
                  <img src={`/images/delete1.PNG`} alt="del" onClick={() => handleRemoveSong(track._id)} />
                </td>
              </td>
             </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaylistDetails;
