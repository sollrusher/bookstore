import React, { Component } from "react";
import getProfileData from "../../api/getProfile";
import { connect } from "react-redux";
import styled from "styled-components";
import Man from "./Rectangle3.png"
import sendAvatar from '../../api/sendAvatar'

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const H1 = styled.h1`

`
const Section = styled.section`
padding: 15px 25px;
width: 900px;
border: solid 1px rgba(141, 136, 136, 0.39);
border-radius: 60px;
`
const DivTop = styled.div`
width: 900px;
  display: flex;
  justify-content: space-between;

`
const DivAbout = styled.div`
  margin: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
`
const H3 = styled.div`

`
const Textarea = styled.textarea`
  margin-top: 15px;
  resize: none;
  height: 300px;
  width: 400px;
  outline: none;
  border: none;
`
const DivRight = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`
const Img = styled.img`
  border-radius: 290px; 
  box-shadow: 0 0 0 3px rgb(189, 175, 175), 0 0 19px #333; 
  width: 400px;
`
const H4 = styled.h4`
margin: 15px 0 0 0;
`
const Age = styled.h4`

`

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

/* type ThisProps= {
  store: User
} */


class Profile extends Component<{},MyState>{
  constructor(props: any){
    super(props)
    this.state={
      user: []
    }
  }

  onSelectImage = (files:any) => {

    const file = files[0];
    const data = new FormData();
    data.append('file', file)

    sendAvatar(data);
  }

render(){

  console.log(this.state)

const { email, fullname, age, about }:any = this.state.user;
  return (
    <Div>
    <H1>{fullname}</H1>
    <Section>
      <DivTop>
        <DivAbout>
          <H3>О себе:</H3>
  <Textarea placeholder="Input text here" value={about}></Textarea>
        </DivAbout>
        <DivRight>
          <Img src={Man} alt="ass"/>
          <H4>Email: {email}</H4>
  <Age>Age: {age}</Age>
  <input type="file" id="inputGroupFile01" onChange={(e) => this.onSelectImage(e.target.files)}/>
        </DivRight>
      </DivTop>

    </Section>
  </Div>
  );
}

async componentDidMount() {
  const {users}:any = this.props;
  console.log(users)
  if(!users) return
  const id = users.id;
  let data = await getProfileData(id);
  if(data.data.error) return;
  const user = data.data.payload.users;
  this.setState({
    ...this.state,
    ...{
      user,
    },
  });
}
}


const mapStateToProps = (store:any) => ({
  users: store.user.user[0],
});

export default connect(mapStateToProps)(Profile);
