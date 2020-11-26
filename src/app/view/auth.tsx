/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { loginUser } from '../../store/user/user.action';
import { login } from '../../api/user';
import { RootState } from '../../store/reducer';

const AuthForm = styled.form`
  max-width: 350px;
  padding: 80px 30px 30px;
  margin: 50px auto 30px;
  background: white;
`;
const Title = styled.h1`
  position: relative;
  z-index: 5;
  margin: 0 0 60px;
  text-align: center;
  color: #4a90e2;
  font-size: 30px;
  font-weight: normal;
`;
const WrapperInput = styled.div`
  position: relative;
  margin-bottom: 40px;
  .auth__input {
    display: block;
    width: 100%;
    padding: 0 10px;
    line-height: 40px;
    font-family: "Roboto", sans-serif;
    background: none;
    border-width: 0;
    border-bottom: 2px solid #4a90e2;
    transition: all 0.2s ease;
    &:focus {
      outline: 0;
      border-color: #f77a52;
    }
  }
  .invalid {
    background-color: rgba(255, 0, 0, 0.61);
  }
`;
const SubmitButton = styled.input.attrs({
  type: 'submit',
  value: 'Submit',
})`
  width: 100%;
  padding: 10px 0 0 0;
  line-height: 42px;
  background: #4a90e2;
  border-width: 0;
  color: white;
  font-size: 20px;
  margin: 0;
`;

type State = {
  email: string
  password: string
  error: boolean
  message: string
  emailIsValid: boolean
  passwordIsValid: boolean
  [x: string]: string | boolean
};

const mapStateToProps = (store: RootState) => ({
  store,
});

const mapDispatchToProps = {
  loginUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>

class Auth extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      email: 'danila@crocodila.com',
      password: 'test',
      error: false,
      message: '',
      emailIsValid: true,
      passwordIsValid: true,
    };
  }

  getToken = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const { loginUser } = this.props;
    const { email, password } = this.state;
    if ((!email.includes('@') || !email.includes('.com')) && (!email.includes('@') || !email.includes('.ru'))) {
      this.setState({ emailIsValid: false });
      return;
    }
    if (password.length === 9) {
      return;
    }
    this.setState({ passwordIsValid: true });
    login(email, password)
      .then((data) => {
        const {
          id, fullname, age, about,
        } = data.data.payload.user;
        loginUser(id, email, fullname, age, about);
      })
      .catch((errorData) => {
        console.log(errorData.response);
        const { error, message } = errorData.response.data;
        this.setState({
          error,
          message,
        });
      });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ error: false, message: '' });
    const { name } = event.currentTarget;
    if (name === 'password' && event.currentTarget.value.length >= 9) {
      this.setState({ error: true, message: 'Не больше 8 символов', passwordIsValid: false });
      return;
    }
    if (name === 'email' && event.currentTarget.value.length >= 30) {
      this.setState({ error: true, message: 'Не больше 30 символов', emailIsValid: false });
      return;
    }

    this.setState({ [name]: event.currentTarget.value, emailIsValid: true, passwordIsValid: true });
  };

  render() {
    const {
      error, message, passwordIsValid, emailIsValid, email, password,
    } = this.state;
    return (
      <AuthForm>
        <Title>Войти на сайт</Title>
        <WrapperInput>
          <input
            className={emailIsValid ? 'auth__input' : 'auth__input invalid'}
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
        </WrapperInput>
        <WrapperInput>
          <input
            className={passwordIsValid ? 'auth__input' : 'auth__input invalid'}
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
        </WrapperInput>

        <SubmitButton onClick={this.getToken} />

        <p>{ error ? `${message}` : ''}</p>
      </AuthForm>
    );
  }
}

export default connector(Auth);
