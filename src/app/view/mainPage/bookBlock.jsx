/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import Book from './book';

class BookBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  render() {
    return (
      <>
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </>
    );
  }
}
export default BookBlock;
