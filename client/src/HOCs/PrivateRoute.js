import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import withContext from '../contexts/Context';
import Forbidden from '../components/Forbidden';
import { Context } from '../contexts/Context';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse';
import axios from 'axios';

export default function PrivateRoute() {
      const navigate = useNavigate();
      const context = useContext(Context);
      console.log(context)
      let { id } = useParams();
      let { courseOwnerId } = useParams();

      if (context.authenticatedUser === null || context.authenticatedUser === undefined) {
            return <Forbidden context={context}/>
      }
      else if (window.location.href === `http://localhost:3000/courses/create`) {
            return <CreateCourse context={context} navigate={navigate}/>
      }
      else if (window.location.href === `http://localhost:3000/courses/${id}/update?owner=${courseOwnerId}`) {
            
                  return <UpdateCourse context={context} navigate={navigate} courseOwnerId={courseOwnerId}/>
            
      } else if (window.location.href === `http://localhost:3000/courses/${id}/update`) {
            return <UpdateCourse context={context} navigate={navigate} courseOwnerId={courseOwnerId}/>
      }
}