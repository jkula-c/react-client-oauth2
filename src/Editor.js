import React from 'react';
import PropTypes from 'prop-types';
import { EditorBase } from './EditorBases';
import { EditorBookmark } from './EditorBookmark';

const editorMasks = {
    BOOKMARK: 1,
    ADDING: 1 << 3,
    AMENDING: 1 << 4,
};

class Editor extends EditorBase {
    constructor(props) {
        super(props);
        // this.state is the value of input fields witch is distinct
        // from this.props.state which is editor configuration
        this.state = {}
    }
    render () {

        const adding = ((this.props.state & editorMasks.ADDING) !== 0 );
        const amending = ((this.props.state & editorMasks.AMENDING !==0 ));
        const blankrender = !(adding || amending);
        if (blankrender) return '';
        else if ((this.props.state & editorMasks.BOOKMARK) !== 0)
            return (
                <EditorBookmark
                    clientToken={this.props.clientToken}
                    editorValues={this.state}
                    isAdding={adding} isEditing={amending}
                    refreshBookmarks={this.props.refreshBookmarks}
                    stopEdit={this.props.stopEdit}
                    updateValues={this.updateValues.bind(this)}
                    />
            )
            return (
                <div className="editor">{(blankrender) ? '' : <p>Editor</p>}</div>
            )

    }
    updateValues(key, value) {
        let updateObj = this.state;
        updateObj[key] = value;
        this.setState(updateObj);
    }
    static defaultProps = {
        state: 0,
        itemId: 0,
        refreshBookmarks: undefined
    }
    static propTypes = {
        state: PropTypes.number.isRequired,
        itemId: PropTypes.number.isRequired,
        stopEdit: PropTypes.func.isRequired,
        refreshBookmarks: PropTypes.func,
        clientToken: PropTypes.object.isRequired,
    }
}

export { Editor, editorMasks };