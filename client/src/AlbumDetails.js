import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AlbumDetails.css';

const AlbumDetails = ({ setSelectedSong }) => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3002/api/albums/${albumId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setAlbum(data))
      .catch(error => console.error(error));
  }, [albumId]);

  const playTrack = (track, index) => {
    setSelectedSong(track);
    setCurrentTrackIndex(index);
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % album.tracklist.length;
    setSelectedSong(album.tracklist[nextIndex]);
    setCurrentTrackIndex(nextIndex);
  };

  if (!album) {
    return <p>Loading...</p>;
  }

  return (
    <div className='album-details'>
      <div className='metadata'>
        <div className='Left'><img src={`/images/${album.albumCoverArt}`} alt={album.albumTitle} className='album-cover' /></div>
        <div className='Right'>
          <p className='album-title'>{album.albumTitle}</p>
          <p className='artist-info'>{album.artist}</p>
          <p className='release-info'>{album.releaseDate}</p>
        </div>
      </div>
      <table className='tracks-table'>
        <tbody>
          {album.tracklist.map((track, index) => (
            <tr key={track._id}>
              <td className='play'>
                  <img src={`/images/play.PNG`} alt="Play" onClick={() => playTrack(track, index)} />
                </td>
              
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>{track.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumDetails;
