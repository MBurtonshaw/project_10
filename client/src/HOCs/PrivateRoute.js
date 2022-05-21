import React, { useContext } from 'react';
import { useNavigate, useParams, Outlet, Navigate } from 'react-router-dom';
import { Context } from '../contexts/Context';

export default function PrivateRoute() {
      const navigate = useNavigate();
      const context = useContext(Context);
  
      let { id } = useParams();

      if (context.authenticatedUser === null) {
            return <Navigate to="/signin" />;
          } else {
            return <Outlet />;
          }
}