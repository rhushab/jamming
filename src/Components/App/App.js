import React, { useState } from 'react';
import styles from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import { Spotify } from '../../util/Spotify/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'name 1',
      artist: 'artist 1',
      album: 'album 1',
      id: 1,
    },
    {
      name: 'name 2',
      artist: 'artist 2',
      album: 'album 2',
      id: 2,
    },
    {
      name: 'name 4',
      artist: 'artist 4',
      album: 'album 4',
      id: 4,
    },
  ]);
  const [playlistName, setPlaylistName] = useState('Playlist name');

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'name 1',
      artist: 'artist 1',
      album: 'album 1',
      id: 1,
    },
    {
      name: 'name 2',
      artist: 'artist 2',
      album: 'album 2',
      id: 2,
    },
    {
      name: 'name 3',
      artist: 'artist 3',
      album: 'album 3',
      id: 3,
    },
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('Track already exists');
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search} />
        <div className={styles['App-playlist']}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
