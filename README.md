# Music Player MERN Application

A full-stack music player application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to play, organize, and discover music.

## Features

- Music playback
- Playlist management
- Like and favorite songs
- Album organization
- Recently played tracking

  
![image](https://github.com/user-attachments/assets/fd045c1c-71fb-4e14-a24d-37b2bd70a80a)

## Tech Stack

##MongoDB – Stores music, user, and playlist data.

##Express.js – Handles backend routing and APIs.

##React.js – Builds the interactive user interface.

##Node.js – Runs the server and backend logic.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd FinalMusicPlayerMern
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=3002
MONGODB_URI=mongodb://localhost:27017/musicDB
CORS_ORIGIN=http://localhost:3000
AUDIO_STORAGE_PATH=/audio
IMAGE_STORAGE_PATH=/images
```

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client (in a new terminal):
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
FinalMusicPlayerMern/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # React source code
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   └── server.js         # Express server
└── .env                  # Environment variables
```

## API Endpoints

### Songs
- `GET /api/getAudioUrl/:songName` - Get song audio URL
- `GET /api/getImageUrl/:songName` - Get song image URL

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:albumId` - Get album details

### Playlists
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create new playlist
- `GET /api/playlists/:playlistId` - Get playlist details
- `POST /api/playlists/:playlistId/addSong` - Add song to playlist

### Search
- `GET /api/search` - Search songs and albums

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All sensitive information is stored in environment variables
- CORS is properly configured
- Input validation and sanitization implemented
- Secure password hashing with bcrypt

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js community
- MongoDB documentation
- Express.js framework
- All open-source libraries used in this project 
