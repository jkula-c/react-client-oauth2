import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CommentsList } from './CommentsList';
// import { NotesList } from './NotesList';

class BookmarkDetail extends Component {

    render() {
        return (
            <div className="bookmark_detail">
                {(this.props.detail === null) ? '' : <BookmarkDetailOverview
                   url={this.props.detail.url } numLikes={this.props.detail.num_likes}
                />}
                {(this.props.detail == null) ? '' :
                  (this.props.detail.comments.length > 0) ?
                   <CommentsList comments={this.props.detail.comments} /> : 
                   <p>There are no comments made on this bookmark</p>
                }
                {/* {(this.props.detail == null) ? ''  :
                 (this.props.detail.notes.length > 0) ?
                    <NotesList notes={this.props.detail.notes} /> :
                    <p>There are no notes made on this bookmark</p>
                } */}
            </div>
        )
    }
    static defaultProps = {
        detail : null,

    }
    static propTypes = {
        detail : PropTypes.object,
    }
}

class BookmarkDetailOverview extends Component {
    render() {
        return (
            <p>
                Url: {this.props.url }<br /> Number of likes : {this.props.numLikes}
            </p>
        )
    }
    static propTypes = {
        url: PropTypes.string.isRequired,
        numLikes: PropTypes.number.isRequired,
    }
}

export { BookmarkDetail };