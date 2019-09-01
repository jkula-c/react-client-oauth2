import React, { Component } from 'react';
// import { BrowserRouter, Route} from 'react-router-dom';
import Main from './Main.js';
// import { editorMasks } from './Editor.js';
import ClientOAuth2  from 'client-oauth2';
// import queryString from 'query-string'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alterId: null,
      selectedBookmarkId: null,
      data: [],
      bookmarkData: null,
      clientToken: {},
      editorState: 0,
      retrievedBookmarkData: false,
    }
  }
  // componentWillMount() {
  //   const parsed = queryString.parse(window.location.search);
  //   this.processQueryString(parsed);
  // }
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
    .then(responseData => this.setState({ data: responseData }))
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }
  render(){
    console.log(this.state.clientToken);
    return (
      <Main data={this.state.data} />
    )
    
  }
}




