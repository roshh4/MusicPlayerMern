import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AlbumResults.css';

function AlbumResults({ results }) {
  const navigate = useNavigate();

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  if (results.length === 0) {
    return null;
  }

  const displayedResults = results.slice(0, 4);

  return (
    <div className="album-results">
      <div className="album-tiles">
        {displayedResults.map((result) => (
          <div key={result._id} className="album-tile" onClick={() => handleAlbumClick(result._id)}>
            <img src={`/images/${result.albumCoverArt}`} alt={result.albumTitle} className="album-image" />
            <div className="album-info">
              {result.albumTitle}
               <p>{result.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumResults;