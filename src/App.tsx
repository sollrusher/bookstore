import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import AllUsers from "./app/view/allusers";
import Auth from "./app/view/auth";
import Profile from './app/view/profile'
import Register from './app/view/register'


type ThisProps= {
  user: any
}

class App extends Component<ThisProps> {

  render() {
    const { user } = this.props;
    let checkReg = false;
    if(user) checkReg = true;
    else checkReg = false;
    
    return (
      <Router>
          <ul>
          <li>
            <Link to="/">Auth</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/allusers">AllUsers</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <Switch>
          
          <Route exact path="/">
            {checkReg ? <Redirect to="/profile" />: <Auth/>}
          </Route>
          <Route path='/allusers'>
          {checkReg ? <AllUsers/> : <Redirect to="/"/>}
          </Route>
          <Route path="/profile">
          {checkReg ? <Profile/> : <Redirect to="/"/>}
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>

        </Switch>
    </Router>
    );
  }
}

const mapStateToProps = (store:any) => ({
  user: store.user.user[0],
});

export default connect(mapStateToProps)(App);
