/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (auth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ))}
    />
  );
}
