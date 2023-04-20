import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Post = ({ postData }) => {
  const [user, setUserData] = useState({});
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    if (postData.originalPoster) {
      fetch(`http://localhost:3003/api/users/${postData.originalPoster}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.log(error));
    }
  }, []);

  const deletePost = () => {
    fetch(`http://localhost:3003/api/projects/${postData._id}`, {
      method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
			
		},
		
    })
      .then((response) => {
        if (response.ok) {
           
        }
      })
      .catch((error) => console.log(error));
			document.location.reload ();
  };


  useEffect(() => {
    const isMyProfilePage = window.location.pathname === "/myprofile";

    if (isMyProfilePage) {
      setShowEditButton(true);
    }
  });

  return (
    <div>
      <div className="card edit_card" id="smallpost">
        <div id="posttop">
          
          <img src={user.image} />
          <div className="ml-3">
            <p className="has-text-white has-text-weight-bold">{user.name}</p>
            <time className="has-text-white">{postData.date}</time>
          </div>
					<div className="media-content">
            <div className="content">
              {showEditButton && (
                <Link to={`/myprofile/edit/${postData._id}`}>
                  <button className="edit button" id="edit">
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                          fill="#000000"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </Link>
              )}

              {showEditButton && (
                <button className="del button" id="del" onClick={deletePost}>
                  <svg
                    fill="#000000"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div id="postbottom">
          <h1 className="title is-4 has-text-weight-bold has-text-white">
            {postData.title}
          </h1>
          {postData.tags &&
            postData.tags.map((tag, index) => (
              <span className="tag is-primary is-light mr-2" key={index}>
                {tag}
              </span>
            ))}
          <div className="has-text-white">{`${postData.reactions.length} Comments`}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
