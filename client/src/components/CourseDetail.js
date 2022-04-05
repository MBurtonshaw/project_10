import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from './NotFound';
import MarkdownToHtml from '../HOCs/Markdown';

export default function CourseDetail( props ) {

  //Destructuring id from url params, and initiating state 'results'
  const { id } = useParams();
  const [ courseDetails, setCourseDetails ] = useState('');

  //Function to fetch data from api based on id param
  //Sets the response to state 'courseDetails'
  async function loader() {
    if ( id ) {
      try{
        return(
          await axios.get( `http://localhost:5000/api/courses/${ id }` ).then(
              response => setCourseDetails( response.data.course )
        ));
      } catch( error ) {
        console.log( error.message );
      }
    }
  };

  //function to fetch a course by id, then making a delete call to the api
  async function delete_course(email, password) {
    if ( id ) {
      try{
          props.context.actions.deleteCourse(`/courses/${id}`, 'DELETE', null, true, {email, password});
      } catch( error ) {
        console.log( error.message );
      }
    } else {
      return <NotFound />
    }
  };


  
  //Using useEffect to call loader function & fetch data
  //Including setCourseDetails in the array in order to prevent infinite looping behavior
  useEffect( () => { loader() }, [ setCourseDetails ] );

  if ( courseDetails !== null ) {
      //Destructuring the User from results state for easier access to the object
    const { User } = courseDetails;
    //Checking if the User is present before loading page to account for async functions
    if ( User ) {
      let owner = props.context.authenticatedUser;
      
      try {
      //////////////////////////////////////////////////////////////////////////////////////////////////
      //Checking if the user is the course owner
      //If so, they have access to update & delete the course. Otherwise component is returned
      //without those options
      if ( owner !== null && owner.user.id === User.id ) {
        return(
          <div>
            <div className="actions--bar">
              <a className="button" href={ `/courses/${id}/update` }>Update Course</a>
              <a className="button" onClick={ () => delete_course(owner.user.emailAddress, owner.user.password) }>Delete Course</a>
              <a className="my_button" href="/">Return to List</a>
            </div>

            <div className="wrap">
              <h2>Course Detail</h2>
                <form>
                  <div className="main--flex">

                    <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{ courseDetails.title }</h4>
                      {/*rendering course description w markdown*/}
                      {MarkdownToHtml( `${ courseDetails.description }` )}                        
                    </div>

                    <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{ courseDetails.estimatedTime }</p>
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                        {/*rendering course materials w markdown*/}
                        <li>{ MarkdownToHtml( `${ courseDetails.materialsNeeded }` )}</li>
                      </ul>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          );
      } else {
        return(
          <div>
            <div className="actions--bar">
              <a className="button button-secondary" href="/">Return to List</a>
            </div>

            <div className="wrap">
              <h2>Course Detail</h2>
                <form>
                  <div className="main--flex">

                    <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{ courseDetails.title }</h4>
                      {/*rendering course description w markdown*/}
                      { MarkdownToHtml( `${ courseDetails.description }` ) }                         
                    </div>

                    <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{ courseDetails.estimatedTime }</p>
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                        {/*rendering course materials w markdown*/}
                        <li>{ MarkdownToHtml( `${ courseDetails.materialsNeeded }` ) }</li>
                      </ul>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          );
        }
      } catch( err ) { 
        console.log( err.message )}
    } else {
      return <NotFound />
    }
  } else {
    return <NotFound />
  }
}
