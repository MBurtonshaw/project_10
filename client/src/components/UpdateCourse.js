import React, { Component } from 'react';
import withNavigation from '../HOCs/Nav';
import withParameters from '../HOCs/Params';
import Forbidden from './Forbidden';
import Form from './Form';
import Error from './Error';

class UpdateCourse extends Component {
  constructor(props) {
    super();
    let owner = props.context.authenticatedUser;
    this.state = {
      userId: owner.user.id,
      emailAddress: owner.user.emailAddress,
      password: owner.user.password,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      course: '',
      errors: ''
    }
}
    state = {
        userId: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        emailAddress: '',
        password: '',
        errors: [],
      }

    render(props) {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
          } = this.state;

          const { id } = this.props.params;

        if (this.props.context.authenticatedUser !== null && id !== null ) {
         
            let owner = this.props.context.authenticatedUser;

            function ErrorsDisplay() {
              if (errors) {
                let errors_list = errors.map((error, index) => 
                  <li key={index} className='error_display'>{error}</li>
                );
             return (
               <div className='error_display' id='error_display_div'>
                  <div className='error_display'>
                  <ul className='error_display'>
                    {errors_list}
                  </ul>
                  </div>
               </div>
             )
              }
              return null;
          }

        return (
            <div id='UpdateCourse_div'>
            <div className="wrap header--flex">
                <div className="wrap">
                    <h2>Update Course</h2>
                    <Form
                        cancel={ this.cancel }
                        errors={ errors }
                        submit={ this.submit }
                        submitButtonText="Update"
                        elements={ () => (
                            <React.Fragment>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input id="courseTitle" name="title" type="text" value={title} onChange={ this.change }/>

                                        <p>By: {owner.user.firstName + ' ' + owner.user.lastName}</p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="description" value={description} onChange={ this.change }></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={ this.change }/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={ this.change }>
                                        </textarea>
                                    </div>
                                </div>
                                <ErrorsDisplay errors={errors} />
                        </React.Fragment>
                        )}/>
                    
                    </div>
                </div>
            </div>
            )
        } else {
            return <Forbidden />
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
        const courseId = this.props.params.id;
        const { userId, title, description, estimatedTime, materialsNeeded } = this.state;
    
        if (this.props.params.id !== undefined) {

              try {
                context.data.updateCourse( courseId, userId, title, description, estimatedTime, materialsNeeded, this.state.emailAddress, this.state.password ).then(
                  errors => {
                    if (errors) {
                      this.setState({errors: errors});
                    } else {
                      this.props.navigate(`/courses/${courseId}`);
                    }
                  }
                );
                //this.props.navigate(`/courses/${this.props.params.id}`);
            } catch(error) {
                console.log(error);
            }
          

    } else {
      return <Forbidden />
    }
    }
}

export default withNavigation( withParameters( UpdateCourse ) );