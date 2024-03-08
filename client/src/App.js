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

// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const audio = audioRef.current;

//     audio.addEventListener('play', () => setIsPlaying(true));
//     audio.addEventListener('pause', () => setIsPlaying(false));
//     audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
//     audio.addEventListener('durationchange', () => setDuration(audio.duration));

//     return () => {
//       audio.removeEventListener('play', () => setIsPlaying(true));
//       audio.removeEventListener('pause', () => setIsPlaying(false));
//       audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
//       audio.removeEventListener('durationchange', () => setDuration(audio.duration));
//     };
//   }, []);

//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (audio.paused) {
//       audio.play();
//     } else {
//       audio.pause();
//     }
//   };

//   const handleVolumeChange = (event) => {
//     const audio = audioRef.current;
//     setVolume(event.target.value);
//     audio.volume = event.target.value;
//   };

//   const calculateProgress = () => {
//     return (currentTime / duration) * 100;
//   };

//   const handleTouchMove = (event) => {
//     const audio = audioRef.current;
//     const touch = event.touches[0];
//     const touchX = touch.pageX - event.target.getBoundingClientRect().left;
//     const progressBarWidth = event.target.clientWidth;
//     const progress = (touchX / progressBarWidth) * 100;

//     audio.currentTime = (progress / 100) * duration;
//   };

//   return (
//     <div className="audio-player-container">
//       <audio ref={audioRef} src="audio/01-fka_twigs-thousand_eyes.flac"></audio>

//       <div id="customControls">
//         <button onClick={togglePlayPause}>
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <input
//           type="range"
//           min="0"
//           max="1"
//           step="0.1"
//           value={volume}
//           onChange={handleVolumeChange}
//         />
//         <progress
//           value={calculateProgress()}
//           max="100"
//           onTouchMove={handleTouchMove}
//         ></progress>
//         <div className="progress-details">
//           <span>Current Time: {currentTime.toFixed(2)}s</span>
//           <span>Duration: {duration.toFixed(2)}s</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
