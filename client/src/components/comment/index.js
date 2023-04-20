import React from "react";
import "./index.css"
import { useEffect, useState } from "react";

const Comment = ({commentData}) => {

    const [user , setUser] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3003/api/users/${commentData.user}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.log(error))
    }, [])


    return (
        <div id="commentContainer" className="columns m-3">
            <div id="commentUser" className="column is-2">
                <img src={user.image}/>
                <p className="has-text-white">{user.name}</p>

            </div>

            <div id="commentContent" className="column is-10">
                <p className="has-text-white">
                    {commentData.reactionBody}
                </p>

            </div>
          </div>


    );
}

export default Comment;