import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

export default function Courses() {
    const [ results, setResults ] = useState('');
    async function Loader() {
      try{
          await axios.get('http://localhost:5000/api/courses').then(
          response => setResults(response.data)
        );
      } catch(error) {
        console.log(error.message);
      }
    };
    //Passing second argument as setResults stops infinite component mounting/rendering behavior
    //Re render will only occur if the courses returned from the axios call change
    useEffect(() => { Loader() }, [ setResults ]);
      return (
        <div id='Courses_div'>
                <div className="wrap main--grid">
                    <a className="course--module course--link" href='/course_detail'>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">Build a Basic Bookcase</h3>
                    </a>
                    <a className="course--module course--link" href="/course_detail/2">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">Learn How to Program</h3>
                    </a>
                    <a className="course--module course--link" href="/course_detail/4">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">Learn How to Test Programs</h3>
                    </a>
                    <a className="course--module course--add--module" href="/create_course">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </a>
                </div>
        </div>
      )
}