
import React, { useState, useEffect} from 'react';
import EditableText from '../editableText';
import HandleArray from '../handleArray';
import './index.css';
import Markdown from '../markdown';
import { GoCheck } from 'react-icons/go';
import { useParams} from 'react-router-dom';

const EditPost = ({ postData }) => {


const { id } = useParams();

    const [post, setPost] = useState({
        title: '',
        body: '',
        tags: [],
        // collaborators : []
    });

    const [user , setUser] = useState({})

    const [hasChanged, setHasChanged] = useState(false)

    useEffect(() => {
        setPost(
            {
                title: postData.title,
                body: postData.description,
                tags : postData.tags,
                // collaborators : ['collab1', 'collab2', 'collab3']
            }
        );
    }, [postData]);

    useEffect(() => {
        if (postData.originalPoster) {
        fetch(`http://localhost:3003/api/users/${postData.originalPoster}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.log(error))
        }
    }, [postData])
        



    function handleState(fieldName, value) {
        setPost({
          ...post,
          [fieldName]: value
        });
        setHasChanged(true)
    }


    function handleSave() {
    fetch(`http://localhost:3003/api/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: post.title,
            description: post.body,
            tags: post.tags,
            // collaborators: post.collaborators
        })
    })

        alert("Post updated!")
        setHasChanged(false)
       window.location.reload()
      }



    return (
     
        <div className='container'>
            <div>
        <div id='top'>
            <img src={user.image} alt="Placeholder image"/>
            <div id='info'>
                <p className='is-size-4 has-text-weight-bold'>{user.name}</p>
        
                <p className='is-size-6'>{postData.date}</p>
            </div>
     
         </div>
        </div>
        
        <div className="container  is-fluid" id='bottom'>
        <EditableText text={post.title} updateParentState={handleState} fieldName="title"/>
        <hr className='p-0 m-1'/>
        
        <div className='columns is-multiline'>
            <div className='column is-12' >
            <HandleArray dataArray={post.tags} updateParentState={handleState} fieldName="tags" Btn="Add Tags" />
         </div>
            {/* <div className='column is-12' >
            <HandleArray dataArray={post.collaborators} updateParentState={handleState} fieldName="collaborators" Btn="Add Collaborators" placeholder="github" />
            </div> */}
            </div>
        <div id='textarea'>
        <EditableText text={post.body} updateParentState={handleState} fieldName="body" htmlEl="textarea"/>
        </div>
        <div className='box'>
        <Markdown markdown={post.body}/>
            </div>
            {hasChanged && (
                <div className='has-text-right'>
                 <button className="button is-info mt-2 is-rounded" id="post" onClick={handleSave}><GoCheck id="check"/></button>
                 </div>)}

        </div>
        </div>
       
    )


}


export default EditPost;
