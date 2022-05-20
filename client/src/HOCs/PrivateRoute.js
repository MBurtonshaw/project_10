import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../contexts/Context';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse';

export default function PrivateRoute() {
      const navigate = useNavigate();
      const context = useContext(Context);
  
      let { id } = useParams();

      useEffect(()=>{
            if (context.authenticatedUser === null) {
                  navigate('/signin');
            }
      });

      if (window.location.href === `http://localhost:3000/courses/create`) {
            return <CreateCourse context={context} navigate={navigate}/>
      }
      if (window.location.href === `http://localhost:3000/courses/${id}/update`) {
            return <UpdateCourse context={context} navigate={navigate}/>
      }
}