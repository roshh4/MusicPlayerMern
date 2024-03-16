import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './HomePage'; 
import AlbumDetails from './AlbumDetails'; 
import Footer from './footer';
import Sidebar from './sidebar';
import SearchPage from './SearchPage';
import PlaylistDetails from './PlaylistDetails';
import Favorites from './Favorites.js'; 

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Sidebar className="sidebar" />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Homepage setSelectedSong={setSelectedSong}/>}
              />
              <Route
                path="/album/:albumId"
                element={<AlbumDetails setSelectedSong={setSelectedSong} />}
              />
              <Route
                path="/search"
                element={<SearchPage playSong={setSelectedSong} />}
              />
              <Route
                path="/playlist/:playlistId"
                element={<PlaylistDetails setSelectedSong={setSelectedSong} />}
              />
              {/* Add the route for the Favorites page */}
              <Route
                path="/favorites"
                element={<Favorites setSelectedSong={setSelectedSong} />}
              />
              {/* <Route
                path="/"
                element={<RecentlyPlayed setSelectedSong={setSelectedSong} />}
              /> */}
            </Routes>
          </div>
        </div>
        <footer className="footer">
          {selectedSong && <Footer selectedSong={selectedSong} />}
        </footer>
      </div>
    </Router>
  );
}

export default App;