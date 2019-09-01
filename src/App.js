import React, { Component } from 'react';
// import { BrowserRouter, Route} from 'react-router-dom';
import Main from './Main.js';
import { editorMasks } from './Editor.js';
import ClientOAuth2  from 'client-oauth2';
// import queryString from 'query-string'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      bookmarkData: null,
      clientToken: {},
      editorState: 0,
      retrievedBookmarkData: false,
    }
  }

  componentDidMount() {
    var serverAuth = new ClientOAuth2({
      clientId: 'n0ksuebCpq039ggQtOQv7gIRvV0OhCWNCC3yhcmp',
      clientSecret: 'TjpQIyZ7mFiDvb3f170arTXYxRx1qTChmUpk8d3nOfJHhUKpZEHsb8vq26mdQ2zFpwCk7z2qPQmCk9MOB7uRsbxPkNUZ3UB5UYSKNPpq5P9tNf7w3raOlkRolKmc0hl2',
      accessTokenUri: 'http://localhost:8000/locations/o/token/',
      redirectUri: 'http://localhost:8000/locations/bookmarks/',
      scopes: ['read', 'write']
    })
    serverAuth.owner.getToken('user', 'useruser')
      .then((inToken) => {
        this.setState({clientToken: inToken}, () => {
          this.getBookmarks();
        });
      })
      .catch((error) => {console.log('Token request error', error);});
  }
  createBookmarkStart(){
    // change editor state to commence adding a bookmark
    let editorState = 0;
    editorState |= editorMasks.BOOKMARK;
    editorState |= editorMasks.ADDING;
    this.setState({ editorState: editorState  })
  }

  getBookmarks() {
    fetch('http://localhost:8000/locations/bookmarks/',
      {
        method: "GET", mode: "cors", credentials: "omit",
        headers: {
          'Authorization': "Bearer " + this.state.clientToken.accessToken
        }
      } 
    )
    .then(response => response.json())
    .then(responseData => this.setState({ data: responseData.results }))
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  selectBookmark(id) {
    // Cannot fetch a bookmark until we have a token
    if (Object.keys(this.state.clientToken).length === 0) return;
    fetch(
      'http://localhost:8000/locations/bookmarks/' + id + '/',
      {
        method: "GET", mode: "cors", credentials: "omit",
        headers: {'Authorization': "Bearer " + this.state.clientToken.accessToken }
      }
    )
    .then(response => response.json())
    .then((responseData) => {
      return this.setState({
        bookmarkData: responseData, retrievedBookmarkData: true
      })
    })
    .catch((error) => {
      console.log('Error fetching and parsing bookmark instance data', error);
    })
  }
  stopEdit(){
    // change state to stop editing
    this.setState({editorState: 0})
  }
  render(){
    return (
      <Main 
          bookmarkData={this.state.bookmarkData} data={this.state.data}
          selectClick={this.selectBookmark.bind(this)} 
          />
    )
    
  }
}




