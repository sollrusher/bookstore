import React, { Component } from "react";
import Item from "./item";
import allusers from "../../api/allusers";


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


  render() {
    let elements;
    if (this.state.users.length !== 0) {
      elements = this.state.users.map((item: any) => (
        <Item email={item.email} fullname={item.fullname} age={item.age} />
      ));
    }

    return (
      <div>
        <ul>{elements}</ul>
      </div>
    );
  }

  async componentDidMount() {
    
    let userData = await allusers()
    const users = userData.data.payload.users;
    console.log(userData)
    this.setState({
      ...this.state,
      ...{
        users,
      },
    });
  }
}
