import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail() {

  //Destructuring id from url params, and initiating state 'results'
  const { id } = useParams();
  const [ courseDetails, setCourseDetails ] = useState('');
  //Function to fetch data from api based on id param
  //Sets the response to state 'results'
  async function loader() {
    if (id) {
    try{
      return(
        await axios.get(`http://localhost:5000/api/courses/${id}`).then(
            response => setCourseDetails(response.data.course)
      ).then(
        console.log(`CourseDetail.js: set course(${id}) data to state -- success`)
      ));
    } catch(error) {
      console.log(error.message);
    }
  }
  };

  async function delete_course() {
    if (id) {
    try{
        await axios.delete(`http://localhost:5000/api/courses/${id}`).then(
        console.log('CourseDetail.js: delete course -- success'));
    } catch(error) {
      console.log(error.message);
    }
  } else {
    return <div><h1>Not found</h1></div>
  }
  };


  
  //Using useEffect to call loader function & fetch data
  //Including setResults in the array in order to prevent infinite looping behavior
  useEffect(() => { loader() }, [ setCourseDetails ]);

  //Destructuring the User from results state for easier access to the object
  const { User } = courseDetails;

  //Checking if the User is present before loading page to account for async functions
  if (User) {
    try {
    //////////////////////////////////////////////////////////////////////////////////////////////////
      return(
        <div>
          <div className="actions--bar">
            <a className="button" href={`/courses/${id}/update`}>Update Course</a>
            <a className="button" onClick={() => delete_course()}>Delete Course</a>
            <a className="button button-secondary" href="/">Return to List</a>
            </div>

          <div className="wrap">
            <h2>Course Detail</h2>
              <form>

                <div className="main--flex">
                  <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{courseDetails.title}</h4>
                    <p>{courseDetails.description}</p>                            
                  </div>

                  <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{courseDetails.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      {/*{courseDetails.materialsNeeded.map(material => {
                        return <li> {material} </li>
                      })}*/}
                    </ul>
                  </div>
                </div>

              </form>
            </div>
          </div>
        );
    } catch(error) {
      console.log(error.message)
    } 
  } else {
    return(<div><h1>Not Found</h1></div>);
  }
}