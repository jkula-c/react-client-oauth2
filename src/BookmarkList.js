import React, { Component } from 'react';
import { Button } from 'grommet';
import PropTypes from 'prop-types';

class BookmarksList extends Component {
    render(){
        return(
            <ul>
                {(this.props.bookmarks.length !== 0) ? this.props.bookmarks.map(
                    (bookmark) => <Bookmark
                       key={bookmark.id} id={bookmark.id} link={bookmark.link}
                       userClick={null}
                />
                ) : '' }
            </ul>
        )
    }
    static propTypes = {
        // userClick: PropTypes.func.isRequired,
        bookmarks: PropTypes.arrayOf(PropTypes.object),
    }

}

class Bookmark extends Component {

    handleClick(event){
        // this.props.userClick(this.props.id);
    }
    render () {
        return(
            <li>{this.props.link}</li>
        )
    }
    static propTypes = {
        id: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        // userClick: PropTypes.func.isRequired,
    }
}

export { BookmarksList }