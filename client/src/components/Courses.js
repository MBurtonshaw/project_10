import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Error from './Error';

export default function Courses( props ) {

  const [ courseList, setCourseList ] = useState([ '' ]);
  const [ mistakes, setMistakes ] = useState('');

  async function loader() {
      try{
        return(
          await axios.get( `http://localhost:5000/api/courses` ).then(
              response => setCourseList( response.data )
        ));
      } catch( error ) {
        setMistakes(error.response.status + ' ' + error.response.statusText);
      }
  };
    
    useEffect( () => { loader() }, [ setCourseList ] );

    function ErrorsDisplay() {
      if (this.state.mistakes !== null) {
        let errors_list = this.state.errors.map((error, index) => 
          <li key={index} className='error_display'>{error}</li>
        );
     return (
       <div className='error_display' id='error_display_div'>
          <div className='error_display'>
          <ul className='error_display'>
            {errors_list}
          </ul>
          </div>
       </div>
     )
      }
      return null;
  }

    try {
      if ( courseList ) {
        
        return (
          <div id='Courses_div'>
            <div className="wrap main--grid">
              <ErrorsDisplay />
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
                <a className="course--module course--add--module" href={ '/courses/create' }>
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
          return <Error error={error.message}/>
        }
  }