/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,

} from 'react-router-dom';
import Auth from './app/view/auth';
import Profile from './app/view/profile';
import Register from './app/view/register';
import PrivateRoute from './privateRoute';
import { RootState } from './store/reducer';

const mapStateToProps = (store: RootState) => ({
  user: store.user,
});

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>

function App(props:Props) {
  const { user } = props;
  console.log(user);

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
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <Switch>

        <Route exact path="/">
          {user.initialized ? <Redirect to="/profile" /> : <Auth />}
        </Route>
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

export default connector(App);
