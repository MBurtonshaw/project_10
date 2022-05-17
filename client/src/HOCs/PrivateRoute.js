import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../contexts/Context';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse';
import SignIn from '../components/SignIn';

export default function PrivateRoute() {
      const navigate = useNavigate();
      const context = useContext(Context);
  
      let { id } = useParams();
      console.log(context.authenticatedUser)
      let credentials = context.authenticatedUser;

      useEffect(()=>{
            if (credentials === null) {
                  navigate('/Signin');
            }
      });

      if (window.location.href === `http://localhost:3000/courses/create`) {
            return <CreateCourse context={context} navigate={navigate}/>
      }
      if (window.location.href === `http://localhost:3000/courses/${id}/update`) {
            return <UpdateCourse context={context} navigate={navigate}/>
      }
}