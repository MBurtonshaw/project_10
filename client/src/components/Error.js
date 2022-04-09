import { React, Component } from 'react';


export default class Error extends Component {
    render() {
        let mistake;
        if (this.props.error) {
            mistake = this.props.error
        } else {
            mistake = 'Oops! Something went wrong'
    }
      return (
          <div id='Error_div'>
            <div className="wrap">
                <h2>Error</h2>
                <p>{mistake}</p>
            </div>
        </div>
      )
    }
}