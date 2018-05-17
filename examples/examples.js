import React from 'react';
import { render } from 'react-dom';

 // Enable LiveReload
 document.write(
  '<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>'
);

import TextInput from '../src/components/text-input';
import TextBox from '../src/components/text-input/wrappers/textbox';
import FirstName from '../src/components/text-input/wrappers/first-name';
import LastName from '../src/components/text-input/wrappers/last-name';
import Email from '../src/components/text-input/wrappers/email';


render(
  <div>
    <TextBox label = "Normal blank" placeholder = "Enter something" iconClass = "icon-info" />
    <TextBox label = "Test textbox" placeholder = "Enter something" disabled value = "hola" />    
    <TextBox label = "Test textbox" placeholder = "Enter something" search onSearch = { () => {alert('hola')} }/>    
    <FirstName name = "firstName" label = "First Name" placeholder = "Please enter your first name" required onChange = { value => console.log(value) } />
    <LastName name = "lastName" label = "Last Name" placeholder = "Please enter your last name" required requiredValidationError = "This field is mandatory"  onChange = { value => console.log(value) } />
    <Email name = "email" label = "Email" placeholder = "Please enter your email address" required requiredValidationError = "This field is mandatory" onChange = { value => console.log(value) } />
  </div>
  ,
  document.getElementById('app')
);
