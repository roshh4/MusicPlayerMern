import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlaylistCreation from './PlayListCreation';
import PlaylistDisplay from './PlaylistDisplay';

const Sidebar = () => {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [refreshPlaylistDisplay, setRefreshPlaylistDisplay] = useState(false);
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    setIsCreatingPlaylist(true);
  };

  const handlePlaylistCreationComplete = () => {
    setIsCreatingPlaylist(false);
    setRefreshPlaylistDisplay((prev) => !prev);
  };


  const handleOpenFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className="sidebar">
      <div className='maincon'>
        <Link to="/">
          <div className="sidebar-link">
            <div className='homediv'>
              <img src="/images/icons8-home-96.png" className='home' alt="Home" />
              <span className='homena'>    Home</span>
            </div>
          </div>
        </Link>
        <Link to="/search">
          <div className="sidebar-link">
            <div className='homediv'>
              <img src="/images/icons8-search-96.png" className='home' alt="Home" />
              <span className='homena'>Search</span>
            </div>
          </div>      
        </Link>
        <div onClick={handleOpenFavorites}>
          <div className="sidebar-link">
            <div className='homediv'>
              <img src="/images/icons8-favorites-96.png" className='home' alt="Home" />
              <span className='favna'>Favorites</span>
            </div>
          </div>  
        </div>
        <div >
          <img src="/images/icons8-line-80.png" className='line' alt="Home" />
        </div>
        <div className="sidebar-link">
          <div className='homediv'>
            <img src="/images/icons8-playlist-96.png" className='home' alt="Home" />
            <span className='favna'>Playlists</span>
          </div>
        </div>
        <div className="crenew" onClick={handleCreatePlaylist}>
          <p>+ create new</p>
        </div>
      </div>
      {isCreatingPlaylist && (
        <PlaylistCreation onClose={handlePlaylistCreationComplete} />
      )}

      <div>
        <PlaylistDisplay key={refreshPlaylistDisplay} />
      </div>
    </div>
  );
};

export default Sidebar;
