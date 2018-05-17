import React, { Component, PropTypes } from 'react';
import TextInput from '../';
import _ from 'lodash';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.checkIsRequired = this.checkIsRequired.bind(this);
    this.checkRegex = this.checkRegex.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.notifyValidationStatus = this.notifyValidationStatus.bind(this);
    this.state = {
      triggerValidation: false,
      value: '',
      errorMessage: '',
    };
  }


  checkRegex(value) {
    if (this.props.regex) {
      let pattern;
      if (typeof this.props.regex === 'string' || this.props.regex instanceof String) {
        pattern = new RegExp(this.props.regex);
      } else {
        pattern = this.props.regex;
      }
      return pattern.test(value);
    }
    return true;
  }

  checkIsRequired(value) {
    return !this.props.required || !_.isEmpty(value);
  }

  checkValidity(value) {
    // required
    let message = '';
    if (!this.checkIsRequired(value)) {
      message = this.props.requiredValidationError || 'Required!';
    } else if (!this.checkRegex(value)) {
      message = this.props.regexValidationError || 'Does not conform to regex!';
    }
    return message;
  }

  handleChange(event) {
    let errorMessage = '';
    const triggerValidation = this.props.triggerValidation || this.state.triggerValidation;
    if (triggerValidation) {
      errorMessage = this.checkValidity(event.target.value);
    }
    this.setState({ value: event.target.value, errorMessage });
    // this.notifyValidationStatus(errorMessage);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handleBlur() {
    if (!this.props.onBlur) {
      if (this.props.required || this.props.regex) { // Something to validate?
        const errorMessage = this.checkValidity(this.state.value);
        this.setState({ triggerValidation: true, errorMessage });
        this.notifyValidationStatus(errorMessage);
      }
    } else {
      this.props.onBlur();
    }
  }

  notifyValidationStatus(message) {
    if (this.props.notifyValidationStatus) {
      const field = this.props.name || this.props.label;
      this.props.notifyValidationStatus(field, message);
    }
  }

  render() {
    const value = this.props.value || this.state.value;
    // validation coming from parent has precedence
    const errorMessage = _.isEmpty(this.props.errorMessage) ? this.state.errorMessage : this.props.errorMessage;
    const triggerValidation = this.props.triggerValidation || this.state.triggerValidation;
    let valid;
    if (triggerValidation && _.isEmpty(errorMessage)) {
      valid = true;
    }

    return (
      <div className = "textbox">
        <TextInput { ...this.props } value = { value } onChange = { this.handleChange } onBlur = { this.handleBlur } errorMessage = { errorMessage } valid = { valid } />
      </div>
    );
  }

}


TextBox.propTypes = {
  // props
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  regex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  regexValidationError: PropTypes.string,
  required: PropTypes.bool,
  requiredValidationError: PropTypes.string,
  triggerValidation: PropTypes.bool,
  value: PropTypes.string,

  // methods
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  notifyValidationStatus: PropTypes.func,
};

export default TextBox;
