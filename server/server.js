const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3002;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://localhost:27017/musicDB', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  genre: [String],
  duration: String,
  songURL: String,
  imageURL: String,
});

const Song = mongoose.model('Song', songSchema);

//to get song url

app.get('/api/getAudioUrl/:songName', async (req, res) => {
  try {
    const { songName } = req.params;
    const songData = await Song.findOne({ name: songName });
    console.log(songData);

    if (!songData) {
      console.log(`Song '${songName}' not found`);
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    console.log(songData.songURL);
    const audioUrl = `/audio/${songData.songURL}`;
    console.log("Audio URL:", audioUrl);
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error fetching audio URL from the "songs" collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to get image

app.get('/api/getImageUrl/:songName', async (req, res) => {
  try {
    const { songName } = req.params;
    const songData = await Song.findOne({ name: songName });

    if (!songData) {
      console.log(`Song '${songName}' not found`);
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    const imageUrl = `/images/${songData.imageURL}`;
    console.log("Image URL:", imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error fetching image URL from the "songs" collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const albumSchema = new mongoose.Schema({
  albumTitle: String,
  artist: String,
  releaseDate: String,
  genre: [String],
  recordLabel: String,
  albumCoverArt: String,
  tracklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

const Album = mongoose.model('Album', albumSchema);

// album get

app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find().populate('tracklist');
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//album details

app.get('/api/albums/:albumId', async (req, res) => {
  const albumId = req.params.albumId;

  try {
    const album = await Album.findById(albumId).populate('tracklist'); 

    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//searchPage

app.get('/api/search', async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const songResults = await Song.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { artist: { $regex: searchTerm, $options: 'i' } },
        { album: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    const albumResults = await Album.find({
      $or: [
        { albumTitle: { $regex: searchTerm, $options: 'i' } },
        { artist: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    const formattedSongResults = songResults.map((song) => ({ ...song.toObject(), type: 'song' }));
    const formattedAlbumResults = albumResults.map((album) => ({ ...album.toObject(), type: 'album' }));

    const calculateRelevance = (item) => {
      return Object.values(item).reduce((acc, value) => {
        if (typeof value === 'string') {
          acc += value.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
        }
        return acc;
      }, 0);
    };

    const combinedResults = [...formattedSongResults, ...formattedAlbumResults].sort((a, b) => {
      const relevanceA = calculateRelevance(a);
      const relevanceB = calculateRelevance(b);

      return relevanceB - relevanceA;
    });

    res.json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const playlistSchema = new mongoose.Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

app.use(bodyParser.json());

// creating a new playlist
app.post('/api/playlists', async (req, res) => {
  const { name } = req.body;

  try {
    const playlist = new Playlist({ name });
    const savedPlaylist = await playlist.save();

    res.status(201).json(savedPlaylist);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//add playlist

app.post('/api/playlists', async (req, res) => {
  const { name } = req.body;

  try {
    const newPlaylist = await Playlist.create({ name });
    console.log("hi");
    res.status(201).json({ playlist: newPlaylist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all playlists
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/playlists/:playlistId', async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId);

    const tracksWithDetails = await Promise.all(
      playlist.tracks.map(async (trackId) => {
        const track = await Song.findById(trackId);
        return track;
      })
    );

    const playlistWithDetails = {
      ...playlist.toObject(),
      tracks: tracksWithDetails,
    };

    res.status(200).json({ playlist: playlistWithDetails });
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/playlists/:playlistId/addSong', async (req, res) => {
  const playlistId = req.params.playlistId;
  const songId = req.body.songId;
  console.log(playlistId);
    console.log(songId);

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);
    console.log(playlist);
    console.log(song);


    if (!playlist || !song) {
      return res.status(404).send('Playlist or song not found');
    }

    playlist.tracks.push(song);
    await playlist.save();

    console.log(`Song ${song.name} added to playlist ${playlist.name}`);
    res.status(200).send('Song added to playlist');
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/api/playlists/:playlistId/removeSong/:songId', async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);

    const songIndex = playlist.tracks.findIndex((track) => track.toString() === songId);

    if (songIndex !== -1) {
      playlist.tracks.splice(songIndex, 1);
    }

    const updatedPlaylist = await playlist.save();

    res.status(200).json({ playlist: updatedPlaylist });
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const likedSongSchema = new mongoose.Schema({
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
});

const LikedSong = mongoose.model('LikedSong', likedSongSchema);

app.post('/api/likedSongs/addSong', async (req, res) => {
  const { songId } = req.body;
  console.log(songId);
  try {
    const likedSong = new LikedSong({ songId });
    await likedSong.save();
    res.json({ message: 'Song added to LikedSongs' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/likedSongs', async (req, res) => {
  try {
    const likedSongs = await LikedSong.find().populate('songId');;
    console.log(likedSongs);
    res.json({ likedSongs });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/likedSongs/:id', async (req, res) => {
  const likedSongId = req.params.id;

  try {
    const deletedLikedSong = await LikedSong.findByIdAndDelete(likedSongId);

    if (!deletedLikedSong) {
      return res.status(404).json({ error: 'Liked song not found' });
    }

    res.status(200).json({ message: 'Liked song deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const recentlyPlayedSchema = new mongoose.Schema({
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const RecentlyPlayed = mongoose.model('RecentlyPlayed', recentlyPlayedSchema);


app.post('/api/recentlyPlayed', async (req, res) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: 'Invalid request. Song ID is required.' });
    }

    const recentlyPlayed = new RecentlyPlayed({ songId });

    await recentlyPlayed.save();

    res.status(200).json({ message: 'Song added to Recently Played.' });
  } catch (error) {
    console.error('Error adding recently played song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/recentlyplayed', async (req, res) => {
  try {
    const recentlyPlayed = await RecentlyPlayed
      .find()
      .populate('songId') 
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({ recentlyPlayed });
  } catch (error) {
    console.error('Error fetching recently played songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});