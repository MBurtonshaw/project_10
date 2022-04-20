import React from 'react';
import './App.css';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import Courses from './components/Courses';
import UserSignIn from './components/SignIn';
import UserSignUp from './components/SignUp';
import UserSignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Error from './components/Error';
import withContext, { Provider } from './contexts/Context';
import PrivateRoute from './HOCs/PrivateRoute';

const CoursesWithContext = withContext( Courses );
const CourseDetailWithContext = withContext( CourseDetail );
const UserSignUpWithContext = withContext( UserSignUp );
const UserSignInWithContext = withContext( UserSignIn );
const UserSignOutWithContext = withContext( UserSignOut );
const HeaderWithContext = withContext( Header );


function App() {
  /////////////////////////////////////////////////////////////////////////////////////////////
  //All the routing in the app is done here
  //Context is also provided to all the routes
  return (
    <BrowserRouter>
      <Provider >
        <HeaderWithContext />
          <Routes>
            <Route exact path='/' element={ <CoursesWithContext/> }></Route>
            <Route 
              path='/courses/create' 
              element={ <PrivateRoute>
                          <CreateCourse/>
                        </PrivateRoute> }>
              </Route>
            <Route path='/courses/:id' element={ <CourseDetailWithContext/> }></Route>
            <Route 
              path='/courses/:id/update' 
              element={ <PrivateRoute>
                          <UpdateCourse/>
                        </PrivateRoute> }>
              </Route>
            <Route path='/signin' element={ <UserSignInWithContext/> }></Route>
            <Route path='/signup' element={ <UserSignUpWithContext/> }></Route>
            <Route path='/signout' element={ <UserSignOutWithContext/> }></Route>
            <Route path='/forbidden' element={ <Forbidden/> }></Route>
            <Route path='/error' element={ <Error /> }></Route>
            <Route path='*' element={ <NotFound/> }></Route>
          </Routes>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
