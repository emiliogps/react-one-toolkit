import React, { Component, PropTypes } from 'react';
import TextBox from './textbox';
import _ from 'lodash';

class Email extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    const regex = this.props.regex || /(.+)@(.+){2,}\.(.+){2,}/; // very basic email regex as default, just to make sure it looks like an email
    const regexValidationError = this.props.regexValidationError || 'Please enter a valid email address';

    return (
      <div className = "email">
        <TextBox { ...this.props } value = { this.state.value } onChange = { this.handleChange } regex = { regex } regexValidationError = { regexValidationError } />
      </div>
    );
  }

}

Email.propTypes = {
  regex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  regexValidationError: PropTypes.string,
  onChange: PropTypes.func,
};


export default Email;
