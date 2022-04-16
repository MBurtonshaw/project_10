import config from '../config';
import withNavigation from './Nav';

export default class Data {
  api( path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if ( body !== null ) {
      options.body = JSON.stringify(body);
    }

    if ( requiresAuth ) {
      const encodedCredentials = btoa( `${ credentials.emailAddress }:${ credentials.password }` );
      options.headers[ 'Authorization' ] = ` Basic ${ encodedCredentials } `;
    }

    return fetch( url, options );
  }

  async getUser( emailAddress, password ) {
    const response = await this.api( `/users`, 'GET', null, true, { emailAddress, password });
    if ( response.status === 200 ) {
      return response.json().then( data => data );
    }
    else if ( response.status === 401 ) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser( user ) {
    const response = await this.api( '/users', 'POST', user );
    if ( response.status === 201 ) {
      return [];
    }
    else if ( response.status === 400 ) {
      return response.json().then( data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(courseId, email, password) {

    const response = await this.api( `/courses/${courseId}`, 'DELETE', null, true, {emailAddress: email, password});

    if ( response.status === 200 ) {
      return response.json([]).then( data => data );
    }
    else if ( response.status === 401 ) {
      return null;
    }
    else {
      throw new Error();
    }
  }


  async createCourse( {userId, title, description, estimatedTime, materialsNeeded, emailAddress, password} ) {
    if (title !== '' && description !== '') {
      const response = await this.api( '/courses', 'POST', {
        userId, title, description, estimatedTime, materialsNeeded
        }, true, {emailAddress, password} );
          if ( response.status === 201 ) {
            return console.log(response.status);
          }
          else if ( response.status === 400 ) {
            return console.log(response.status);
           
          }     else if ( response.status === 401 ) {
            return console.log(response.status);
          }
          else {
            throw new Error();
          }
        }
    } 

      async updateCourse( courseId, userId, title, description, estimatedTime, materialsNeeded, emailAddress, password ) {
        if (courseId !== undefined && courseId !== null) {
        console.log(emailAddress, password);
        const course = {userId, title, description, estimatedTime, materialsNeeded};
        const credentials = {emailAddress, password};
        const response = await this.api( `/courses/${courseId}`, 'PUT', course, true, credentials );
        console.log(course);
        console.log(credentials);
            if ( response.status === 201 ) {
              console.log('success')
            }
            else if ( response.status === 400 ) {
              return response.json().then( data => {
                return ({error: data.errors});
              });
            }     else if ( response.status === 401 ) {
              return null;
            }
            else {
              throw new Error();
            }
          }
        } 
  }

