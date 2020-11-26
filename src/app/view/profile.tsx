/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import Man from './Rectangle3.png';
import { RootState } from '../../store/reducer';
import { sendAvatar, sendAbout, getProfileData } from '../../api/user';
import { User } from '../../models/UserType';

const ProfileCard = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FullnameTitle = styled.h1``;
const MainContainer = styled.section`
  padding: 15px 25px;
  width: 900px;
  border: solid 1px rgba(141, 136, 136, 0.39);
  border-radius: 60px;
`;
const MainWrapper = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
`;
const About = styled.div`
  margin: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
`;
const AboutTitle = styled.div``;
const AboutInput = styled.textarea`
  margin-top: 15px;
  resize: none;
  height: 300px;
  width: 400px;
  outline: none;
  border: none;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.img`
  border-radius: 290px;
  box-shadow: 0 0 0 3px rgb(189, 175, 175), 0 0 19px #333;
  width: 400px;
`;
const Email = styled.h4`
  margin: 15px 0 0 0;
`;
const Age = styled.h4``;

type State = {
  user: User;
};

const mapStateToProps = (store: RootState) => ({
  users: store.user.user,
});

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        id: 0,
        email: '',
        fullname: '',
        age: 0,
        about: '',
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

  onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file[0]);
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
    const { user } = this.state;
    const {
      email, fullname, age, about,
    }: User = user;
    return (
      <ProfileCard>
        <FullnameTitle>{fullname}</FullnameTitle>
        <MainContainer>
          <MainWrapper>
            <About>
              <AboutTitle>О себе:</AboutTitle>
              <AboutInput
                placeholder="Input text here"
                value={about}
                onChange={this.handleChange}
                onKeyPress={this.onValueChange}
              />
            </About>
            <Right>
              <Avatar src={Man} alt="ass" />
              <Email>
                Email:
                {email}
              </Email>
              <Age>
                Age:
                {age}
              </Age>
              <input
                type="file"
                id="inputGroupFile01"
                onChange={(e) => this.onSelectImage(e)}
              />
            </Right>
          </MainWrapper>
        </MainContainer>
      </ProfileCard>
    );
  }
}

export default connector(Profile);
