import { Component } from 'react';

class EditorBase extends Component {
    cancel() {
        this.props.stopEdit();
    }
}

class EditorSubBase extends EditorBase {
    updateValues(key, value) {
        this.props.updateValues(key, value);
    }
}

export { EditorBase, EditorSubBase }