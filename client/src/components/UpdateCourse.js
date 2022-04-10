import React, { Component } from 'react';
import withNavigation from '../HOCs/Nav';
import withParameters from '../HOCs/Params';
import Form from './Form';
import Error from './Error';

class UpdateCourse extends Component {
  constructor(props) {
    super();
    let owner = props.context.authenticatedUser;
    this.state = {
      userId: owner.user.id,
      emailAddress: owner.user.emailAddress,
      password: owner.user.password
    }
}
    state = {
        userId: '',
        courseTitle: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
        emailAddress: '',
        password: '',
        errors: [],
      }

    render(props) {
        const {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            errors,
          } = this.state;

          const { id } = this.props.params;

        //If there's an authenticated user, display the component
        //Otherwise, redirect to /signin
        if (this.props.context.authenticatedUser !== null && id !== null ) {
            let owner = this.props.context.authenticatedUser;

        return (
            <div id='UpdateCourse_div'>
            <div className="wrap header--flex">
                <div className="wrap">
                    <h2>Update Course</h2>
                    <Form
                        cancel={ this.cancel }
                        errors={ errors }
                        submit={ this.submit }
                        submitButtonText="Create"
                        elements={ () => (
                            <React.Fragment>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={ this.change }/>

                                        {/*<p>By: {owner.user.firstName + ' ' + owner.user.lastName}</p>*/}

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={ this.change }></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={ this.change }/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={ this.change }>
                                        </textarea>
                                    </div>
                                </div>
                        </React.Fragment>
                        )}/>
                    
                    </div>
                </div>
            </div>
            )
        } else {
            this.props.navigate( '/signin' );
        }
    }

    change = ( event ) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [ name ]: value
          };
        });
      }

      //CLEARED FOR ERRORS
    submit = () => {
        const { context } = this.props;
        const { userId, courseTitle, courseDescription, estimatedTime, materialsNeeded, emailAddress, password } = this.state;
        const course = { userId, courseTitle, courseDescription, estimatedTime, materialsNeeded };
        const credentials = {emailAddress, password};
        try {
          context.data.updateCourse(this.params.id, course, credentials)
      } catch(error) {
          return <Error error={error.message}/>
      }
    }
}

export default withNavigation( withParameters( UpdateCourse ) );