// import React, { useState } from 'react';

// function PlaySong({ selectedSong }) {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     // You can implement the actual logic for playing and pausing the selected song here
//     // For simplicity, I'm just logging the play/pause action
//     console.log(`${isPlaying ? 'Pausing' : 'Playing'}: ${selectedSong.name}`);
//   };

//   return (
//     <div>
//       {selectedSong ? (
//         <div>
//           <h2>Now Playing</h2>
//           <p>Song: {selectedSong.name}</p>
//           <p>Artist: {selectedSong.artist}</p>
//           <p>Album: {selectedSong.album}</p>
//           <p>Duration: {selectedSong.duration}</p>
//           <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
//         </div>
//       ) : (
//         <p>No song selected</p>
//       )}
//     </div>
//   );
// }

// export default PlaySong;
