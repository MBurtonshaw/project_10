import { React, Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Header extends Component {
    render() {
      return (
          <div id='Header_div' className="wrap header--flex">
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
          </div>
      )
    }
}