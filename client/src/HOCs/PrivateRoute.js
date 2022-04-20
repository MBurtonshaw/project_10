import React from 'react';
import withContext from '../contexts/Context';
import Forbidden from '../components/Forbidden';

function privateRoute( Component ) {
   //conditional from context
   
  
        return (props => <Component { ...props } />)
    
    
  }

  export default privateRoute;