 

import Comment from '../comment';
import "./index.css"
import { Link } from 'react-router-dom';
import Markdown from '../markdown';
import React, { useState, useEffect , useContext} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
const LargePost = ({postData}) => {
 const userData = useContext(UserContext);
  const [user , setUser] = useState({});

  useEffect(() => {
    
    if (postData.originalPoster) {
    fetch(`http://localhost:3003/api/users/${postData.originalPoster}`)
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.log(error))
    }
    
  }, [postData])




  const { id } = useParams();

 

  const addComment = () => {
    const comment = document.getElementById('commentInput').value;
fetch(`http://localhost:3003/api/projects/${id}/reactions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
   
  },
  body: JSON.stringify({ reactionBody: comment , user: userData.id}),
})
window.location.reload();
  }






return (
    <div className='container' id=''>
<div id='top'>
  <Link to={`/profile/${user.id}`}>
    <img src={user.image} alt="Placeholder image"/>
  </Link>
    <div id='info'>
        <p className='is-size-4 has-text-weight-bold'>{user.name}</p>

        <p className='is-size-6'>{postData.date}</p>
    </div>
</div>

<div className="" id='bottom'>
<p className='is-size-2 has-text-white has-text-weight-bold'>{postData.title}</p>
<hr className='p-0 m-1'/>
<div className='box p-6'>
<Markdown markdown={postData.description}/>
</div>
</div>

 


     <div id='inputContainer'>
    <textarea placeholder="Add a comment" className='textarea is-rounded' rows="3" id='commentInput'/>
    <button className='button is-rounded is-success' id='commentButton' onClick={addComment}>Post</button>
    </div>


<div className='columns is-multiline is-justify-content-center mt-5' >
{postData.reactions ? (
 postData.reactions.map((comment, index) => (
    <div className='column is-10' key={index}>
      <Comment commentData={comment}/>
    </div>
  ))
) : <p className='mt-5'>No comments</p>}

</div>
        </div>
)




}


export default LargePost;