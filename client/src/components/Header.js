import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Header() {
      return (
        <div id='header_div'>
          <HelmetProvider>
            <Helmet>
              <meta charset="UTF-8"></meta>
              <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
              <title>Courses</title>
              <link rel="preconnect" href="https://fonts.gstatic.com"/>
              <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
                  rel="stylesheet"/>
              <link href="../App.css" rel="stylesheet"/>
              <link href="../index.css" rel="stylesheet"/>
              </Helmet>
              </HelmetProvider>
                <header>
                      <div className="wrap header--flex">
                          <h1 className="header--logo"><a href="/">Courses</a></h1>
                          <nav>
                              <ul className="header--signedout">
                                  <li><a href="/sign_up">Sign Up</a></li>
                                  <li><a href="/sign_in">Sign In</a></li>
                              </ul>
                          </nav>
                      </div>
                </header>
              </div>
        
      )
}



