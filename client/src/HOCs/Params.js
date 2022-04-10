import React from 'react';
import { useParams } from 'react-router-dom';


export default function withParameters( Component ) {
    return props => <Component { ...props } params={ useParams() } />;
  }