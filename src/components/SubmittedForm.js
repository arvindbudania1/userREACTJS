import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../static/submit.css'
const SubmittedForm = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get('https://avbudania123.pythonanywhere.com/api/user-form/')
      .then((resp) => {
        setdata((resp.data));
        console.log(resp.data)
      })
      .catch((error) => {
        console.error('Error while Fetching api:', error);
      });
  }, []);
  
  return (
    <div className='container2'>
    <h1>Submitted Forms</h1>
    <ol>
      {data.map((data, index) => (
        <li key={index}>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Date of Birth:</strong> {data.dob}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone_number}</p>
        </li>
      ))}
    </ol>
  </div>
  );
};

export default SubmittedForm;