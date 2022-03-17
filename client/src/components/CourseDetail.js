import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail(props) {
//You have access to the url id
//You need to figure out how to iterate over props to get their id properties
//Then render the page conditionally


  const { id } = useParams();
  const [ results, setResults ] = useState('');

  async function sideLoader() {
    try{
      return(
        await axios.get(`http://localhost:5000/api/courses/${id}`).then(
            response => setResults(response.data.course)
      ));
    } catch(error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => { sideLoader() }, [ setResults ]);
  const { User } = results;

  if (User) {
      return(
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{results.title}</h4>
                            

                            <p>{results.description}</p>                            
                            
                            
                            
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{results.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                  <li>{results.materialsNeeded}</li>
                                </ul>
                        </div>
                    </div>
                </form>
            </div>
      );
} else {
  return(<div><h1>Nope</h1></div>);
}
}