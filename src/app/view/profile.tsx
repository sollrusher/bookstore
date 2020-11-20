import React, { Component } from "react";
import getProfileData from "../../api/Profile";
import { connect } from "react-redux";

interface ProfileType {
  email: string
  fullname: string
  age: number
}

type User ={
  email: string
  fullname: string
  age: number
}

type MyState = { 
  user: [User?]
};

// getProfileData(2);


class Profile extends Component<{},MyState>{
  constructor(props: any){
    super(props)
    this.state={
      user: []
    }
  }
render(){
  console.log(this.state)

const { email, fullname, age }:any = this.state.user;
  return (
    <ul>
      <li>Email is -{email}</li>
      <li>Fullname -{fullname}</li>
      <li>Age - {age}</li>
      <br />
    </ul>
  );
}

async componentDidMount() {
    
  let userData = await getProfileData(3)
  const user = userData.data.payload.users;
  console.log(userData)
  this.setState({
    ...this.state,
    ...{
      user,
    },
  });
}
}


const mapStateToProps = (store:any) => ({
  store,
});

export default connect(mapStateToProps)(Profile);
