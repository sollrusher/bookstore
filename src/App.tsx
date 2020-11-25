/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,

} from 'react-router-dom';
import AllUsers from './app/view/allusers';
import Auth from './app/view/auth';
import Profile from './app/view/profile';
import Register from './app/view/register';
import PrivateRoute from './privateRoute';
// import Loader from './app/components/loader';

// type ThisProps= {
//   user: any
// }

function App(props:any) {
  const { user } = props;
  // eslint-disable-next-line react/destructuring-assignment
  console.log(props.user);
  // let checkReg = false;
  // if (user.initialized) checkReg = true;

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
          {user.initialized ? <Redirect to="/profile" /> : <Auth />}
        </Route>
        <PrivateRoute auth={user.initialized} path="/allusers">
          <AllUsers />
        </PrivateRoute>
        <Route path="/register">
          {user.initialized ? <Redirect to="/profile" /> : <Register />}
        </Route>
        <PrivateRoute auth={user.initialized} path="/profile">
          <Profile />
        </PrivateRoute>

      </Switch>
    </Router>
  );
}

const mapStateToProps = (store: any) => ({
  user: store.user,
});

export default connect(mapStateToProps)(App);
