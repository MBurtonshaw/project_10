import React from 'react';
import withContext from '../contexts/Context';
import Forbidden from '../components/Forbidden';

function privateRoute( Component ) {
   //conditional from context
      if (1===1) {
      //if (this.props.context.authenticatedUser !== null) {
            return (props => <Component { ...props } />)
      }
    //} else {
          //return <Forbidden/>
          //}
  }

  export default privateRoute;