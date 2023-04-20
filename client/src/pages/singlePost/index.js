import LargePost from '../../components/largePost';
import React, { useState, useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import "./index.css"

function SinglePost() {


const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();


useEffect(() => {
  fetch(`http://localhost:3003/api/projects/${id}`)
  .then(response => response.json())
  .then(data => setPostData(data))
  .catch(error => setError(error))
}, [])







if (error) {
  return <Navigate to="/404" />;
}


return (
  <div id='parent'>
    <LargePost postData={postData}/>
  </div>
 
);
}

export default SinglePost