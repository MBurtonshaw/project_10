import { React, Component } from 'react';
import withNavigation from '../HOCs/Nav';
import SignIn from './SignIn';

class CreateCourse extends Component {

    render( props ) {

        //If there's an authenticated user, display the component
        //Otherwise, redirect to /signin
        if ( this.props.context.authenticatedUser !== null ) {
        return (
            <div id='CreateCourse_div'>
            <div className="wrap header--flex">
                <div className="wrap">
                    <h2>Create Course</h2>
                    <div className="validation--errors">
                            {/*<h3>Validation Errors</h3>
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>*/}
                    </div>
                    <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue=""/>

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue=""/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded">
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" href='index.html'>Cancel</button>
                    </form>
                    </div>
                </div>
            </div>
            )
        } else {
            props.navigate( '/signin' );
        }
    }
}

export default withNavigation( CreateCourse );