/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';
import Item from './item';
import { allusers } from '../../api/user';

type Users ={
  email: string
  fullname: string
  age: number
}

type MyState = {
  users: [Users?]
};

export default class AllUsers extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const userData = await allusers();
    const { users } = userData.data.payload;
    console.log(userData);
    this.setState({
      ...this.state,
      ...{
        users,
      },
    });
  }

  render() {
    let elements;
    const { users } = this.state;
    if (users.length !== 0) {
      elements = users.map((item: any) => (
        <Item email={item.email} fullname={item.fullname} age={item.age} />
      ));
    }

    return (
      <div>
        <ul>{elements}</ul>
      </div>
    );
  }
}
