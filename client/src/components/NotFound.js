import { React, Component } from 'react';

export default class NotFound extends Component {
    render() {
      return (
        <div id='NotFound_div'>
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, Joe Smith!</li>
                            <li><a href="sign-out.html">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Not Found</h2>
                    <p>Sorry! We couldn't find the page you're looking for.</p>
                </div>
            </main>
        </div>
      )
    }
}