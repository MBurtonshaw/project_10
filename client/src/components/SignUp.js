import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import withNavigation from '../HOCs/Nav';

class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    function ErrorsDisplay() {
      return (
        <div className='error_display' id='error_display_div'>
           <div className='error_display'>
           <h1 className='error_display'>{errors}</h1>
           </div>
        </div>
      )
   }

    return (
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form 
            cancel={ this.cancel }
            errors={ errors }
            submit={ this.submit }
            submitButtonText="Sign Up"
            //Render prop to fill in the body of the form
            elements={ () => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={ firstName } 
                  onChange={ this.change } 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={ lastName } 
                  onChange={ this.change } 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={ emailAddress } 
                  onChange={ this.change } 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={ password } 
                  onChange={ this.change } 
                  placeholder="Password" />
                  <ErrorsDisplay />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
    );
  }

  //Sets state based on user input before submit
  change = ( event ) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState( () => {
      return {
        [ name ]: value
      };
    });
  }

  submit = () => {
    //Deconstructing variables from props & state and setting them to 'user' variable
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;
    const user = { firstName, lastName, emailAddress, password };

    //Executing createUser function from Data.js using the above 'user' variable
    context.data.createUser( user ).then(
      errors => {
        if ( errors.length ) {
          this.setState({ errors });
        } else {
            context.actions.signIn( emailAddress, password ).then(
            //navigate back to previous page when signed up
            this.props.navigate( -1 )
          );
        }
      }).catch(err => {
        console.log( err );
        this.props.navigate( '/not_found' );
      });
  }

  cancel = () => {
    this.props.navigate( '/' );
  }
}

export default withNavigation( UserSignUp );