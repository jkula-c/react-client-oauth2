import React, { Component} from 'react';
import { TextInput } from 'grommet';
import PropTypes from 'prop-types';
import { FormField} from 'grommet';

class SimpleTextInput extends Component {

    state = { value: "" }
    ref = React.createRef();
    onChange = event => {this.setState(
        { value: event.target.value },
        () => {
            if (this.props.stateCallback !== undefined) {
                this.props.stateCallback(this.props.name, this.state.value);
            }
        }
    );}
    render() {
        const { value } = this.state;
        return (
            <FormField label={this.props.label} htmlFor={this.props.id}>
                <TextInput
                  id={this.props.id} name={this.props.name}
                  placeholder={this.props.placeholder}
                  value={value} onChange={this.onChange}
                  />
            </FormField>
        );
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        stateCallback: PropTypes.func,
    }
    static defaultProps = {
        placeholder: '',
        stateCallback: undefined,
    }
}

export { SimpleTextInput }