import React, { Component } from 'react';
import Search from './Search';
import Videos from './Videos';
import '../styles/Playlist.css';
import { database } from '../utils/firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      playlistRef: null, // loading db reference in state because it loads asynchronously
      link: '',
      copied: false,
    }

    this._handleDeletePlaylist = this._handleDeletePlaylist.bind(this);
  }

  componentDidMount() {
    // pulling playlist id from url since routing didn't work
    let playlistId = window.location.pathname.slice(1);
    let playlistRef = database.ref(`playlists/${playlistId}`);

    // setting db reference for this playlist
    this.setState({
      playlistRef: playlistRef,
      link: "https://kollaboscope-183217.firebaseapp.com/"+`${playlistId}`,
    });

    // listening for changes to this playlist's info
    playlistRef.on('value', snapshot => {
      this.setState({
        name: snapshot.val().name,
        description: snapshot.val().description
      });
    });
  }

  componentWillUnmount() {
    this.state.playlistRef.off();
  }

  _handleDeletePlaylist() {
    if(window.confirm("Are you sure? Anyone else who uses this playlist will no longer be able to!")) {
      this.state.playlistRef.remove();

      this._goHome();
    }
  }

  _goHome() {
    window.location.replace('/');
  }

  render() {
    if(this.state.playlistRef) {
      return(
        <div>
          <header>
            <p>copy and share this link to kollaborate with your friends:</p>
            <span id="share-link">https://kollaboscope-183217.firebaseapp.com/{window.location.pathname.slice(1)}</span>
            <CopyToClipboard text={this.state.link} onCopy={() => this.setState({copied: true})}>
              <button id="copy-btn">{ this.state.copied ? "copied!" : "copy link" }</button>
            </CopyToClipboard>
            <div className="lowercase">
              <div id="playlist-title">
                <h1 className="playlist-name">{this.state.name}</h1>
                <h2 className="playlist-descr">{this.state.description}</h2>
              </div>
              <nav>
                <button id="go-home"
                  onClick={this._goHome}>Go Back Home
                </button>
                <button id="deletePlaylistBtn"
                  onClick={this._handleDeletePlaylist}>Delete playlist
                </button>
              </nav>
            </div>
          </header>
            <div className="lowercase">
              <div className="playlist-container">
                <Search playlistRef={this.state.playlistRef} />
                <Videos playlistRef={this.state.playlistRef} />
              </div>
            </div>
        </div>
      );
    } else {
      return <div/>
    }
  }
}

export default Playlist;
