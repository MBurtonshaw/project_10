import './App.css';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/SignIn';
import UserSignUp from './components/SignUp';
import UserSignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';
import React from 'react';
import withContext, { Provider } from './contexts/Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
//const CreateCourseWithContext = withContext(CreateCourse);

function App() {
  /////////////////////////////////////////////////////////////////////////////////////////////
  //All the routing in the app is done here
  //Context is also provided to all the routes
  return (
    <BrowserRouter>
      <Provider >
        <Header />
          <Routes>
            <Route exact path='/' element={<CoursesWithContext />}></Route>
            <Route path='/courses/:id' element={<CourseDetailWithContext />}></Route>
            <Route path='/courses/:id/update' element={<UpdateCourse/>}></Route>
            <Route path='/courses/:id/delete' element={<UpdateCourse/>}></Route>
            <Route path='/courses/create' element={<CreateCourse/>}></Route>
            <Route path='/sign_in' element={<UserSignInWithContext/>}></Route>
            <Route path='/sign_up' element={<UserSignUpWithContext/>}></Route>
            <Route path='/sign_out' element={<UserSignOut/>}></Route>
            <Route path='/forbidden' element={<Forbidden/>}></Route>
            <Route path='/not_found' element={<NotFound/>}></Route>
            <Route element={<NotFound/>}></Route>
          </Routes>
        </Provider>
    </BrowserRouter>
  );

}

export default App;
