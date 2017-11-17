import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Search.css';
import SearchResults from './SearchResults';

class Search extends Component {
  _handleSubmitSearch(e) {
    e.preventDefault();
    let query = '';
    let url = `https://www.googleapis.com/youtube/v3/search${query}`
    let params = {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: '10',
        key: 'AIzaSyA57V2_-uR3DOFwmcmH8qZzr0ZXffXdaPY'
      };

    axios.get(url, params)
    .then(response => {

    })
    .catch(error => {
      console.log(error); // TODO alert user somehow?
    })
  }

  render() {
    return(
      <div className="song-crud display-element">
        <div className="song-search">
          <form id="searchForm" onSubmit={this._handleSubmitSearch}>
            <p>Search and Add Songs:</p>
            <input type="text" placeholder="type in a song" ref={input => this.query = input} />
            <button id="youtube-search-btn" type="submit">Search Youtube</button>
          </form>

        </div>
      </div>
    );
  }
}

export default Search;
