import React, { Component, PropTypes } from 'react';
import './css/text-input.less';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.parseWidth = this.parseWidth.bind(this);
  }


  focus() {
    this.input.focus();
  }

  parseWidth(width) {
    // width can be: 'auto', 300, '300', 300px'...
    let parsedWidth = `${width}`.replace('px', '');
    if (!isNaN(parsedWidth)) {
      parsedWidth = parseInt(parsedWidth, 10);
    }
    return parsedWidth;
  }

  render() {
    const { label, labelPosition, labelWidth, placeholder, password, disabled, value,
            errorMessage, valid, required, iconClass, search, width, searchIcon, name,
            onChange, onBlur, onSearch,
          } = this.props;

    // for search text input we ignore validation
    const hasError = !search && (valid === false || (errorMessage && errorMessage.length > 0));
    const isValid = !search && valid && !hasError && !disabled;

    let validationStatusClass = '';
    if (hasError) {
      validationStatusClass = 'has-error';
    } else if (isValid) {
      validationStatusClass = 'is-valid';
    } else if (search) {
      validationStatusClass = 'search';
    }

    // INPUT STYLES
    const inputStyle = {};
    if (width) {
      let inputWidth = this.parseWidth(width);
      if (!isNaN(inputWidth)) {
        inputWidth = iconClass && iconClass.length ? inputWidth - 40 : inputWidth; // if iconized input we need to compensate the 40px taken by icon button
      }
      inputStyle.width = `${inputWidth === 'auto' ? '100%' : inputWidth}`;
    }

    // FORM FIELD STYLES
    const formFieldStyle = {};
    const labelContainerStyle = {};
    if (labelPosition && labelPosition === 'left') {
      formFieldStyle.display = 'flex';
      formFieldStyle.alignItems = 'center';

      labelContainerStyle.minWidth = labelWidth ? this.parseWidth(labelWidth) : '150px';
    }

    return (
      <div className="form__field" style = { formFieldStyle }>
        <div style = { labelContainerStyle }>
          { label && <label className="form__field__label" htmlFor = { name }>{ `${label}${required ? ' *' : ''}` }</label> }
        </div>
        <div>
          <div className= { `input-group ${validationStatusClass}` }>

            {/* ICONIFIED INPUT */}
            { iconClass && iconClass.length > 0 &&
              <div className="input-group__addon" onClick = { this.focus }>
                <span className={`icon ${iconClass}`}></span>
              </div>
            }

            {/* INPUT CONTROL */}
            <input
              ref = {(input) => { this.input = input; }}
              id = { name }
              name = { name }
              className = { `text__input ${validationStatusClass}` }
              type= { password ? 'password' : 'text' }
              placeholder = { placeholder }
              disabled = { disabled }
              value = { value }
              style = { inputStyle }
              onChange = { onChange }
              onBlur = { onBlur }
            />

            {/* SEARCH */}
            { search &&
              <button type="submit" onClick = { onSearch }>
                <span className={`icon ${searchIcon && searchIcon.length > 0 ? searchIcon : 'icon-search'}` }></span>
              </button>
            }

            {/* ERROR */}
            { hasError &&
              <span className = "icon icon-info"></span>
            }

            {/* SUCCESSFUL VALIDATION */}
            { isValid &&
              <span className = "icon icon-status-online"></span>
            }
          </div>

          {/* ERROR MESSAGE */}
          { hasError &&
            <div className="form__field__hint form__field__hint--error">
              { errorMessage }
            </div>
          }
        </div>
      </div>
    );
  }
}


TextInput.propTypes = {
  // props
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  iconClass: PropTypes.string,
  name: PropTypes.string,
  password: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  search: PropTypes.bool,
  searchIcon: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  // methods
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default TextInput;
