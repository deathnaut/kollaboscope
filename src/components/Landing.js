import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import '../styles/Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing lowercase">
        <header>
          <h1>KOLLABOSCOPE</h1>
        </header>
        <div className="main">
          <h2>To Begin, Create a Playlist.</h2>
          <CreatePlaylist _handleCreatePlaylist={this.props._handleCreatePlaylist} />
        </div>
        <footer>
          check it out on <a href="https://github.com/ludocracy/kollaboscope/">github</a>
        </footer>
      </div>
    );
  }
}

export default Landing;
