import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';
import './AlbumTile.css';

const AlbumTile = ({ setSelectedSong }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/albums')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setAlbums(data))
      .catch(error => console.error(error));
  }, []);



  return (
    <div id="album-container">
      {albums.map(album => (
        <Link key={album._id} to={`/album/${album._id}`} className="album-tile">
          <img
            src={`images/${album.albumCoverArt}`}
            alt={`${album.albumTitle} Cover`}
            className="cover-art"
          />
          <h3>{album.albumTitle}</h3>
          <p>{album.artist}</p>
        </Link>
      ))}
    </div>
  );
};

export default AlbumTile;

