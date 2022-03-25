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
import UpdateCourse from './components/UpdateCourse';
import React from 'react';
import withContext, { Provider } from './contexts/Context';

const SignUpWithContext = withContext(UserSignUp);
const SignInWithContext = withContext(UserSignIn);

function App() {
  /////////////////////////////////////////////////////////////////////////////////////////////
  //All the routing in the app is done here
  //Context is also provided to all the routes
  return (
    <BrowserRouter>
      <Provider >
        <Header />
          <Routes>
            <Route exact path='/' element={<Courses />}></Route>
            <Route path='/courses/:id' element={<CourseDetail />}></Route>
            <Route path='/courses/:id/update' element={<UpdateCourse/>}></Route>
            <Route path='/courses/:id/delete' element={<UpdateCourse/>}></Route>
            <Route path='/courses/create' element={<CreateCourse/>}></Route>
            <Route path='/sign_in' element={<SignInWithContext/>}></Route>
            <Route path='/sign_up' element={<SignUpWithContext/>}></Route>
            <Route path='/forbidden' element={<Forbidden/>}></Route>
            <Route path='/not_found' element={<NotFound/>}></Route>
            <Route element={<NotFound/>}></Route>
          </Routes>
        </Provider>
    </BrowserRouter>
  );

}

export default App;
