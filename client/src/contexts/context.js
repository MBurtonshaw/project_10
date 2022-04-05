import React, { Component } from 'react';
import Data from '../HOCs/Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {
  
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get( 'authenticatedUser' );
    this.state = {
      authenticatedUser : this.cookie ? JSON.parse( this.cookie ) : null
    };
  }

  

  state = {
    authenticatedUser: null
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse
      }
    }

    return (
      <Context.Provider value={ value }>
        { this.props.children }
      </Context.Provider>  
    );
  }

  
  signIn = async ( emailAddress, password ) => {
    const user = await this.data.getUser( emailAddress, password );
    
    if ( user !== null ) {
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
      user.user.password = password;
      Cookies.set( 'authenticatedUser', JSON.stringify( user ), { expires: 1 } );
    }
    return user;
  }

  signOut = () => {
    try {
      this.setState(()=> {
        return {
          authenticatedUser: null }
        });
      Cookies.remove( 'authenticatedUser' );
    } catch (error) {
      console.log(error.message);
    }
  }

  updateCourse = async () => {
    try {
      await this.data.updateCourse();
    } catch (error) {
      console.log(error.message)
    }
  }

  deleteCourse = async (courseId, emailAddress, password) => {
    if ( this.state.authenticatedUser !== null) {
      try {
        await this.data.deleteCourse(courseId, emailAddress, password);
      } catch(error) {
        console.log(error.message);
      }
    }
  }
}



export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param { class } Component - A React component.
 * @returns { function } A higher-order component.
 */

export default function withContext( Component ) {
  return function ContextComponent( props ) {
    return (
      <Context.Consumer>
        { context => <Component { ...props } context={ context } />}
      </Context.Consumer>
    );
  }
}

