import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid } from 'grommet';
import { SimpleTextInput } from './SimpleTextInput';
import { EditorSubBase } from './EditorBases';

class EditorBookmark extends EditorSubBase {
    render(){
        return (
        <Grid
            areas={[
                { name: 'url', start: [0, 0], end: [0, 0] },
                { name: 'submit', start: [1, 1], end: [1, 0] },
            ]}
            columns={['medium', 'small']}
            rows={['large']}
            gap='small'
            >
            <Box gridArea='url'>
                <SimpleTextInput
                    id='link-input' ref='link-input' label='Bookmark url' name='link'
                    stateCalledback={this.updateValues.bind(this)}
                    />       
            </Box>
            <Box gridArea='submit'>
                <Button active={true} alignSelf="start" margin="xsmall" plain={false}
                    onClick={this.submit.bind(this)} >
                       create 
                </Button>
                <Button active={true} alignSelf="start" margin="xsmall" plain={false}
                    onClick={this.cancel.bind(this)} >
                 Cancel
                </Button>
            </Box>
            </Grid>
            )
    }
    submit() {
        fetch(
            'http://localhost:8000/localhost/bookmarks/',
            {
                method: "POST", mode: "cors", credentials: "omit",
                headers: {
                    'Authorization': "Bearer " + this.props.clientToken.accessToken,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.props.editorValues)
            }
        )
        .then(() => {
            if (this.props.refreshBookmarks !== undefined) {
                this.props.refreshBookmarks();
            }
            this.props.stopEdit();
        })
        .catch((error) => { console.log('Error creating new bookmark', error); });
    }
    static defaultProps = {
        data: {},
        itemId: 0,
        refreshBookmarks: undefined,
    }
    static propTypes = {
        clientToken: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        editorValues: PropTypes.object.isRequired,
        isAdding: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired,
        refreshBookmarks: PropTypes.func,
        stopEdit: PropTypes.func.isRequired,
        updateValues: PropTypes.func.isRequired,
    }
}

export { EditorBookmark }