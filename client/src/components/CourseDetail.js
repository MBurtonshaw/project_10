import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail(props) {
//You have access to the url id
//You need to figure out how to iterate over props to get their id properties
//Then render the page conditionally

  let { data } = props;
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


      return(
        <div>
          <h1>{results.id}</h1>
        </div>
      );
}
