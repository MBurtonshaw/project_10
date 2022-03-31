import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Consumer } from '../contexts/Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props}/>
          ) : (
            useNavigate('/sign_in')
          )
          }
        />
      )}
    </Consumer>
  );
};