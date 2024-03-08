import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Footer({ selectedSong }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        console.log('Fetching audio and image URLs for:', selectedSong.name);
        //fetch audio
        const audioResponse = await fetch(`http://localhost:3002/api/getAudioUrl/${encodeURIComponent(selectedSong.name)}`);

        if (!audioResponse.ok) {
          throw new Error(`Failed to fetch audio URL: ${audioResponse.status} ${audioResponse.statusText}`);
        }

        const audioData = await audioResponse.json();
        console.log('Fetched audio data:', audioData);
        setAudioUrl(audioData.audioUrl);

        //fetch image
        const imageResponse = await fetch(`http://localhost:3002/api/getImageUrl/${encodeURIComponent(selectedSong.name)}`);

        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image URL: ${imageResponse.status} ${imageResponse.statusText}`);
        }

        const imageData = await imageResponse.json();
        console.log('Fetched image data:', imageData);
        setImageUrl(imageData.imageUrl);

        // Add the recently played song to the collection
        await axios.post('http://localhost:3002/api/recentlyPlayed', {
          songId: selectedSong._id,
          createdAT: new Date(),
        });
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    if (selectedSong) {
      fetchMediaData();
    }
  }, [selectedSong]);

  const fakeAudioUrl = 'https://example.com/fake-audio.mp3';

  return (
    <div>
      {selectedSong ? (
        <div>
          {audioUrl ? (
            <div className='FootComp'>
              <span className='metadata'>
                {imageUrl && <img src={imageUrl} alt="Song Artwork" />}
                <div className='meta'>
                  <p className='footname'>{selectedSong.name}</p>
                  <p className='footartist'>{selectedSong.artist}</p>
               </div>
             </span>  
              <audio key={audioUrl} controls>
                <source src={audioUrl} type="audio/flac" />
              </audio>
            </div>
          ) : (
            <p>Loading audio...</p>
          )}
        </div>
      ) : (
        <div>loading audio
          <div className="fake-audio-player">
            <audio controls>
              <source src={fakeAudioUrl} type="audio/flac" />
            </audio>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Footer component
// function Footer({ selectedSong }) {
//   const [audioUrl, setAudioUrl] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const audioRef = React.createRef();

//   useEffect(() => {
//     const fetchMediaData = async () => {
//       try {
//         console.log('Fetching audio and image URLs for:', selectedSong.name);

//         const audioResponse = await fetch(`http://localhost:3002/api/getAudioUrl/${encodeURIComponent(selectedSong.name)}`);

//         if (!audioResponse.ok) {
//           throw new Error(`Failed to fetch audio URL: ${audioResponse.status} ${audioResponse.statusText}`);
//         }

//         const audioData = await audioResponse.json();
//         console.log('Fetched audio data:', audioData);
//         setAudioUrl(audioData.audioUrl);

//         const imageResponse = await fetch(`http://localhost:3002/api/getImageUrl/${encodeURIComponent(selectedSong.name)}`);

//         if (!imageResponse.ok) {
//           throw new Error(`Failed to fetch image URL: ${imageResponse.status} ${imageResponse.statusText}`);
//         }

//         const imageData = await imageResponse.json();
//         console.log('Fetched image data:', imageData);
//         setImageUrl(imageData.imageUrl);

//         // Add the recently played song to the collection
//         await axios.post('http://localhost:3002/api/recentlyPlayed', {
//           songId: selectedSong._id,
//           createdAT: new Date(),
//         });
//       } catch (error) {
//         console.error('Error fetching media data:', error);
//       }
//     };

//     if (selectedSong) {
//       fetchMediaData();
//     }
//     console.log(selectedSong.name);
//   }, [selectedSong]);

//   const fakeAudioUrl = 'https://example.com/fake-audio.mp3';

//   return (
//     <div>
//       {selectedSong ? (
//         <div>
//           {audioUrl ? (
//             <div className='FootComp'>
//               <span className='metadata'>
//                 {imageUrl && <img src={imageUrl} alt="Song Artwork" />}
//                 <div className='meta'>
//                 <p className='footname'>{selectedSong.name}</p>
//                 <p className='footartist'>{selectedSong.artist}</p>
//                 </div>
//               </span>
//               <audio ref={audioRef} controls>
//                 <source src={audioUrl} type="audio/flac" />
//               </audio>
//             </div>
//           ) : (
//             <p>Loading audio...</p>
//           )}
//         </div>
//       ) : (
//         <div>loading audio
//           <div className="fake-audio-player">
//             <audio controls>
//               <source src={fakeAudioUrl} type="audio/flac" />
//             </audio>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Footer;
