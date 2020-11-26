/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { register } from '../../api/user';
import { loginUser } from '../../store/user/user.action';
import { RootState } from '../../store/reducer';

const RegisterForm = styled.form`
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
  .register__input {
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

type State ={
  email: string
  password: string
  age: number
  fullname: string
  error: boolean
  message: string
  emailIsValid: boolean
  passwordIsValid: boolean
  ageIsValid: boolean
  fullnameIsValid: boolean
  [x: string]: string | number | boolean
}
const mapStateToProps = (user: RootState) => ({
  user,
});

const mapDispatchToProps = {
  loginUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      age: 1,
      fullname: '',
      error: false,
      message: '',
      emailIsValid: true,
      passwordIsValid: true,
      ageIsValid: true,
      fullnameIsValid: true,
    };
  }

  getRegister = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const { loginUser } = this.props;
    e.preventDefault();
    const {
      email, password, fullname, age,
    } = this.state;
    if ((!email.includes('@') || !email.includes('.com')) && (!email.includes('@') || !email.includes('.ru'))) {
      this.setState({ emailIsValid: false, error: true, message: 'Неправильный ввод Email' });
      return;
    }
    if (password.length === 9) {
      return;
    }
    this.setState({ passwordIsValid: true });
    register(email, password, fullname, age)
      .then((data) => {
        const { id, about } = data.data.payload.user;
        console.log(about);
        loginUser(id, email, fullname, age, about);
      })
      .catch((errorData) => {
        this.setState({
          error: true,
          message: errorData,
        });
      });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ error: false, message: '' });
    const { name } = event.currentTarget;
    if (event.currentTarget.value !== '') {
      if (name === 'password' && event.currentTarget.value.length >= 9) {
        this.setState({ error: true, message: 'Не больше 8 символов', passwordIsValid: false });
        return;
      }
      if (name === 'email' && event.currentTarget.value.length >= 30) {
        this.setState({ error: true, message: 'Не больше 30 символов', emailIsValid: false });
        return;
      }
      if (name === 'password' && !/[^\s]$/.test(event.currentTarget.value)) {
        this.setState({ error: true, message: 'Нельзя использовать пробелы в пароле', passwordIsValid: false });
        return;
      }
      if (name === 'age') {
        const age = event.currentTarget.value;
        if (!/^\d{1,}$/.test(age)) {
          if (age === '' || +age < 0) return;
          this.setState({ error: true, message: 'Можно вводить только цифры', ageIsValid: false });
          return;
        }
      }
      if (name === 'fullname') {
        const fullname = event.currentTarget.value;
        if (!/^[a-zA-Z а-яА-Я]*$/.test(fullname)) {
          this.setState({ error: true, message: 'Можно вводить только буквы', fullnameIsValid: false });
          return;
        }
      }
    }
    this.setState({
      [name]: event.currentTarget.value,
      emailIsValid: true,
      passwordIsValid: true,
      ageIsValid: true,
      fullnameIsValid: true,
    });
  };

  render() {
    const {
      error, message, passwordIsValid, emailIsValid,
      fullnameIsValid, ageIsValid, email, password, fullname, age,
    } = this.state;
    return (
      <RegisterForm>
        <Title>Регистрация</Title>
        <WrapperInput>
          <input
            className={emailIsValid ? 'register__input' : 'register__input invalid'}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={this.handleChange}
            value={email}
          />
        </WrapperInput>
        <WrapperInput>
          <input
            className={passwordIsValid ? 'register__input' : 'register__input invalid'}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
            value={password}
          />
        </WrapperInput>
        <WrapperInput>
          <input
            className={fullnameIsValid ? 'register__input' : 'register__input invalid'}
            type="text"
            name="fullname"
            placeholder="fullname"
            id="fullname"
            onChange={this.handleChange}
            value={fullname}
          />
        </WrapperInput>
        <WrapperInput>
          <input
            className={ageIsValid ? 'register__input' : 'register__input invalid'}
            type="number"
            name="age"
            id="age"
            placeholder="age"
            onChange={this.handleChange}
            value={age}
          />
        </WrapperInput>
        <SubmitButton onClick={this.getRegister} />
        <p>{error ? `${message}` : ''}</p>

      </RegisterForm>
    );
  }
}

export default connector(Register);
