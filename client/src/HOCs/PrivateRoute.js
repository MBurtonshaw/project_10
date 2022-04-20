import React, { useContext } from 'react';
import withContext from '../contexts/Context';
import Forbidden from '../components/Forbidden';
import { Context } from '../contexts/Context';

export default function PrivateRoute( ) {
      const context = useContext(Context);
      console.log(context)
      return 'hi'
    }

