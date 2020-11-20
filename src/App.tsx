import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import AllUsers from "./app/view/allusers";
import Auth from "./app/view/auth";
import Profile from './app/view/profile'

type User = {
  user: Array<object>
}

type ThisProps= {
  store: User
}

class App extends Component<ThisProps> {

  render() {
    const { store } = this.props;
    const user = store.user;
    return (
      <Router>
          <ul>
          <li>
            <Link to="/">Auth</Link>
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
            {user.length !== 0 ? <Redirect to="/allusers" />: <Auth/>}
          </Route>
          <Route path='/allusers'>
            <AllUsers/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
        </Switch>
    </Router>
    );
  }
}

const mapStateToProps = (store:any) => ({
  store,
});

export default connect(mapStateToProps)(App);
