/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React from 'react';

interface ItemType {
  email: string
  fullname: string
  age: number
}

function Item({ email, fullname, age }:ItemType) {
  return (
    <ul>
      <li>
        Email is -
        {email}
      </li>
      <li>
        Fullname -
        {fullname}
      </li>
      <li>
        Age -
        {age}
      </li>
      <br />
    </ul>
  );
}

export default Item;
