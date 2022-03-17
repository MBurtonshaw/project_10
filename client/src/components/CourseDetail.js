import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail() {

  //Destructuring id from url params, and initiating state 'results'
  const { id } = useParams();
  const [ results, setResults ] = useState('');

  //Function to fetch data from api based on id param
  //Sets the response to state 'results'
  async function sideLoader() {
    try{
      return(
        await axios.get(`http://localhost:5000/api/courses/${id}`).then(
            response => setResults(response.data.course)
      ).then(
        console.log('CourseDetail.js: create state, fetch data -- success')
      ));
    } catch(error) {
      console.log(error.message);
    }
  };
  
  //Using useEffect to call sideLoader function & fetch data
  //Including setResults in the array in order to prevent infinite looping behavior
  useEffect(() => { sideLoader() }, [ setResults ]);

  //Destructuring the User from results state for easier access to the object
  const { User } = results;

  //Checking if the User is present before loading page to account for async functions
  if (User) {
    //////////////////////////////////////////////////////////////////////////////////////////////////
    return(
      <div className="wrap">
        <h2>Course Detail</h2>
          <form>

            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{results.title}</h4>
                <p>{results.description}</p>                            
              </div>

              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{results.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <li>{results.materialsNeeded}</li>
                </ul>
              </div>
            </div>

          </form>
        </div>
      );
    } else {
      return(<div><h1>Not Found</h1></div>);
    }
}