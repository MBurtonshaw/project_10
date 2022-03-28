import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import withNavigation from '../HOCs/Nav';

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

    return (
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password).then(
      user => {
        if (user === null) {
          this.setState(()=>{
            return {errors: ['signin unsuccessful']}
          });
        } else {
          this.setState(()=>{
            return {
              emailAddress: emailAddress,
              password: password
            }
          });
          //this.props.navigate('/');
          console.log(`Success, ${emailAddress} is logged in`);
        }
      }).catch(err => console.log(err.message))
    };

  cancel = () => {
    this.props.navigate('/');
  }
}

export default withNavigation(UserSignIn);