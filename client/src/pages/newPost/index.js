import { useState, useEffect, useContext } from "react";
import "./index.css"
import {GoCheck} from "react-icons/go"
import HandleArray from "../../components/handleArray";
import Markdown from "../../components/markdown";
import { UserContext } from '../../App';

const NewPost = () => {
 
    const userData = useContext(UserContext);
    
 
        const [inputValue, setInputValue] = useState({
            title: '',
            body: '',
            tags: [],
            // collaborators: []
        });
    
        const [preview, setPreview] = useState(false);
    
    
        const handleInput = (e) => {
            const { name, value } = e.target;
            setInputValue({ ...inputValue, [name]: value });
        };
    
        const handleSubmit = () => {
            // save to database
            fetch('http://localhost:3003/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    title: inputValue.title,
                    description: inputValue.body,
                    tags: inputValue.tags,
                    originalPoster: userData.id,
                    userId: userData.id,
                    date : new Date(Date.now()).toLocaleString('en-US', { month: 'short', day: 'numeric'})



                })
            })  

            alert("Post created!")
            document.location.reload();
        };

    const handleState = (fieldName ,value) => {
        setInputValue({ ...inputValue, [fieldName]: value });
    }
        
        return (

            <div id="parent" className="container">
                <div className="is-flex is-justify-content-space-between">
                    <p className="has-text-white">Create Post</p>
                    {!preview ? <button className="button is-info is-rounded" onClick={() => setPreview(true)}>Preview</button> : <button className="button is-info is-rounded" onClick={() => setPreview(false)}>Edit</button>}
                </div>
           
{!preview && ( <div> <input className="input is-large" type="text" value={inputValue.title}  name="title" placeholder="Title" onChange={handleInput} />
<div id="tags" className="is-flex jusify-content-center">
<div className='columns is-multiline'>
            <div className='column is-12' >
            <HandleArray dataArray={inputValue.tags} updateParentState={handleState} fieldName="tags" Btn="Add Tags"/>
         </div>
            {/* <div className='column is-12' >
            <HandleArray dataArray={inputValue.collaborators} updateParentState={handleState} fieldName="collaborators" Btn="Add Collaborators" placeholder="github"/>
            </div> */}
            </div>
</div>
<div id="text">
<p className="ml-2 has-text-white">Markdown</p>
<textarea className="textarea" value={inputValue.body} name="body" placeholder="# Hello World" onChange={handleInput}/>
</div>
</div>)}

{preview && (
    <div>
       <div className="box">
    <h1 className="title is-size-1">{inputValue.title}</h1>
  {inputValue.tags.length > 0 && <div className="box">{
    inputValue.tags.map((tag) => (
     <span className="tag is-info is-rounded">{tag}</span>
    ))}
</div> }
{/* {inputValue.collaborators.length > 0 && <div className="box">{
    inputValue.collaborators.map((collab) => (
        <span className="tag is-info is-rounded">{collab}</span>
    ))}
</div> } */}

    <Markdown markdown={inputValue.body}/>
    </div>
            </div>  

)}
  <div className="has-text-right">
    <button className="button is-info mt-2 is-rounded" id="post" onClick={handleSubmit}><GoCheck id="check"/></button>
</div> 
</div>
        )
        };
      




    
export default NewPost;