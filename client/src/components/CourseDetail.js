import { React, useState, useEffect } from 'react';
import { useParams, useNavigate, UNSAFE_NavigationContext } from 'react-router-dom';
import axios from 'axios';
import NotFound from './NotFound';
import MarkdownToHtml from '../HOCs/Markdown';
import Error from './Error';


export default function CourseDetail( props ) {

  const navigate = useNavigate();
  const { id } = useParams();
  const [ courseDetails, setCourseDetails ] = useState('');
  const [ courseOwner, setCourseOwner ] = useState('');

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

  async function delete_course(id, emailAddress, password) {
    if ( id ) {
      try{
          await props.context.actions.deleteCourse(`${id}`, emailAddress, password);
          navigate('/');
      } catch( error ) {
        return <Error error={error.message}/>
      }
    } else {
      return <NotFound />
    }
  };

  useEffect( () => { loader() }, [ setCourseDetails ] );
  useEffect( () => { loader_2() }, [ setCourseOwner ] );

  if ( courseOwner !== null ) {
    let owner = courseOwner;
    
      try {
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
          return <Error error={'Something went wrong'}/>
        }
      } catch(error) {
        return <Error error={error.message}/>
      }
    }
  }