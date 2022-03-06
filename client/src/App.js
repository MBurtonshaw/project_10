import './App.css';
import axios from 'axios';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Index from './components/Index';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UpdateCourse from './components/UpdateCourse';
import React, { useState } from 'react';

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route exact path='/' element={<Index/>}></Route>
        <Route path='/1' element={<CourseDetail/>}></Route>
        <Route path='/2' element={<CreateCourse/>}></Route>
        <Route path='/3' element={<Forbidden/>}></Route>
        <Route path='/4' element={<NotFound/>}></Route>
        <Route path='/5' element={<SignIn/>}></Route>
        <Route path='/6' element={<SignUp/>}></Route>
        <Route path='/7' element={<UpdateCourse/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
