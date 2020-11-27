/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import styled from 'styled-components';
import cover from './bookcover.jpg';

const Cover = styled.img`
  box-shadow: 0 0 0 3px rgb(189, 175, 175), 0 0 19px #333;
  width: 250px;
`;

const Item = styled.div`
  display: flex;
`;

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  render() {
    return (
      <Item>
        <Cover src={cover} alt="cover" />
        <h5>Author</h5>
        <h3>Title</h3>
        <h2>330R</h2>
        <button type="button">Добавить</button>
      </Item>
    );
  }
}
export default Book;
