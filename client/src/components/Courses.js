import React from 'react';

export default function Courses(props) {
    let { data } = props;
    console.log(data);

    try{
      if (data) {
      return (
        <div id='Courses_div'>
                <div className="wrap main--grid">

                  {
                    data.map( (course, index) => 
                      <div key={index}>
                        <a className="course--module course--link" href={`/course_detail/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                        </a>
                      </div>
                    )}

                    <a className="course--module course--add--module" href="/create_course">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </a>
                    
                </div>
        </div>
      )} else {
          return (
            <div id='Courses_div'>
                    <div className="wrap main--grid">
    
                        <a className="course--module course--add--module" href="/create_course">
                            <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                            </span>
                        </a>
                        
                    </div>
            </div>
          )}
    } catch (error) {
                    console.log(error.message);
                  }
}