import { React, Component } from 'react';


export default class Forbidden extends Component {
    render() {
      return (
          <div id='Forbidden_div'>
            <header>
                <div class="wrap header--flex">
                    <h1 class="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul class="header--signedin">
                            <li>Welcome, Joe Smith!</li>
                            <li><a href="sign-out.html">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div class="wrap">
                    <h2>Forbidden</h2>
                    <p>Oh oh! You can't access this page.</p>
                </div>
            </main>
        </div>
      )
    }
}