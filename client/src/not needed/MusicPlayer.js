// MusicPlayer.js
import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './HomePage'; 
import AlbumDetails from './AlbumDetails'; 
import Footer from './footer';
import Sidebar from './sidebar';
import SearchPage from './SearchPage';

const MusicPlayer = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="container">
      <Sidebar className="sidebar" />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/album/:albumId" element={<AlbumDetails setSelectedSong={setSelectedSong} />} />
          <Route path="/search" element={<SearchPage playSong={setSelectedSong} />} />
        </Routes>
      </div>
      <footer className="footer">
        {selectedSong && <Footer selectedSong={selectedSong} />}
      </footer>
    </div>
  );
};

export default MusicPlayer;
