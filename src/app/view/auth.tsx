import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginUser} from "../../store/login/login.action";
import { login } from "../../api/login";

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


type ThisProps = { 
  store?: object
  loginUser: any
};
type ThisState = { 
  email: string
  password: string
  error: boolean
  [x: string]: any
};

class Auth extends Component<ThisProps, ThisState> {
  constructor(props:any) {
    super(props);
    this.state = {
      email: "danila@crocodila.com",
      password: "test",
      error: false,
    };
  }

  getToken = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const { loginUser} = this.props;
    e.preventDefault();
    login(this.state.email, this.state.password)
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.data.payload.token));
        loginUser(data.data.payload.user.id ,this.state.email, this.state.password, data.data.payload.token)
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };



  onValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      return;
    }

    const name = event.currentTarget.name;

    this.setState({
      [name]: event.currentTarget.value,
    });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ error: false });
    const name = event.currentTarget.name;
    this.setState({ [name]: event.currentTarget.value });
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

const mapStateToProps = (store: object) => ({
  store,
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (id: number, email:string, password:string, token:string) => dispatch(loginUser(id, email, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
