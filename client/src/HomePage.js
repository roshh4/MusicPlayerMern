import React, { useState, useEffect } from 'react';
import AlbumTile from './AlbumTile';
import RecentlyPlayed from './RecentlyPlayed.js';
import './HomePage.css';

const Homepage = ({ setSelectedSong }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning! Welcome Back');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon! Welcome Back');
    } else {
      setGreeting('Good evening! Welcome Back');
    }
  }, []);

  return (
    <div className='hp'>
      <div className='top'>
        <div className='gr'>
          <div><p className='greeting'>{greeting}</p></div>
          <img src='images/maybe5.PNG' className='maybe'/>
        </div>
        <div className='recplay'><h2>Recently Played</h2> <RecentlyPlayed setSelectedSong={setSelectedSong}/></div>
      </div>
      <div className='albums'><p className='AlbumTilen'>Albums</p><AlbumTile setSelectedSong={setSelectedSong} /></div>
    </div>
  );
};

export default Homepage;