import React, { Component } from 'react';
import { Button, Box, Grid } from 'grommet';
import PropTypes from 'prop-types';
import queryString from 'query-string'

class BookmarksList extends Component {
    render () {
        return (
            <>
            <ul>
                {(this.props.bookmarks.length !== 0) ? this.props.bookmarks.map(
                    (bookmark) => { 
                           return <Bookmark
                            key={bookmark.id} id={bookmark.id} link={bookmark.link}
                            location={this.props.location} history={this.props.history}
                            refreshThisBookmark={this.props.refreshThisBookmark}
                            selectClick={this.props.selectClick}
                            selectedBookmark={this.props.selectedBookmark}
                    />
                    }) : ''}
            </ul>
            <BookmarkAddButton
              userClick={this.props.addBookmarkStart}
              location={this.props.location} history={this.props.history}
              />
            </>
        )
    }
    static defaultProps = {
        selectBookmark: null,
    }
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        bookmarks: PropTypes.arrayOf(PropTypes.object),
        refreshThisBookmark: PropTypes.func,
        selectClick: PropTypes.func.isRequired,
        selectedBookmark: PropTypes.object,
    }
}

class Bookmark extends Component {
    handleClick(event){
        this.props.selectClick(this.props.id);
    }
    render() {
        return(
            <li onClick={this.handleClick.bind(this)}>{this.props.link}</li>
        )
    }
    static propTypes = {
        id: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        selectClick: PropTypes.func.isRequired,
    }
}

class BookmarkAddButton extends Component {
    handleClick(event){
        let queryStringValues = queryString.parse(this.props.location.search);
        queryStringValues['add_bookmark'] = ''
        let newLocation = this.props.location.pathname + '?' +
            queryString.stringify(queryStringValues);
        this.props.history.push(newLocation);
        this.props.userClick();
    }
    render() {
        return (
            <Button alignSelf="center" margin="small" plain={false}
                   onClick={this.handleClick.bind(this)} >
                       New bookmark
                   </Button>
        )
    }
    static propTypes = {
        userClick: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }
}

export { BookmarksList };