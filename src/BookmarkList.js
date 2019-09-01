import React, { Component } from 'react';
import { Button } from 'grommet';
import PropTypes from 'prop-types';

class BookmarksList extends Component {
    render () {
        return (
            <ul>
                {(this.props.bookmarks.length !== 0) ? this.props.bookmarks.map(
                    (bookmark) => { 
                           return <Bookmark
                            key={bookmark.id} id={bookmark.id} link={bookmark.link}
                            selectClick={this.props.selectClick}
                    />
                    }) : ''}
            </ul>
        )
    }
    static propTypes = {
        selectClick: PropTypes.func.isRequired,
        bookmarks: PropTypes.arrayOf(PropTypes.object),
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

export { BookmarksList };