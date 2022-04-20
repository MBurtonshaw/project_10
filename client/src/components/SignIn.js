import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import withNavigation from '../HOCs/Nav';
import Error from './Error';

class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

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
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={ this.cancel }
            errors={ errors }
            submit={ this.submit }
            submitButtonText="Sign In"
            //Render prop to fill in the body of the form
            elements={ () => (
              <React.Fragment>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
    );
  }

  //Sets user input to state as it's typed, before submit
  change = ( event ) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [ name ]: value
      };
    });
  }

  //Function to submit the form based on signIn() from ./context, and user data from state
  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    context.actions.signIn( emailAddress, password ).then(
      user => {
        if ( user === null ) {
          this.setState( ()=>{
            return { errors: [ 'signin unsuccessful' ] }
          });
        } else {
          this.setState( ()=>{
            return {
              emailAddress: emailAddress,
              password: password
            }
          });
          //Navigate to previous page when signed in
          this.props.navigate( -1 );
        }
      }).catch(error=>
         <Error error={error.message}/>
      )
    };

  cancel = () => {
    this.props.navigate( '/' );
  }
}

export default withNavigation( UserSignIn );