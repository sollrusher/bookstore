import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginUser} from "../../store/login/login.action";

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
  type: "submit",
  value: "Submit",
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

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "danila@crocodila.com",
      password: "test",
      error: false,
    };
    this.authentication = this.authentication.bind(this);
  }

  getToken = (e) => {
    const {store, loginUser} = this.props;
    e.preventDefault();
    this.authentication()
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.payload.token));
        loginUser(this.state.email, this.state.password, data.payload.token)
        console.log("token successfuly get");
        console.log(store)
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };

  async authentication() {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/auth",
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    });
    return response.data;
  }

  onValueChange = (event) => {
    if (!event.target.value) {
      return;
    }
    if (event.key !== "Enter") {
      return;
    }
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
    this.getToken(event);
  };

  handleChange = (event) => {
    this.setState({ error: false });
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <Form action="">
        <H>Войти на сайт</H>
        <Div>
          <Input
            name="email"
            type="text"
            id="email"
            placeholder="Email"
            onChange={this.handleChange}
            onKeyPress={this.onValueChange}
          />
        </Div>
        <Div>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
            onKeyPress={this.onValueChange}
          />
        </Div>
        <P>
          <Submit onClick={this.getToken}/>
        </P>
        <P>{this.state.error? 'wrong field': ''}</P>
      </Form>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password, token) => dispatch(loginUser(email, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
