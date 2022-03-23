import { React/*, useState*/ } from 'react';

export default function SignIn() {

  //create a context
  //set user upon submission
  //make it available throughout app

      //const [ user, setUser ] = useState('');
      //const email = document.getElementById('emailAddress');
      return (
        
          <div id='SignIn_div'>

            <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""/>
                    <button  className="button" type="submit" >Sign In</button><button className="button button-secondary"  >Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="/sign_up">sign up</a>!</p>
              </div>
            </div>
          
      )
    }