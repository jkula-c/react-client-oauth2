import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentsList extends Component {

    render () {
        return (
            <div>Comments: <br /><ul>
                {this.props.comments.map(
                    (comment) => <Comment key={comment.id} 
                                          id={comment.id} 
                                          text={comment.text} time={comment.time} />
                )}
            </ul></div>
        )
    }
    static propTypes = {
        // userClick: PropTypes.func.isRequired,
        comments: PropTypes.arrayOf(PropTypes.object),
    }
}

class Comment extends Component {
    render() {
        return (
            <li>Comment id: {this.props.id}<br />{this.props.text} 
            <br />Time: {this.props.time}</li>
        )
    }
    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }
}

export { CommentsList };