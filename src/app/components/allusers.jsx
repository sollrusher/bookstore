import React, { Component } from 'react';
import axios from 'axios';
import Item from './item'

export default class AllUsers extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

render(){
  
  const elements = this.state.users.map((item) => (
    <Item
      email={item.email}
      fullname={item.fullname}
      age={item.age}
    />
  ));

    return (
        <div>
            <table>
                <tr><th>Email</th><th>Name</th><th>Age</th><th></th></tr>
                <tr>
                    <td>{elements}</td>
                </tr>
            </table>
        </div>
    )
  }

  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    let userData = await axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/users',
      headers: {
        Authorization: `Bearer ${token}` 
       }
    });
  const users = userData.data.payload.users

this.setState({
      ...this.state, ...{
        users
      }
    });
  }
}