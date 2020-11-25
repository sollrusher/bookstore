/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { register } from '../../api/user';
import { loginUser } from '../../store/user/user.action';
import { RootState } from '../../store/reducer';

const Form = styled.form`
  max-width: 350px;
  padding: 80px 30px 30px;
  margin: 50px auto 30px;
  background: white;
`;
const H = styled.h1`
  position: relative;
  z-index: 5;
  margin: 0 0 60px;
  text-align: center;
  color: #4a90e2;
  font-size: 30px;
  font-weight: normal;
`;
const Div = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const Input = styled.input`
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
`;
const Submit = styled.input.attrs({
  type: 'submit',
  value: 'Submit',
})`
  width: 100%;
  padding: 0;
  line-height: 42px;
  background: #4a90e2;
  border-width: 0;
  color: white;
  font-size: 20px;
`;
const P = styled.p`
  margin: 0;
  padding-top: 10px;
`;

type State ={
  email: string
  password: string
  age: number
  fullname: string
  error: boolean
  [x: string]: any
}
type Props = {
  store?: RootState
  loginUser: any
};

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      age: 0,
      fullname: '',
      error: false,
    };
  }

  getRegister = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const {
      email, password, fullname, age,
    } = this.state;
    register(email, password, fullname, age)
      .then((data) => {
        console.log(data.data.payload.user.id);
        const { id } = data.data.payload.user;
        loginUser(id, email, fullname, age, '');
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ error: false });
    const { name } = event.currentTarget;
    this.setState({ [name]: event.currentTarget.value });
  };

  render() {
    const { error } = this.state;
    return (
      <Form>
        <H>Регистрация</H>
        <Div>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={this.handleChange}

          />
        </Div>
        <Div>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}

          />
        </Div>
        <Div>
          <Input
            type="text"
            name="fullname"
            placeholder="fullname"
            id="fullname"
            onChange={this.handleChange}

          />
        </Div>
        <Div>
          <Input
            type="age"
            name="age"
            id="age"
            placeholder="age"
            onChange={this.handleChange}

          />
        </Div>
        <P>
          <Submit onClick={this.getRegister} />
        </P>
        <P>{error ? 'wrong field' : ''}</P>
      </Form>
    );
  }
}

const mapStateToProps = (user: RootState) => ({
  user,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
