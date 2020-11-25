/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Man from './Rectangle3.png';
import { RootState } from '../../store/reducer';
import { sendAvatar, sendAbout, getProfileData } from '../../api/user';

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H1 = styled.h1``;
const Section = styled.section`
  padding: 15px 25px;
  width: 900px;
  border: solid 1px rgba(141, 136, 136, 0.39);
  border-radius: 60px;
`;
const DivTop = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
`;
const DivAbout = styled.div`
  margin: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
`;
const H3 = styled.div``;
const Textarea = styled.textarea`
  margin-top: 15px;
  resize: none;
  height: 300px;
  width: 400px;
  outline: none;
  border: none;
`;
const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  border-radius: 290px;
  box-shadow: 0 0 0 3px rgb(189, 175, 175), 0 0 19px #333;
  width: 400px;
`;
const H4 = styled.h4`
  margin: 15px 0 0 0;
`;
const Age = styled.h4``;

type User = {
  email: string;
  fullname: string;
  age: number;
  about: string;
};

type MyState = {
  user: any;
};
type Props = {
  store?: RootState;
  users?: any;
};

class Profile extends Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        id: 0, email: '', fullname: '', age: '',
      },
    };
  }

  async componentDidMount() {
    const { users } = this.props;
    console.log(users);
    if (!users) return;
    const user = await getProfileData();
    this.setState({
      ...this.state,
      ...{
        user,
      },
    });
  }

  onSelectImage = (files: any) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    sendAvatar(formData).then((data) => {
      console.log(data);
    });
  };

  onValueChange = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!event.currentTarget.value) {
      return;
    }
    if (event.key !== 'Enter') return;
    const { user } = this.state;
    const { id, about } = user;
    sendAbout(id, about);
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length >= 255) return;
    const { user } = this.state;
    this.setState({ ...this.state, user: { ...user, about: event.target.value } });
  }

  render() {
    // console.log(this.state.user);
    // console.log(this.props);
    const { user } = this.state;
    const {
      email, fullname, age, about,
    }: User = user;
    return (
      <Div>
        <H1>{fullname}</H1>
        <Section>
          <DivTop>
            <DivAbout>
              <H3>О себе:</H3>
              <Textarea
                placeholder="Input text here"
                value={about}
                onChange={this.handleChange}
                onKeyPress={this.onValueChange}
              />
            </DivAbout>
            <DivRight>
              <Img src={Man} alt="ass" />
              <H4>
                Email:
                {email}
              </H4>
              <Age>
                Age:
                {age}
              </Age>
              <input
                type="file"
                id="inputGroupFile01"
                onChange={(e) => this.onSelectImage(e.target.files)}
              />
            </DivRight>
          </DivTop>
        </Section>
      </Div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  users: store.user.user,
  store,
});

export default connect<any>(mapStateToProps)(Profile);
