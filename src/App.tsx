import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import AllUsers from "./app/view/allusers";
import Auth from "./app/view/auth";
import Profile from './app/view/profile'
import Register from './app/view/register'
import PrivateRoute from "./privateRoute";


type ThisProps= {
  user: any
}



class App extends Component <ThisProps> {

  render() {
    const { user } = this.props;
    let checkReg = false;
    if(user) checkReg = true;
    
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
          <PrivateRoute auth={checkReg} path="/allusers">
              <AllUsers />
          </PrivateRoute>
          <Route path='/register'>
          {checkReg ? <Redirect to="/profile" />: <Register/>}
          </Route>
          <PrivateRoute auth={checkReg} path="/profile">
              <Profile />
          </PrivateRoute>

        </Switch>
    </Router>
    );
  }
}

const mapStateToProps = (store: any) => ({
  user: store.user.user[0],
});

export default connect(mapStateToProps)(App);
