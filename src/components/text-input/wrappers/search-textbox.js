import React from 'react';
import TextInput from '../text-input';

const SearchTextBox = (props) => (
  <div className = "search-textbox">
    <TextInput { ...props } search />
  </div>
);

export default SearchTextBox;
