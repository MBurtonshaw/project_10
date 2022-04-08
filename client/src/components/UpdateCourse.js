import { React, useState, useEffect } from 'react';
import Forbidden from './Forbidden';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withNavigation from '../HOCs/Nav';

function UpdateCourse( props ) {

    const id = useParams();

    const authenticatedUser = props.context.authenticatedUser;

    function updateCourse(userId, title, description, materialsNeeded, estimatedTime) {
       props.context.actions.updateCourse({userId, title, description, materialsNeeded, estimatedTime})};
    
    //Getting id from url params
    //Initiating state
    const [ currentUserId, setCurrentUserId ] = useState('');
    const [ course, setCourse ] = useState('');
    const userId = props.context.authenticatedUser.id;

    //Function to get current user's ID set to state
    async function loader() {
        if ( id ) {
          try{
            return(
              await axios.get( `http://localhost:5000/api/courses/${ id }` ).then(
                  response => setCurrentUserId(response.data.course.userId)
            ))
          } catch( error ) {
            console.log( error.message );
          }
        }
      };

      async function second_loader() {
        if (currentUserId !== null) {
        try {
          await axios.get( `http://localhost:5000/api/courses/${ id }` ).then(
            data => setCourse(data.data.course))
        } catch( error ) {
          console.log( error.message );
        }
      }
    }

     /* function submit() {
        ''
      } */

     
        //second_loader set first because otherwise two objects were returned, the first being undefined
        //in this order, only one is returned and there is no error on pageLoad
        useEffect(() => { second_loader() }, [ setCourse ]);
        useEffect(() => { loader() }, [ setCurrentUserId ]);
        let { User } = course;
        

        if ( authenticatedUser !== null && authenticatedUser.user.id === User.id ) {

          
          console.log(User.firstName);
       
          return (
            <div id='UpdateCourse_div' className="wrap header--flex">
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>{ `Welcome, ${ authenticatedUser.user.firstName }!` }</li>
                            <li><a href="/signout">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="wrap">
                    <h2>Update Course</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title}/>

                                    <p>By: {User.firstName + ' ' + User.lastName}</p> 

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" defaultValue={course.description}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime}/>

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded}></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit" onSubmit={updateCourse(id, userId, 'new', 'new', 'new', 'new')}>Update Course</button><button className="button button-secondary" href='/'>Cancel</button>
                        </form>
                    </div>
     
            </div>
        )
                   } else {
            return <Forbidden />
        }
}

export default withNavigation( UpdateCourse );