import React from 'react';

export default function Courses(props) {
  //Destructuring data passed down from App component for later access
    let { data } = props;

    try {
      //Conditional statement to check that App is passing down props
      if (data) {
        console.log('Courses.js: retrieve data from props -- success')
    //////////////////////////////////////////////////////////////////////////////////////////////////
        return (
          <div id='Courses_div'>
            <div className="wrap main--grid">

              {/* Mapping through the course data from props
                  Adding an index to enable a key property
                  Dynamically adding course info */}
              {
                data.map( (course, index) => 
                  <div key={index}>
                    <a className="course--module course--link" href={`/course_detail/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                    </a>
                  </div> )
              }
              <div>
                <a className="course--module course--add--module" href="/create_course">
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
                    <a className="course--module course--add--module" href="/create_course">
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
      } catch (error) {
          console.log(error.message);
        }
  }