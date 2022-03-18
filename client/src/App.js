import './App.css';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
  const [ descendants, setDescendants ] = useState('');
  let { id } = useParams();
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

  async function sideLoader() {
    try{
      return(
        await axios.get(`http://localhost:5000/api/courses/${id}`).then(
            response => setDescendants(response.data.course)
      ).then(
        console.log('App.js: create side-state, fetch data -- success')
      ));
    } catch(error) {
      console.log(error.message);
    }
  };

//Currently set up just to make a connection w the api and return data; url is correct, except id


  //Passing second argument as setResults stops infinite component mounting/rendering behavior
  //Re render will only occur if the courses returned from the axios call, change somehow
  useEffect(() => { mainLoader() }, [ setResults ]);
  useEffect(() => { sideLoader() }, [ setDescendants ]);

  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Results passed down to home page as props 'data' */}
        {/* pass down course thru id to updateCourse and deleteCourse */}
        <Route exact path='/' element={<Courses data={results}/>}></Route>
        <Route path='/course_detail/:id' element={<CourseDetail />}></Route>
        <Route path='/create_course' element={<CreateCourse/>}></Route>
        <Route path='/forbidden' element={<Forbidden/>}></Route>
        <Route path='/not_found' element={<NotFound/>}></Route>
        <Route path='/sign_in' element={<SignIn/>}></Route>
        <Route path='/sign_up' element={<SignUp/>}></Route>
        <Route path='/update_course' element={<UpdateCourse/>}></Route>
        <Route path='/update_course/:id' element={<UpdateCourse/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
