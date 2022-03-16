import { React, useState } from 'react';
import axios from 'axios';

export default function CourseDetail(props) {
//The problem right now is this is set up to return all courses
//Figure out a way to get the course id, like req.params.id
//Then this'll be easy to figure out

  let { data } = props;
  
    try {
      if (data) {
        return(
          data.map( (course, index) =>
            <div key={index} id='CourseDetail_div' className='wrap'>
                <h2>Course Detail</h2>
                    <form>
                      <div className='main--flex'>
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                              <p>By </p>
                              <p>{course.detail}</p>                              
                      </div>
                    <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>14 hours</p>
  
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
          )
        );
      } else {
        console.log('error')
      }
    }
      catch(error) {
      console.log(error.message);
    }
  };