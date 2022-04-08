import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFound from './NotFound';
import MarkdownToHtml from '../HOCs/Markdown';
import Error from './Error';


export default function CourseDetail( props ) {

  //Destructuring id from url params, and initiating state 'results'
  const navigate = useNavigate();
  const { id } = useParams();
  const [ courseDetails, setCourseDetails ] = useState('');
  const [ courseOwner, setCourseOwner ] = useState('');

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

  async function loader_2() {
    if ( id ) {
    try {
      await axios.get( `http://localhost:5000/api/courses/${ id }` ).then(
        response => setCourseOwner( response.data.course.User )
    )
    } catch(error) {
      console.log(error)
    }
  }
  }

  //function to fetch a course by id, then making a delete call to the api
  async function delete_course(id, emailAddress, password) {
    if ( id ) {
      try{
          await props.context.actions.deleteCourse(`${id}`, emailAddress, password);
          navigate('/');
      } catch( error ) {
        console.log( error.message );
      }
    } else {
      return <NotFound />
    }
  };

  console.log(props)
  
  //Using useEffect to call loader function & fetch data
  //Including setCourseDetails in the array in order to prevent infinite looping behavior
  useEffect( () => { loader() }, [ setCourseDetails ] );
  useEffect( () => { loader_2() }, [ setCourseOwner ] );

  if ( courseOwner !== null ) {
    let owner = courseOwner;
    
      try {
      //////////////////////////////////////////////////////////////////////////////////////////////////
      //Checking if the user is the course owner
      //If so, they have access to update & delete the course. Otherwise component is returned
      //without those options
      //if ( props.context.authenticatedUser.user !== null && props.context.authenticatedUser.user !== undefined) {
        let user = props.context.authenticatedUser;
        if (user === null || user.user.id !== owner.id) {
          return (
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
          )
        } else if (user.user.id === owner.id) {
          return(
              <div>
                <div className="actions--bar">
                  <a className="button" href={ `/courses/${id}/update` }>Update Course</a>
                  <a className="button" onClick={ () => delete_course(id, user.user.emailAddress, user.user.password) }>Delete Course</a>
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
              )
        } else {
          return(<Error/>);
        }
      } catch(error) {
        console.log(error.message)
      }
    }
  }