import React, { useState,useEffect} from "react";
import {RxButton, RxPencil2} from 'react-icons/rx';
import "./index.css";

function EditableText(props) {
  const [editing, setEditing] = useState(false);
  // const [text, setText] = useState();


  // // useEffect(() => {
  // //   setText(props.text);

  // // }, [props.text]);






  const handleChange = (event) => {
    // setText(event.target.value);
    props.updateParentState(props.fieldName, event.target.value);
  };

  return editing?  (
    props.htmlEl === 'textarea' ?
    <textarea className="textarea" value={props.text} autoFocus  onChange={handleChange} onBlur={() => setEditing(false)} />
    : (
      <div>
    <input type="text" className="input" autoFocus value={props.text} onChange={handleChange} onBlur={() => setEditing(false)} />
    </div>
    )
  ) : (
    <div id="editText">
    <p>{props.text ? props.text : "add info"}</p>
    <RxPencil2 onClick={() => setEditing(true)} id="editBtn"/>
    </div>
  );
}

export default EditableText;