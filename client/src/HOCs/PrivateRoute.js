import React from 'react';
import withContext from '../contexts/Context';
import Forbidden from '../components/Forbidden';

function privateRoute( Component ) {
    let { context } = this.props;
    if (context.authenticatedUser !== null) {
        return <Component/>
    } else {
        return <Forbidden />
    }
  }

  export default withContext(privateRoute);