import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/albums');
        setAlbums(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Album List</h1>
      <ul>
        {albums.map(album => (
          <li key={album._id}>
            <h2>{album.albumTitle}</h2>
            <p>Artist: {album.artist}</p>
            <p>Release Date: {album.releaseDate}</p>
            <p>Genre: {album.genre.join(', ')}</p>
            <p>Record Label: {album.recordLabel}</p>
            <img src={album.albumCoverArt} alt={album.albumTitle} style={{ maxWidth: '200px' }} />
            <h3>Tracks:</h3>
            <ul>
              {album.tracklist.map(track => (
                <li key={track._id}>{track.name} - {track.duration}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
