import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Courses(props) {

  //Setting state w a hook
  const [ courseList, setCourseList] = useState([ '' ]);
  const authenticatedUser = props.context.authenticatedUser;

  function decider() {
    if (authenticatedUser !== null) {
      return '/courses/create'
    } else {
      return '/signin'
    }
  }
  
  async function loader() {
    try{
      await axios.get( 'http://localhost:5000/api/courses' ).then(
        response => setCourseList(( response.data ).map( data => data ))
      ).then(
          console.log( 'Courses.js: courses data saved to state -- success' )
        )} catch( error ) {
        console.log( error.message );
      }
    };  


    useEffect( () => { loader() }, [ setCourseList ]);

    try {
      //Conditional statement to check that App is passing down props
      if ( courseList ) {
        
    //////////////////////////////////////////////////////////////////////////////////////////////////
        return (
          <div id='Courses_div'>
            <div className="wrap main--grid">

              {/* Mapping through the course data from props
                  Adding an index to enable a key property
                  Dynamically adding course info */}
              {
                courseList.map( ( course, index ) => 
                  <div key={ index }>
                    <a className="course--module course--link" href={ `/courses/${ course.id }` }>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{ course.title }</h3>
                    </a>
                  </div> )
              }
              <div>
                <a className="course--module course--add--module" href={decider()}>
                  <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                      New Course
                  </span>
                </a>
              </div>
            </div>
          </div>
        )} else {
            return (
              <div id='Courses_div'>
                <div className="wrap main--grid">
                  <div>
                    <a className="course--module course--add--module" href="/courses/create">
                      <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                          New Course
                      </span>
                    </a>
                  </div>   
                </div>
              </div>
            )}
      } catch ( error ) {
          console.log( error.message );
        }
  }