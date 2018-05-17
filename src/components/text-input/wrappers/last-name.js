import React, { Component, PropTypes } from 'react';
import TextBox from './textbox';

class LastName extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  handleChange(event) {
    const newValue = event.target.value.toUpperCase();
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div className = "last-name">
        <TextBox { ...this.props } value = { this.state.value } onChange = { this.handleChange } />
      </div>
    );
  }

}

LastName.propTypes = {
  onChange: PropTypes.func,
};

export default LastName;
