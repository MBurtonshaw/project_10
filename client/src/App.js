import React from 'react';
import './App.css';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import withContext, { Provider } from './contexts/Context';
import PrivateRoute from './HOCs/PrivateRoute';

const CoursesWithContext = withContext( Courses );
const CourseDetailWithContext = withContext( CourseDetail );
const CreateCourseWithContext = withContext( CreateCourse );
const UpdateCourseWithContext = withContext( UpdateCourse );
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
            {/* Syntax for a route to be handled through PrivateRoute component */}
            <Route 
              path='/courses/create' 
              element={ <PrivateRoute /> }>
                          <Route index element={<CreateCourseWithContext />}/>
              </Route>
            <Route path='/courses/:id' element={ <CourseDetailWithContext/> }></Route>
            <Route 
              path='/courses/:id/update' 
              element={ <PrivateRoute /> }>
                          <Route index element={<UpdateCourseWithContext />}/>
              </Route>
            <Route path='/signin' element={ <UserSignInWithContext/> }></Route>
            <Route path='/signup' element={ <UserSignUpWithContext/> }></Route>
            <Route path='/signout' element={ <UserSignOutWithContext/> }></Route>
            <Route path='/forbidden' element={ <Forbidden/> }></Route>
            <Route path='/error' element={ <UnhandledError /> }></Route>
            <Route path='/notFound' element={ <NotFound/> }></Route>
            <Route path='*' element={ <NotFound/> }></Route>
          </Routes>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
