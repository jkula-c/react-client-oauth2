import React, { Component } from 'react';
import Main from './Main';
var ClientOAuth2 = require('client-oauth2');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      bookmarkData: null,
      clientToken: {},
      retrieveBookmarkData: false,
    }
  }
  componenentDidMount(){
    var serverAuth = new ClientOAuth2({
      clientId: 'n0ksuebCpq039ggQtOQv7gIRvV0OhCWNCC3yhcmp',
      clientSecret: 'TjpQIyZ7mFiDvb3f170arTXYxRx1qTChmUpk8d3nOfJHhUKpZEHsb8vq26mdQ2zFpwCk7z2qPQmCk9MOB7uRsbxPkNUZ3UB5UYSKNPpq5P9tNf7w3raOlkRolKmc0hl2',
      accessTokenUri: 'http://localhost:8000/locations/o/token/',
      redirectUri: 'http://localhost:8000/locations/bookmarks/',
      scopes: ['read', 'write']
    })
    serverAuth.owner.getToken('user', 'useruser')
      .then((inToken) => {
        console.log(inToken);
        this.setState({clientToken: inToken}, () => {
          this.getBookmarks();
        });
      })
      .catch((error) => {console.log('Token request error', error);} );
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
      <Main data={[]} />
    )
    
  }
}




