import './App.css';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UpdateCourse from './components/UpdateCourse';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  //Setting a 'results' state
  const [ results, setResults ] = useState('');

  //Function to fetch all courses data for home page
  async function mainLoader() {
    try{
        await axios.get('http://localhost:5000/api/courses').then(
            response => setResults((response.data).map(data => data))
      );
    } catch(error) {
      console.log(error.message);
    }
  };

  //Passing second argument as setResults stops infinite component mounting/rendering behavior
  //Re render will only occur if the courses returned from the axios call, change somehow
  useEffect(() => { mainLoader() }, [ setResults ]);

  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Results passed down to home page as props 'data' */}
        <Route exact path='/' element={<Courses data={results}/>}></Route>
        <Route path='/course_detail/:id' element={<CourseDetail />}></Route>
        <Route path='/create_course' element={<CreateCourse/>}></Route>
        <Route path='/forbidden' element={<Forbidden/>}></Route>
        <Route path='/not_found' element={<NotFound/>}></Route>
        <Route path='/sign_in' element={<SignIn/>}></Route>
        <Route path='/sign_up' element={<SignUp/>}></Route>
        <Route path='/update_course' element={<UpdateCourse/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
