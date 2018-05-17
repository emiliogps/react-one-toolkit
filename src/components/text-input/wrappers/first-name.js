import React, { Component, PropTypes } from 'react';
import TextBox from './textbox';

class FirstName extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  capitalize(value) {
    return value.replace(/(^|\s)\S/g, l => l.toUpperCase());
  }

  handleChange(event) {
    const newValue = this.capitalize(event.target.value);
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div className = "first-name">
        <TextBox { ...this.props } value = { this.state.value } onChange = { this.handleChange } />
      </div>
    );
  }

}

FirstName.propTypes = {
  onChange: PropTypes.func,
};

export default FirstName;
