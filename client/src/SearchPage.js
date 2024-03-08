import React, { useState, useEffect } from 'react';
import SongResults from './SongResults';
import AlbumResults from './AlbumResults';
import './SearchPage.css'

function SearchPage({ playSong }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [songResults, setSongResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(async (term) => {
    if (term.trim() === '') {
      setSongResults([]);
      setAlbumResults([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3002/api/search?q=${encodeURIComponent(term)}`);
      const data = await response.json();
  
      setSongResults(data.filter((item) => item.type === 'song'));
      setAlbumResults(data.filter((item) => item.type === 'album'));
    } catch (error) {
      console.error(error);
    }
  }, 300);
  

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <div className='right'>
      <input
        type="text"
        placeholder="Search for songs or albums"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='results' >
        <SongResults className="songres" results={songResults} playSong={playSong} />
        <AlbumResults results={albumResults} />
      </div>
    </div>
  );
}

export default SearchPage;